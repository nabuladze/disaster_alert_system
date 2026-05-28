import os
import requests
from dotenv import load_dotenv
from app.risk_engine import analyze_risk

load_dotenv()

API_KEY = os.getenv("OPENWEATHER_API_KEY")


def build_weather_response(data):
    weather_info = {
        "city": data["name"],
        "temperature": data["main"]["temp"],
        "weather": data["weather"][0]["description"],
        "wind_speed": data["wind"]["speed"]
    }

    risk_info = analyze_risk(weather_info)
    weather_info.update(risk_info)

    return weather_info


def get_weather(city: str):
    url = (
        f"https://api.openweathermap.org/data/2.5/weather"
        f"?q={city}&appid={API_KEY}&units=metric"
    )

    response = requests.get(url)

    if response.status_code != 200:
        return {
            "error": "Could not fetch weather data",
            "status_code": response.status_code,
            "details": response.json()
        }

    data = response.json()
    return build_weather_response(data)


def get_weather_by_coordinates(latitude: float, longitude: float):
    url = (
        f"https://api.openweathermap.org/data/2.5/weather"
        f"?lat={latitude}&lon={longitude}&appid={API_KEY}&units=metric"
    )

    response = requests.get(url)

    if response.status_code != 200:
        return {
            "error": "Could not fetch weather data",
            "status_code": response.status_code,
            "details": response.json()
        }

    data = response.json()
    return build_weather_response(data)