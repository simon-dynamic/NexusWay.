import os

class Config:
    # OSRM API Configuration
    OSRM_BASE_URL = "https://router.project-osrm.org"
    
    # API Configuration
    API_HOST = "0.0.0.0"
    API_PORT = 8001
    
    # CORS Configuration
    ALLOWED_ORIGINS = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174"
    ]

config = Config()