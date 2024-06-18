import React, { useEffect, useRef, useState } from 'react';
import clear_icon from '../Assets/clear.png';
import drizzle_icon from '../Assets/drizzle.png';
import humidity_icon from '../Assets/humidity.png';
import rain_icon from '../Assets/rain.png';
import serarch_icon from '../Assets/search.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import './Weather.css';


const Weather = () => {

    const inputRef =useRef()

    const [weatherData, setWeatherData] = useState(false);
    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": clear_icon,
        "02n": clear_icon,
        "03d": clear_icon,
        "03n": clear_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon
    }

    const search = async (city) => {
        if(city === ""){
            alert("Enter City Name");
            return;
        }
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            
            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                return;
            }

            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon:icon
            })

        } catch (error){
            setWeatherData(fslse);
            console.error("Error in fetchinf weather data");

        }
    }
    useEffect(()=> {
        search("france");
    },[])


  return (
    <div className='weather'>
        <div className='search-bar'>
            <input ref={inputRef} type="text" placeholder='Search' />
            <img src= {serarch_icon} alt="" onClick={() => search(inputRef.current.value)}/>
        </div>
        {weatherData?<> <img src= {weatherData.icon} alt="" className='weather-icon'/>
        <p className='temperature'>{weatherData.temperature}°c</p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
            <div className="col">
                <img src= {humidity_icon} alt="" />
                <div>
                    <p> {weatherData.humidity} %</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className="col">
                <img src= {wind_icon} alt="" />
                <div>
                    <p> {weatherData.windSpeed} Km/h</p>
                    <span>Wind Seed</span>
                </div>
            </div>
        </div>
        
        </>:<></>}
       
     
    </div>
  )
}

export default Weather
