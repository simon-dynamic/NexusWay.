from fastapi import APIRouter, HTTPException
from models import LogisticsRequest, ParetoFrontier, RouteOption
from services.routing_service import RoutingService
from services.pareto_service import ParetoService
import json

router = APIRouter()

# Initialize services
routing_service = RoutingService()
pareto_service = ParetoService()

@router.post("/optimize", response_model=ParetoFrontier)
async def optimize_logistics(request: LogisticsRequest):
    """
    Optimize logistics route using Pareto frontier analysis
    """
    try:
        # Geocode locations
        origin_coords = routing_service.geocode_location(request.trip.origin)
        dest_coords = routing_service.geocode_location(request.trip.destination)
        
        if origin_coords == (0.0, 0.0) or dest_coords == (0.0, 0.0):
            raise HTTPException(status_code=400, detail="Could not geocode locations")
        
        # Format coordinates for OSRM (longitude,latitude)
        origin_str = f"{origin_coords[0]},{origin_coords[1]}"
        dest_str = f"{dest_coords[0]},{dest_coords[1]}"
        
        # Get multiple route options from OSRM
        osrm_routes = routing_service.get_multiple_routes(origin_str, dest_str, num_alternatives=5)
        
        if not osrm_routes:
            raise HTTPException(status_code=404, detail="No routes found")
        
        # Generate route options with cost calculations
        route_options = pareto_service.generate_route_options(
            osrm_routes,
            request.cost,
            request.vehicle,
            request.optimization
        )
        
        if not route_options:
            raise HTTPException(status_code=500, detail="Failed to generate route options")
        
        # Apply Pareto optimization
        optimized_routes, stats = pareto_service.optimize_routes(route_options)
        
        # Convert to response models
        route_responses = []
        for route in optimized_routes:
            route_responses.append(RouteOption(
                route_id=route['route_id'],
                distance=route['distance'],
                duration=route['duration'],
                coordinates=route['coordinates'],
                cost=route['cost'],
                time_cost=route['time_cost'],
                is_pareto_optimal=route['is_pareto_optimal']
            ))
        
        return ParetoFrontier(
            optimal_routes=route_responses,
            total_options=stats['total_routes'],
            optimization_criteria=stats
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Optimization error: {str(e)}")

@router.get("/route/{origin}/{destination}")
async def get_route(origin: str, destination: str):
    """
    Get simple route between two locations
    """
    try:
        # Geocode locations
        origin_coords = routing_service.geocode_location(origin)
        dest_coords = routing_service.geocode_location(destination)
        
        if origin_coords == (0.0, 0.0) or dest_coords == (0.0, 0.0):
            raise HTTPException(status_code=400, detail="Could not geocode locations")
        
        # Format coordinates for OSRM
        origin_str = f"{origin_coords[0]},{origin_coords[1]}"
        dest_str = f"{dest_coords[0]},{dest_coords[1]}"
        
        # Get route from OSRM
        route_data = routing_service.get_route(origin_str, dest_str)
        
        if not route_data:
            raise HTTPException(status_code=404, detail="Route not found")
        
        return route_data
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Route error: {str(e)}")

@router.get("/health")
async def health_check():
    """
    Health check endpoint
    """
    return {"status": "healthy", "service": "logistics"}