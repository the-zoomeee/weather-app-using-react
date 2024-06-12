# Weather App

This is a simple weather application built with React that fetches and displays weather data using the OpenWeatherMap API.

## Features

- Fetch weather data by city name
- Display temperature, weather description, humidity, and wind speed
- Loading and error handling

## Demo

![Weather App Screenshot](screenshot.png)

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

- Node.js 
- npm 

### Installation

1. Clone the repository

   ```sh
   git clone https://github.com/your-username/weather-app.git

2. Navigate to the project directory

   ```sh
   cd weather-app

3. Install the dependencies

   ```sh
   npm install

4. Create a .env file in the root of the project and add your OpenWeatherMap API key

   ```sh
   REACT_APP_API_KEY=your_openweathermap_api_key

5. Start the development server

   ```sh
   npm start

### Usage

1. Open the app in your browser (usually at http://localhost:3000).
2. Enter the name of a city in the input field.
3. Click the "Search" button to fetch and display the weather data for the entered city.

### Project Structure

> [!IMPORTANT]
> weather-app/ <br>
> │<br>
> ├── public/<br>
> │   ├── index.html<br>
> │   └── ...<br>
> │<br>
> ├── src/<br>
> │   ├── App.js<br>
> │   ├── Weather.js<br>
> │   ├── Weather.css<br>
> │   └── index.js<br>
> │<br>
> ├── .env<br>
> ├── .gitignore<br>
> ├── package.json<br>
> └── README.md<br>

### Built With

- React - A JavaScript library for building user interfaces
- Axios - Promise-based HTTP client for the browser and Node.js
- OpenWeatherMap API - Weather data API

### Contributing

> [!Tip]
> Contributions are welcome! Please open an issue or submit a pull request for any bugs, enhancements, or features.
