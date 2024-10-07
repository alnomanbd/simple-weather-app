import React, { useEffect, useState } from 'react';
import Weather from './components/Weather';

const App = () => {
    const [cities, setCities] = useState([]);
    const [countries, setCountries] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const API_KEY = import.meta.env.VITE_API_KEY; // Your API key
    const API_URL = import.meta.env.VITE_API_URL; // Your API URL

    // Fetch countries on component mount
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                const data = await response.json();
                const countryList = data.map(country => ({
                    name: country.name.common,
                    code: country.cca2,
                }));
                setCountries(countryList);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    // Update cities based on selected country
    const handleCountryChange = (countryCode) => {
        setSelectedCountry(countryCode);
        setSelectedCity(''); // Reset city selection
        setCities(getCitiesForCountry(countryCode));
    };

    // Example function to get cities based on country code
    const getCitiesForCountry = (countryCode) => {
        const cityMap = {
            GB: ['London', 'Birmingham', 'Manchester'],
            US: ['New York', 'Los Angeles', 'Chicago'],
            JP: ['Tokyo', 'Osaka', 'Kyoto'],
            AU: ['Sydney', 'Melbourne', 'Brisbane'],
        };
        return cityMap[countryCode] || [];
    };

    const fetchWeatherData = async (cityName, countryCode) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}?q=${cityName},${countryCode}&appid=${API_KEY}&units=metric`);
            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();
            setWeatherData(data);
            setError('');
        } catch (err) {
            setError(err.message);
            setWeatherData(null);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedCity || !selectedCountry) {
            setError('Please select both city and country.');
            return;
        }
        fetchWeatherData(selectedCity, selectedCountry);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-blue-400">
            <div className='flex flex-col justify-center items-center border border-gray-300 shadow-lg w-[560px] mx-auto bg-white p-6 rounded-lg'>
                <h1 className='text-2xl font-bold text-center text-gray-800 mb-2'>Weather App</h1>
                
                <form onSubmit={handleSubmit} className="w-full mb-4">
                    <select
                        value={selectedCountry}
                        onChange={(e) => handleCountryChange(e.target.value)}
                        className="border p-2 rounded mb-2 w-full"
                    >
                        <option value="">Select Country</option>
                        {countries.map((country) => (
                            <option key={country.code} value={country.code}>{country.name}</option>
                        ))}
                    </select>

                    <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="border p-2 rounded mb-4 w-full"
                    >
                        <option value="">Select City</option>
                        {cities.map((city) => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>

                    <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                        {loading ? 'Loading...' : 'Get Weather'}
                    </button>
                </form>

                {error && <p className='text-red-500'>{error}</p>}

                {weatherData && <Weather weatherData={weatherData} />}
            </div>
        </div>
    );
};

export default App;
