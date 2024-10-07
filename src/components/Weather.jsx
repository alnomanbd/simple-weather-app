import React from 'react'

const Weather = ({weatherData}) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-blue-400">
            <div className='flex flex-col justify-center items-center border border-gray-300 shadow-lg w-[560px] mx-auto bg-white p-6 rounded-lg'>
                <h1 className='text-2xl font-bold text-center text-gray-800 mb-2'>City Name: {weatherData.name}</h1>
                
                <p className='text-xl text-gray-700 mb-1'>
                    Temperature: <span className='font-semibold'>{weatherData.main.temp} &deg;C</span>
                </p>
                
                <p className='text-md text-gray-600'>
                    Sunrise: <span className='font-semibold'>{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</span>
                </p>
                
                <p className='text-md text-gray-600'>
                    Sunset: <span className='font-semibold'>{new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</span>
                </p>

                <p className='text-md text-gray-600 mb-2 flex items-center'>
                    <img 
                        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
                        alt={weatherData.weather[0].description} 
                        className='w-8 h-8 mr-2'
                    />
                    Description: <span className='font-semibold'>{weatherData.weather[0].description}</span>
                </p>
                
                <p className='text-md text-gray-600'>
                    Humidity: <span className='font-semibold'>{weatherData.main.humidity} %</span>
                </p>
            </div>
        </div>
    )
}

export default Weather