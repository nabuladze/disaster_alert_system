def analyze_risk(weather_data):
    temperature = weather_data["temperature"]
    wind_speed = weather_data["wind_speed"]
    weather_description = weather_data["weather"].lower()

    # default values
    risk_level = "Low"
    disaster_type = "No danger"
    recommendation = "უსაფრთხო ამინდია."

    # flood risk
    if "heavy rain" in weather_description or "heavy intensity rain" in weather_description or "very heavy rain" in weather_description:
        risk_level = "High"
        disaster_type = "Flood"
        recommendation = (
            "მოერიდეთ მდინარეებს."
            "მიჰყევით საგანგებო სამსახურის მითითებებს"
        )

    # heavy rain risk
    elif "rain" in weather_description:
        risk_level = "Medium"
        disaster_type = "Heavy Rain"
        recommendation = (
            "ფრთხილად იმოძრავეთ და მოერიდეთ დატბორილ გზებს."
        )

    # storm risk
    elif wind_speed > 15:
        risk_level = "High"
        disaster_type = "Storm"
        recommendation = (
            "დარჩით შენობაში და მოერიდეთ სახლიდან გასვლას."
        )

    # extreme heat risk
    elif temperature > 38:
        risk_level = "Medium"
        disaster_type = "Extreme Heat"
        recommendation = (
            "დალიეთ წყალი და მოერიდეთ მზის პირდაპირ სხივებს."
        )

    return {
        "risk_level": risk_level,
        "disaster_type": disaster_type,
        "recommendation": recommendation
    }