import numpy as np
from typing import List, Dict, Tuple
from models import RouteOption, CostParameters, VehicleParameters, OptimizationPreferences

class ParetoService:
    def __init__(self):
        pass
    
    def calculate_route_cost(self, distance: float, duration: float, 
                           cost_params: CostParameters, 
                           vehicle_params: VehicleParameters) -> float:
        """
        Calculate total cost for a route based on vehicle and cost parameters
        """
        try:
            # Extract numeric values
            driver_rate = float(cost_params.driver_rate) if cost_params.driver_rate else 0
            fuel_rate = float(cost_params.fuel_rate) if cost_params.fuel_rate else 0
            toll_rate = float(cost_params.total_toll_rate) if cost_params.total_toll_rate else 0
            mileage = float(vehicle_params.mileage) if vehicle_params.mileage else 10
            fuel_cap = float(vehicle_params.total_fuel_cap) if vehicle_params.total_fuel_cap else 50
            
            # Calculate fuel cost
            fuel_needed = distance / mileage  # liters needed
            fuel_cost = fuel_needed * fuel_rate
            
            # Calculate driver cost (based on duration in hours)
            driver_hours = duration / 60
            driver_cost = driver_hours * driver_rate
            
            # Total cost
            total_cost = fuel_cost + driver_cost + toll_rate
            
            return total_cost
            
        except Exception as e:
            print(f"Error calculating route cost: {e}")
            return 0.0
    
    def calculate_time_cost(self, duration: float, preferences: OptimizationPreferences) -> float:
        """
        Calculate time cost based on user preferences
        """
        try:
            # Normalize time sensitivity (0-100 to 0-1)
            time_weight = preferences.time_sensitivity / 100
            
            # Time cost is proportional to duration weighted by time sensitivity
            time_cost = duration * time_weight
            
            return time_cost
            
        except Exception as e:
            print(f"Error calculating time cost: {e}")
            return 0.0
    
    def is_dominated(self, route1: Dict, route2: Dict) -> bool:
        """
        Check if route1 is dominated by route2
        Route1 is dominated if route2 is better in both cost and time
        """
        return (route2['cost'] <= route1['cost'] and 
                route2['time'] <= route1['time'] and
                (route2['cost'] < route1['cost'] or route2['time'] < route1['time']))
    
    def find_pareto_frontier(self, routes: List[Dict]) -> List[Dict]:
        """
        Find Pareto optimal routes from a list of routes
        Returns routes that are not dominated by any other route
        """
        if not routes:
            return []
        
        pareto_optimal = []
        
        for route in routes:
            is_dominated = False
            for other_route in routes:
                if self.is_dominated(route, other_route):
                    is_dominated = True
                    break
            
            if not is_dominated:
                pareto_optimal.append(route)
        
        return pareto_optimal
    
    def generate_route_options(self, osrm_routes: List[Dict], 
                               cost_params: CostParameters,
                               vehicle_params: VehicleParameters,
                               preferences: OptimizationPreferences) -> List[RouteOption]:
        """
        Generate route options with cost and time calculations
        """
        route_options = []
        
        for i, route_data in enumerate(osrm_routes):
            try:
                # Extract basic metrics
                distance = route_data.get('distance', 0) / 1000  # km
                duration = route_data.get('duration', 0) / 60  # minutes
                
                # Extract coordinates
                geometry = route_data.get('geometry', {})
                coordinates = geometry.get('coordinates', [])
                
                # Calculate costs
                monetary_cost = self.calculate_route_cost(distance, duration, cost_params, vehicle_params)
                time_cost = self.calculate_time_cost(duration, preferences)
                
                # Create route option
                route_option = {
                    'route_id': f"route_{i}",
                    'distance': distance,
                    'duration': duration,
                    'coordinates': coordinates,
                    'cost': monetary_cost,
                    'time': duration,
                    'time_cost': time_cost,
                    'is_pareto_optimal': False
                }
                
                route_options.append(route_option)
                
            except Exception as e:
                print(f"Error processing route {i}: {e}")
                continue
        
        return route_options
    
    def optimize_routes(self, route_options: List[Dict]) -> Tuple[List[Dict], Dict]:
        """
        Apply Pareto optimization to find optimal routes
        """
        if not route_options:
            return [], {}
        
        # Find Pareto frontier
        pareto_routes = self.find_pareto_frontier(route_options)
        
        # Mark optimal routes
        pareto_ids = {route['route_id'] for route in pareto_routes}
        for route in route_options:
            route['is_pareto_optimal'] = route['route_id'] in pareto_ids
        
        # Calculate optimization statistics
        optimization_stats = {
            'total_routes': len(route_options),
            'pareto_optimal_count': len(pareto_routes),
            'cost_range': [min(r['cost'] for r in route_options), max(r['cost'] for r in route_options)],
            'time_range': [min(r['time'] for r in route_options), max(r['time'] for r in route_options)]
        }
        
        return route_options, optimization_stats