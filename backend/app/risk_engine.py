def analyze_risk(weather_data):
    temperature = weather_data["temperature"]
    wind_speed = weather_data["wind_speed"]
    weather_description = weather_data["weather"].lower()

    # default values
    risk_level = "Low"
    disaster_type = "No danger"
    recommendation = "Weather conditions are safe."

    # flood risk
    if "rain" in weather_description:
        risk_level = "High"
        disaster_type = "Flood"
        recommendation = (
            "Avoid rivers and low areas. "
            "Follow local emergency instructions."
        )

    # storm risk
    elif wind_speed > 15:
        risk_level = "High"
        disaster_type = "Storm"
        recommendation = (
            "Stay indoors and avoid unnecessary travel."
        )

    # extreme heat risk
    elif temperature > 38:
        risk_level = "Medium"
        disaster_type = "Extreme Heat"
        recommendation = (
            "Drink water and avoid direct sunlight."
        )

    return {
        "risk_level": risk_level,
        "disaster_type": disaster_type,
        "recommendation": recommendation
    }