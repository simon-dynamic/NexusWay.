from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from typing import List, Optional
from datetime import datetime
import re
import os

app = FastAPI(title="Flight Search API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variable to store cleaned data
flight_data = None

# Get the directory where this script is located
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
EXCEL_FILE = os.path.join(BASE_DIR, 'Data_Train.xlsx')

def load_and_clean_data():
    """Load and clean the flight data from Excel file"""
    global flight_data
    
    try:
        # Load data from Excel using absolute path
        df = pd.read_excel(EXCEL_FILE)
        
        # Data cleaning
        # 1. Remove rows with missing critical values
        critical_columns = ['Airline', 'Date_of_Journey', 'Source', 'Destination', 'Route', 'Dep_Time', 'Arrival_Time']
        df = df.dropna(subset=critical_columns)
        
        # 2. Clean and standardize column names
        df.columns = df.columns.str.strip().str.replace(' ', '_')
        
        # 3. Clean Airline names - remove extra spaces
        if 'Airline' in df.columns:
            df['Airline'] = df['Airline'].str.strip()
        
        # 4. Clean and format time columns
        if 'Dep_Time' in df.columns:
            df['Dep_Time'] = df['Dep_Time'].astype(str).str.strip()
            # Handle invalid time formats
            df['Dep_Time'] = df['Dep_Time'].apply(lambda x: x if re.match(r'^\d{1,2}:\d{2}$', str(x)) else None)
        
        if 'Arrival_Time' in df.columns:
            df['Arrival_Time'] = df['Arrival_Time'].astype(str).str.strip()
            # Extract time part if it contains date info
            df['Arrival_Time'] = df['Arrival_Time'].apply(lambda x: str(x).split()[0] if ' ' in str(x) else x)
            df['Arrival_Time'] = df['Arrival_Time'].apply(lambda x: x if re.match(r'^\d{1,2}:\d{2}$', str(x)) else None)
        
        # 5. Clean date column
        if 'Date_of_Journey' in df.columns:
            df['Date_of_Journey'] = pd.to_datetime(df['Date_of_Journey'], errors='coerce')
            df = df.dropna(subset=['Date_of_Journey'])
        
        # 6. Clean price column - remove currency symbols, convert to numeric
        if 'Price' in df.columns:
            df['Price'] = df['Price'].astype(str).str.replace('₹', '').str.replace(',', '').str.strip()
            df['Price'] = pd.to_numeric(df['Price'], errors='coerce')
            df = df.dropna(subset=['Price'])
        
        # 7. Clean Source and Destination
        if 'Source' in df.columns:
            df['Source'] = df['Source'].str.strip().str.title()
        if 'Destination' in df.columns:
            df['Destination'] = df['Destination'].str.strip().str.title()
        
        # 8. Remove duplicates
        df = df.drop_duplicates()
        
        flight_data = df
        print(f"Data loaded successfully. Total records: {len(df)}")
        return True
        
    except Exception as e:
        print(f"Error loading data: {str(e)}")
        return False

def search_flights(origin: str, destination: str, depart_date: str, 
                   travel_class: str = 'economy', adults: int = 1) -> List[dict]:
    """Search flights based on criteria"""
    global flight_data
    
    if flight_data is None:
        if not load_and_clean_data():
            raise HTTPException(status_code=500, detail="Failed to load flight data")
    
    try:
        # Filter by origin and destination (case-insensitive)
        filtered = flight_data[
            (flight_data['Source'].str.lower() == origin.lower()) &
            (flight_data['Destination'].str.lower() == destination.lower())
        ].copy()
        
        # Filter by date if provided
        if depart_date:
            search_date = pd.to_datetime(depart_date)
            filtered = filtered[filtered['Date_of_Journey'].dt.date == search_date.date()]
        
        # If no results, try partial match for city names
        if len(filtered) == 0:
            filtered = flight_data[
                (flight_data['Source'].str.contains(origin, case=False, na=False)) &
                (flight_data['Destination'].str.contains(destination, case=False, na=False))
            ].copy()
        
        # Limit results to avoid overwhelming response
        filtered = filtered.head(20)
        
        # Format results
        results = []
        for _, row in filtered.iterrows():
            results.append({
                'id': int(row.name) if hasattr(row, 'name') else hash(str(row)),
                'airline': row.get('Airline', 'Unknown'),
                'depTime': str(row.get('Dep_Time', 'N/A')),
                'arrivalTime': str(row.get('Arrival_Time', 'N/A')),
                'price': int(row.get('Price', 0)),
                'source': row.get('Source', ''),
                'destination': row.get('Destination', ''),
                'date': str(row.get('Date_of_Journey', '').date()) if pd.notna(row.get('Date_of_Journey')) else ''
            })
        
        return results
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error searching flights: {str(e)}")

@app.on_event("startup")
async def startup_event():
    """Load data on startup"""
    load_and_clean_data()

@app.get("/")
async def root():
    return {"message": "Flight Search API is running", "status": "active"}

@app.get("/api/flights/search")
async def search_flights_endpoint(
    origin: str,
    destination: str,
    depart_date: Optional[str] = None,
    travel_class: Optional[str] = "economy",
    adults: Optional[int] = 1
):
    """Search flights endpoint"""
    if not origin or not destination:
        raise HTTPException(status_code=400, detail="Origin and destination are required")
    
    results = search_flights(origin, destination, depart_date, travel_class, adults)
    return {
        "success": True,
        "count": len(results),
        "data": results
    }

@app.get("/api/flights/cities")
async def get_cities():
    """Get all available source and destination cities"""
    global flight_data
    
    if flight_data is None:
        if not load_and_clean_data():
            raise HTTPException(status_code=500, detail="Failed to load flight data")
    
    sources = flight_data['Source'].unique().tolist()
    destinations = flight_data['Destination'].unique().tolist()
    all_cities = sorted(set(sources + destinations))
    
    return {
        "success": True,
        "count": len(all_cities),
        "data": all_cities
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
