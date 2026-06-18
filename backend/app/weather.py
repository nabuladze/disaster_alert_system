#HTTP request-ებთან სამუშაო ბიბლიოთეკები
import requests

# რისკის ანალიზის მოდული
from app.risk_engine import analyze_risk

# OpenWeather API key
API_KEY ="ff11e175b9b213d7b4aac2185312a11c"

# OpenWeather API-დან მიღებული მონაცემების დამუშავება
# და რისკის ანალიზის დამატება
def build_weather_response(data):
    weather_info = {
        "city": data["name"],
        "temperature": data["main"]["temp"],
        "weather": data["weather"][0]["description"],
        "wind_speed": data["wind"]["speed"]
    }

    # ამინდის მონაცემების გადაცემა risk_engine-ში
    risk_info = analyze_risk(weather_info)
    # რისკის შედეგების დამატება ამინდის მონაცემებზე
    weather_info.update(risk_info)

    return weather_info


# კონკრეტული ქალაქის ამინდის ინფორმაციის მიღება
def get_weather(city: str):

    # პრეზენტაციისთვის გამოყენებული სატესტო სცენარი
    # ახალციხის არჩევისას სისტემა ყოველთვის აბრუნებს საფრთხეს
    # რათა შესაძლებელი იყოს შეტყობინებების დემონსტრირება
    if city == "Akhaltsikhe":
        return {
            "city": "Akhaltsikhe",
            "temperature": 21,
            "weather": "ინტენსიური წვიმა",
            "wind_speed": 20,
            "risk_level": "High",
            "disaster_type": "Flood",
            "recommendation": (
                "მოერიდეთ მდინარეებს და დაბალ ტერიტორიებს. "
            ),
        }
    # პრეზენტაციის დემოს დასასრული

    # OpenWeather API request URL
    url = (
        f"https://api.openweathermap.org/data/2.5/weather"
        f"?q={city}&appid={API_KEY}&units=metric"
    )

    # HTTP request API-სთან
    response = requests.get(url)

    # შეცდომის შემთხვევაში
    if response.status_code != 200:
        return {"error": "Could not fetch weather data"}

    # JSON მონაცემების მიღება
    data = response.json()
    # ამინდისა და რისკის ინფორმაციის დაბრუნება
    return build_weather_response(data)