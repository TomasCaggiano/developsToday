import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CountryList = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/countries');
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setCountries(data);
            } catch (err) {
                console.error('Error fetching countries:', err); // Log de error
                setError('Failed to fetch countries. Please try again later.'); // Mensaje de error
            } finally {
                setLoading(false); // Termina la carga
            }
        };

        fetchCountries();
    }, []);

    if (loading) return <div>Loading...</div>; 

    if (error) return <div>{error}</div>; 

    return (
        <div>
            <h1>Country List</h1>
            <ul>
                {countries.map((country) => (
                    <li key={country.countryCode}>
                        <Link to={`/country/${country.countryCode}`}>
                            {country.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CountryList;
