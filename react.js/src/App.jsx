import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CountryList from './Components/CountryList.jsx';
import CountryInfo from './Components/CountryInfo.jsx';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<CountryList/>} />
                <Route path="/country/:countryCode" element={<CountryInfo/>} />
            </Routes>
        </Router>
    );
};

export default App;