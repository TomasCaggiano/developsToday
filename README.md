# developsToday Test
## Overview
The developsToday Test project is designed to provide information about countries using a backend API and a frontend React application. The project is organized into two main directories: one for the backend and another for the frontend.

## Features
The project is divided into two main folders:
country-api: Contains the backend APIs.
react.js: Contains the React frontend application.
Tech Stack
## Backend
Node.js
Express.js
Axios
CORS
dotenv
## Frontend
React
React Router DOM
CSS
### API Endpoints
Get country information: http://localhost:8000/api/country/UA
Get available countries: http://localhost:8000/api/countries
Frontend entry point: http://localhost:5173/
Country specific page: http://localhost:5173/country/UA
### Installation Instructions
Clone the repository to your local machine.
Open Visual Studio Code.
Open two terminal windows:
In the first terminal, navigate to the backend directory:
cd country-api
node server.js
In the second terminal, navigate to the frontend directory
cd react.js
npm run dev
Access the application in your web browser:
Visit http://localhost:8000 to view the JSON data.
Visit http://localhost:5173/ to interact with the frontend application.
### Usage
The backend API at localhost:8000 returns information in JSON format.
The frontend application at localhost:5173 allows users to navigate to various countries, with detailed information available at /country/{countryCode}. For example, you can view information about Ukraine at /country/UA.
