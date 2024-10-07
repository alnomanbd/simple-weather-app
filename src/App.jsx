import React, { useEffect, useState } from 'react';
import Weather from './components/Weather';

const App = () => {
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const [data, setData] = useState(null);

    const api_url = import.meta.env.VITE_API_URL;
    const api_key = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        const fetchWeatherData = async () => {
            if (lat !== null && long !== null) {
                try {
                    const response = await fetch(`${api_url}/weather?lat=${lat}&lon=${long}&units=metric&APPID=${api_key}`);
                    const result = await response.json();
                    setData(result);
                    console.log(result);
                } catch (error) {
                    console.error('Error fetching weather data:', error);
                }
            }
        };

        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLat(position.coords.latitude);
                        setLong(position.coords.longitude);
                    },
                    (error) => {
                        console.error('Error getting location:', error);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        };

        getLocation();
        fetchWeatherData(); // Call the fetch function after attempting to get location
    }, [lat, long, api_url, api_key]);

    return (
        <div>
            {data ? (
                // <div>
                //     <h1>{data.name}</h1>
                //     <p>Temperature: {data.main.temp} °C</p>
                // </div>
                <Weather weatherData={data}/>
            ) : (
                <p className='text-center'>Loading...</p>
            )}
        </div>
    );
};

export default App;
