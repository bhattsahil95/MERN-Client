import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BasicSelect from '../components/ApiPage/Dropdown';
import LinearProgress from '@mui/material/LinearProgress';
import debounce from 'lodash/debounce';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';



function MyComponent() {
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY; 
  const units = 'Metric';
  const API_COUNT_LIMIT = 5;

  const [city, setCity] = useState('');
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isRawDataVisible, setIsRawDataVisible] = useState(false);
  const [cityCount, setCityCount] = useState(0)
  const [cityCountLimt, setCityCountLimit] = useState(false)
  const [cityHistory, setCityHistory] = useState([])
  const [selectedButton, setSelectedButton] = useState(null);
  const [newApi, setNewApi] =useState(true);
  

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=${units}`;

  const fetchData = async () => {
    setIsLoading(true);
    // setError('');

    try {
      const response = await axios.get(url);
      setData(response.data);
      setCityCount((previous) => previous + 1)
      setCityHistory((previous) => [...previous, response.data]);
      //City Count Limit 
      if (cityCount >= API_COUNT_LIMIT -1) {
        setCityCountLimit(true);
  }
    } catch (error) {
      setError('Please enter a valid city');
      setData(null);
    }

    setIsLoading(false);
  };

  

  // Debounce the fetchData function to delay the API request
  const debouncedFetchData = debounce(fetchData, 500);


  // Check if Already Searched in the Past 


  




  useEffect(() => {
    if (city.trim() !== '') {
      if (data === null || data.name.toLowerCase() !== city.toLowerCase()) {
         if (newApi && !cityCountLimt) {
          debouncedFetchData();
         } else {
          const historyData = cityHistory.filter((data) => data.name === city)
          setData(historyData[0] || 'Error Occured! ')
         }

       
      }
    }
    else {
      setIsLoading(false);
      setData(null);
      setError('');
    }

    return () => {
      debouncedFetchData.cancel();
    };
  }, [city, data, debouncedFetchData]);

  const handleCityChange = (enteredCity) => {
    setCity(enteredCity);
  
    if (enteredCity.trim() === '') {
      setIsLoading(false);
      setData(null);
      setError('');
    } else {
      if (cityHistory.length > 0) {
        let foundCity = false;
        cityHistory.forEach((cityData) => {
          if (cityData.name === enteredCity) {
            foundCity = true;
          }
        });
        if (foundCity) {
          setNewApi(false);
          setIsLoading(false);
          setError('');
        } else {
          setIsLoading(true);
          setError('');
          setNewApi(true);
        }
      } else {
        setIsLoading(true);
        setError('');
        setNewApi(true);
      }
    }
  };
  

  const formatTemperature = (temperature) => {
    return `${temperature}°C`;
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { timeStyle: 'short' });
  };

  const toggleRawDataVisibility = () => {
    setIsRawDataVisible(!isRawDataVisible);
  };

  const handleListClick = (data) => {
    setCity(data.name);
    setIsLoading(false);
    setData(data);
    setSelectedButton(data);
   
    
  }

  return (
    <div>
    <div className='all-api-page'>
    <div className='api-page'>
      <h1>Enter a city:</h1>
      <br />
      <div className='api-limit-box'>
      <h4>Total City Searches : {cityCount}</h4>
      <h4> Search LIMIT : {API_COUNT_LIMIT}</h4>
      </div>
      <br />
      {cityCountLimt && (<h4> ! ------- You Have reached the limit ------- !  </h4>)}
      <br />
      { !cityCountLimt && <BasicSelect onChange={handleCityChange} />}
      <br />
      {/* Display the fetched data or error message */}
      {isLoading && (
        <LinearProgress
          sx={{
            '& .MuiLinearProgress-bar': {
              transitionDuration: '8s', // Adjust the duration as per your requirement
            },
          }}
        />
      )}
      {error && !isLoading && (
        <div>
          <LinearProgress
            sx={{
              '& .MuiLinearProgress-bar': {
                transitionDuration: '8s', // Adjust the duration as per your requirement
              },
            }}
          />
          {error}
        </div>
      )}
      {data && !isLoading && (
        <div>
          <div className='api-data-display'>
            <div className='box-1'>
              <h2>{data.name}</h2>
              <p>Current Temperature: {formatTemperature(data.main.temp)}</p>
              <p>Feels Like: {formatTemperature(data.main.feels_like)}</p>
              <p>Description: {data.weather[0].description}</p>
              <p>Wind Speed: {data.wind.speed} km/h</p>
              <p>Humidity: {data.main.humidity}%</p>
              <p>Sunrise: {formatTime(data.sys.sunrise)}</p>
              <p>Sunset: {formatTime(data.sys.sunset)}</p>
              <p>Country: {data.sys.country}</p>
            </div>
            <div className='box-2'>
              <img
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                style={{ width: '300px', height: 'auto' }}
              />
            </div>
          </div>
          <br />
          <br />
          <button className='api-button' onClick={toggleRawDataVisibility} style={{ cursor: 'pointer' }}>
            {isRawDataVisible ? 'Hide Raw Data ▲' : 'Show Raw Data ▼ '}
          </button>
          {isRawDataVisible && (
            <div className='raw-data'>
              <br />
              <br />
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
          )}
          <br />
          <br />
        </div>
      )}

     
      </div>
      <div className="search-history">
        <h2>Search History</h2>
          <br />
          <p style={{ textAlign: 'center' }}>Click to go back!</p>

        
        {cityHistory.map((data) => (

          <List>
            <ListItem>
              <ListItemButton
                className={`item-button ${ selectedButton && selectedButton.name === data.name ? 'selected' : 'not-selected'}`}
                onClick={() => handleListClick(data)}
              >
                <ListItemText primary={data.name} secondary={data.main.temp} />
              </ListItemButton>
            </ListItem>
          </List>



        ) )}
       
        
      </div>
      </div>

    </div>
  );
}

export default MyComponent;
