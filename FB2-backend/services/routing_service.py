import requests
from typing import List, Dict, Tuple
import config

class RoutingService:
    def __init__(self):
        self.osrm_base_url = config.Config.OSRM_BASE_URL
    
    def get_route(self, origin: str, destination: str) -> Dict:
        """
        Get route from OSRM API
        """
        try:
            # OSRM expects coordinates in format: longitude,latitude
            # For now, we'll use city names and let OSRM geocode
            url = f"{self.osrm_base_url}/route/v1/driving/{origin};{destination}"
            
            params = {
                'overview': 'full',
                'geometries': 'geojson',
                'alternatives': 'true'  # Get multiple route options
            }
            
            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()
            
            return response.json()
            
        except requests.RequestException as e:
            print(f"OSRM API Error: {e}")
            return None
    
    def get_multiple_routes(self, origin: str, destination: str, num_alternatives: int = 3) -> List[Dict]:
        """
        Get multiple route alternatives
        """
        try:
            url = f"{self.osrm_base_url}/route/v1/driving/{origin};{destination}"
            
            params = {
                'overview': 'full',
                'geometries': 'geojson',
                'alternatives': 'true',
                'steps': 'true'
            }
            
            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()
            
            data = response.json()
            
            if 'routes' in data:
                return data['routes'][:num_alternatives]
            else:
                return []
                
        except requests.RequestException as e:
            print(f"OSRM API Error: {e}")
            return []
    
    def calculate_route_metrics(self, route_data: Dict) -> Tuple[float, float, List[List[float]]]:
        """
        Extract distance, duration, and coordinates from OSRM response
        """
        try:
            distance = route_data.get('distance', 0) / 1000  # Convert to km
            duration = route_data.get('duration', 0) / 60  # Convert to minutes
            
            # Extract coordinates
            geometry = route_data.get('geometry', {})
            coordinates = geometry.get('coordinates', [])
            
            return distance, duration, coordinates
            
        except Exception as e:
            print(f"Error calculating route metrics: {e}")
            return 0.0, 0.0, []
    
    def geocode_location(self, location: str) -> Tuple[float, float]:
        """
        Convert location name to coordinates (using Nominatim)
        """
        try:
            # Using Nominatim (OpenStreetMap) for geocoding
            url = "https://nominatim.openstreetmap.org/search"
            params = {
                'q': location,
                'format': 'json',
                'limit': 1
            }
            
            # Add User-Agent header (required by Nominatim)
            headers = {
                'User-Agent': 'NexusPath-Logistics/1.0 (contact@nexuspath.com)'
            }
            
            response = requests.get(url, params=params, headers=headers, timeout=10)
            response.raise_for_status()
            
            data = response.json()
            if data and len(data) > 0:
                lat = float(data[0]['lat'])
                lon = float(data[0]['lon'])
                return lon, lat  # OSRM expects longitude,latitude
            
            return 0.0, 0.0
            
        except requests.exceptions.HTTPError as e:
            if e.response.status_code == 403:
                print(f"Geocoding rate limit exceeded. Using coordinates for major cities.")
                # Fallback to hardcoded coordinates for major cities
                return self.get_fallback_coordinates(location)
            else:
                print(f"Geocoding HTTP error: {e}")
                return self.get_fallback_coordinates(location)
        except Exception as e:
            print(f"Geocoding error: {e}")
            return self.get_fallback_coordinates(location)
    
    def get_fallback_coordinates(self, location: str) -> Tuple[float, float]:
        """
        Fallback coordinates for major cities if geocoding fails
        """
        city_coordinates = {
            'new york': (-74.0060, 40.7128),
            'nyc': (-74.0060, 40.7128),
            'boston': (-71.0589, 42.3601),
            'los angeles': (-118.2437, 34.0522),
            'la': (-118.2437, 34.0522),
            'chicago': (-87.6298, 41.8781),
            'houston': (-95.3698, 29.7604),
            'phoenix': (-112.0740, 33.4484),
            'philadelphia': (-75.1652, 39.9526),
            'san antonio': (-98.4936, 29.4241),
            'san diego': (-117.1611, 32.7157),
            'dallas': (-96.7970, 32.7767),
            'san jose': (-121.8863, 37.3382),
            'austin': (-97.7431, 30.2672),
            'jacksonville': (-81.6561, 30.3322),
            'san francisco': (-122.4194, 37.7749),
            'columbus': (-83.0007, 39.9612),
            'indianapolis': (-86.1581, 39.7684),
            'fort worth': (-97.3308, 32.7555),
            'charlotte': (-80.8431, 35.2271),
            'seattle': (-122.3321, 47.6062),
            'denver': (-104.9903, 39.7392),
            'el paso': (-106.4275, 31.7619),
            'detroit': (-83.0458, 42.3314),
            'washington': (-77.0369, 38.9072),
            'boston': (-71.0589, 42.3601),
            'memphis': (-90.0490, 35.1495),
            'nashville': (-86.7816, 36.1627),
            'portland': (-122.6765, 45.5231),
            'oklahoma city': (-97.5164, 35.4676),
            'london': (-0.1276, 51.5072),
            'paris': (2.3522, 48.8566),
            'berlin': (13.4050, 52.5200),
            'madrid': (-3.7038, 40.4168),
            'rome': (12.4964, 41.9028),
            'moscow': (37.6173, 55.7558),
            'tokyo': (139.6917, 35.6895),
            'sydney': (151.2093, -33.8688),
            'toronto': (-79.3832, 43.6532),
            'mumbai': (72.8777, 19.0760),
            'delhi': (77.2090, 28.6139)
        }
        
        location_lower = location.lower().strip()
        for city, coords in city_coordinates.items():
            if city in location_lower or location_lower in city:
                return coords
        
        # Default to a central location if not found
        print(f"City not found in fallback: {location}, using default coordinates")
        return (0.0, 0.0)