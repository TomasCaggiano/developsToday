import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CountryInfo.css'
const CountryInfo = () => {
    const { countryCode } = useParams();
    const [countryData, setCountryData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCountryInfo = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/country/${countryCode}`);
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setCountryData(data);
            } catch (err) {
                console.error('Error fetching country data:', err);
                setError('Failed to fetch country information. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchCountryInfo();
    }, [countryCode]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Ukraine</h1>
            <img src={countryData.flagUrl} alt="Ukrainian flag" />
            
            <h2>Border Countries</h2>
            <ul>
                {countryData.borderCountries.map(borderCountry => (
                    <li key={borderCountry.countryCode}>
                        <Link to={`/country/${borderCountry.countryCode}`}>
                            {borderCountry.commonName}
                        </Link>
                    </li>
                ))}
            </ul>

            <h2>Population Data</h2>
            <table>
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Population</th>
                    </tr>
                </thead>
                <tbody>
                    {countryData.populationData.map((entry, index) => (
                        <tr key={index}>
                            <td>{entry.year}</td>
                            <td>{entry.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CountryInfo;
