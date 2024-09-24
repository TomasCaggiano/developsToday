const express = require('express')
const axios = require('axios')
require('dotenv').config()
const cors = require('cors')

const app = express();
app.use(cors());
const PORT = process.env.PORT
const AVAILABLE_COUNTRIES_API = process.env.AVAILABLE_COUNTRIES_API
const COUNTRY_INFO_API = process.env.COUNTRY_INFO_API
const COUNTRY_POPULATION_API = process.env.POPULATION_API
const COUNTRY_FLAG_API = process.env.FLAG_API

app.get('/api/countries', async(req, res) => {
    try {
        const response = await axios.get(AVAILABLE_COUNTRIES_API)
        res.json(response.data)
    } catch (error) {
        res.status(500).json({ error: 'available countries error' })
    }
})

app.get('/api/country/:countryCode', async(req, res) => {
    const { countryCode } = req.params

    try {
        const borderResponse = await axios.get(`${COUNTRY_INFO_API}/${countryCode}`)
        const populationResponse = await axios.get(`${COUNTRY_POPULATION_API}?country=${countryCode}`)
        const flagResponse = await axios.get(COUNTRY_FLAG_API)

        const borderCountries = borderResponse.data[0]?.borders || []
        const populationData = populationResponse.data.data
        const flagUrl = flagResponse.data.data.find(country => country.country === countryCode)?.flag;

        res.json({
            borderCountries,
            populationData,
            flagUrl
        })

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})