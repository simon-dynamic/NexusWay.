from pydantic import BaseModel, Field
from typing import List, Optional

class VehicleParameters(BaseModel):
    vehicle_no: str
    length: str
    height: str
    gross_weight: str
    fuel_type: str
    total_fuel_cap: str
    cargo_type: str
    mileage: str

class TripParameters(BaseModel):
    origin: str
    destination: str
    departure_timing: str
    driver_count: int

class CostParameters(BaseModel):
    driver_rate: str
    fuel_rate: str
    total_toll_rate: str

class OptimizationPreferences(BaseModel):
    cost_sensitivity: int = Field(ge=0, le=100)
    time_sensitivity: int = Field(ge=0, le=100)

class LogisticsRequest(BaseModel):
    vehicle: VehicleParameters
    trip: TripParameters
    cost: CostParameters
    optimization: OptimizationPreferences

class RouteOption(BaseModel):
    route_id: str
    distance: float
    duration: float
    coordinates: List[List[float]]
    cost: float
    time_cost: float
    is_pareto_optimal: bool

class ParetoFrontier(BaseModel):
    optimal_routes: List[RouteOption]
    total_options: int
    optimization_criteria: dict