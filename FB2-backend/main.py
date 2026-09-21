from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import logistics

app = FastAPI(title="Logistics Business API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(logistics.router, prefix="/api/logistics", tags=["logistics"])

@app.get("/")
async def root():
    return {"message": "Logistics Business API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)