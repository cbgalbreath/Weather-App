const apiKey = "3938014871917142d56578f86de67384";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q="

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const cardColor = document.querySelector('.card');

async function checkWeather(city){
    const response = await fetch(apiURL + city + `&appId=${apiKey}`);
    
    if (response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else{
            let data = await response.json();

            let dir = Math.round(data.wind.deg/22.5);
            let direction = ""
            switch (dir){
                case 0:
                case 16:
                    direction = "N";
                    break;
                case 1: 
                    direction = "NNE";
                    break;
                case 2: 
                    direction = "NE";
                    break;
                case 3: 
                    direction = "ENE";
                    break;
                case 4:
                    direction = "E";
                    break;
                case 5:
                    direction = "ESE";
                    break;
                case 6:
                    direction = "SE";
                    break;
                case 7:
                    direction = "SSE";
                    break;
                case 8:
                    direction = "S";
                    break;
                case 9:
                    direction = "SSW";
                    break;
                case 10:
                    direction = "SW";
                    break;
                case 11:
                    direction = "WSW";
                    break;
                case 12:
                    direction = "W";
                    break;
                case 13:
                    direction = "WNW";
                    break;
                case 14:
                    direction = "NW";
                    break;
                case 15:
                    direction = "NNW";
                    break;
            }

            switch (data.weather[0].main){
                case 'Clouds':
                    weatherIcon.src = "images/clouds.png";
                    break;
                case 'Clear':
                    weatherIcon.src = "images/clear.png";
                    break;
                case 'Drizzle':
                    weatherIcon.src = "images/drizzle.png";
                    break;
                case 'Mist':
                    weatherIcon.src = "images/mist.png";
                    break;
                case 'Rain':
                    weatherIcon.src = "images/rain.png";
                    break;
                case 'Snow':
                    weatherIcon.src = "images/snow.png";
                    break;
            }
                
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°F";
            document.querySelector(".feels-like").innerHTML = "Feels Like " + Math.round(data.main.feels_like) + "°F";
            document.querySelector(".humidity").innerHTML = data.main.humidity +"%";
            document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " mph " + direction;

            if (Math.round(data.main.temp) <= 32){
                cardColor.style.backgroundColor = "#00008B";
            }
            if (Math.round(data.main.temp) > 32){
                cardColor.style.backgroundColor = "#99FFFF";
            }
            if (Math.round(data.main.temp) >= 50){
                cardColor.style.backgroundColor = "#00FF7F";
            }
            if (Math.round(data.main.temp) >= 70){
                cardColor.style.backgroundColor = "#FFA500";
            }
            if (Math.round(data.main.temp) >= 90){
                cardColor.style.backgroundColor = "#FF0000";
            }
            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";

        }
        

    }


    

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});