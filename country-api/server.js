const express = require('express')
const axios = require('axios')
require('dotenv').config()
const cors = require('cors')
const app = express();
app.use(cors());
const PORT = process.env.PORT || 8080
const AVAILABLE_COUNTRIES_API = process.env.AVAILABLE_COUNTRIES_API
const COUNTRY_INFO_API = process.env.COUNTRY_INFO_API
const COUNTRY_POPULATION_API = process.env.POPULATION_API
const COUNTRY_FLAG_API = process.env.FLAG_API

app.get('/api/countries', async (req, res) => {
    try {
        const response = await axios.get(AVAILABLE_COUNTRIES_API)
        res.json(response.data)
    } catch (error) {
        res.status(500).json({ error: 'available countries error' })
    }
})

app.get('/api/country/:countryCode', async (req, res) => {
    const { countryCode } = req.params

    try {
        const borderResponse = await axios.get(`${COUNTRY_INFO_API}/${countryCode}`);
        const borderCountries = borderResponse.data.borders || [];

        const populationResponse = await axios.post(COUNTRY_POPULATION_API, {
            country: 'Ukraine'
        });

        const flagResponse = await axios.post(COUNTRY_FLAG_API, {
            country: 'Ukraine'
        });

        const populationData = populationResponse.data.data.populationCounts || [];
        const flagUrl = flagResponse.data.data.flag;

        res.json({
            borderCountries,
            populationData, 
            flagUrl        
        });

    } catch (error) {
        res.status(500).json({ error: 'Error fetching country info' })
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
