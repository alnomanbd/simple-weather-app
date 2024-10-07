import React from 'react';

const Weather = ({ weatherData }) => {
    if (!weatherData) return null; // Ensure we have data

    return (
        <div className='mt-4 p-4 border border-gray-300 rounded shadow-lg'>
            <h2 className='text-xl font-bold'>
                City: {weatherData.name}, {weatherData.sys.country}
            </h2>
            <p>Temperature: {weatherData.main.temp} &deg;C</p>
            <p>Description: {weatherData.weather[0]?.description || 'No description available'}</p>
            <p>Humidity: {weatherData.main.humidity} %</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
            <p>Pressure: {weatherData.main.pressure} hPa</p>
            {weatherData.weather[0]?.icon && (
                <img
                    src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    alt={weatherData.weather[0].description}
                    className="mt-2"
                />
            )}
        </div>
    );
};

export default Weather;
