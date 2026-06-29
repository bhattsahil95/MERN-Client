import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BasicSelect from '../components/ApiPage/Dropdown';
import LinearProgress from '@mui/material/LinearProgress';
import debounce from 'lodash/debounce';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ProjectPageHeader from '../components/ProjectPageHeader';
import projects from '../assets/projectsData';

const project = projects.find((p) => p.id === 'weather-api');

const progressSx = {
  height: 3,
  borderRadius: 2,
  backgroundColor: 'rgba(255,255,255,0.06)',
  '& .MuiLinearProgress-bar': {
    backgroundColor: '#ff8c00',
    transitionDuration: '8s',
  },
};

function ApiPage() {
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const units = 'Metric';
  const API_COUNT_LIMIT = 5;

  const [city, setCity] = useState('');
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isRawDataVisible, setIsRawDataVisible] = useState(false);
  const [cityCount, setCityCount] = useState(0);
  const [cityCountLimt, setCityCountLimit] = useState(false);
  const [cityHistory, setCityHistory] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);
  const [newApi, setNewApi] = useState(true);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=${units}`;

  const fetchData = async () => {
    setIsLoading(true);

    try {
      // Guard: check persisted history/count to avoid bypass via refresh
      const persisted = JSON.parse(localStorage.getItem('weather_cache') || 'null');
      if (persisted && Array.isArray(persisted.history) && persisted.history.find(h => h.name.toLowerCase() === city.toLowerCase())) {
        const existing = persisted.history.find(h => h.name.toLowerCase() === city.toLowerCase());
        setData(existing);
        setIsLoading(false);
        return;
      }

      const response = await axios.get(url);
      setData(response.data);
      setCityCount((previous) => {
        const next = previous + 1;
        try {
          const persisted = JSON.parse(localStorage.getItem('weather_cache') || 'null') || { count: 0, history: [] };
          persisted.count = next;
          persisted.history = persisted.history.concat([response.data]).slice(-API_COUNT_LIMIT);
          localStorage.setItem('weather_cache', JSON.stringify(persisted));
        } catch (e) {}
        return next;
      });

      setCityHistory((previous) => {
        const nextHist = [...previous, response.data].slice(-API_COUNT_LIMIT);
        try { localStorage.setItem('weather_cache', JSON.stringify({ count: cityCount + 1, history: nextHist })); } catch (e) {}
        return nextHist;
      });
      if (cityCount >= API_COUNT_LIMIT - 1) {
        setCityCountLimit(true);
      }
    } catch (err) {
      setError('Please enter a valid city');
      setData(null);
    }

    setIsLoading(false);
  };

  const debouncedFetchData = debounce(fetchData, 500);

  useEffect(() => {
    // load persisted weather cache (count and history)
    try {
      const persisted = JSON.parse(localStorage.getItem('weather_cache') || 'null');
      if (persisted) {
        setCityHistory(persisted.history || []);
        setCityCount(persisted.count || 0);
        if ((persisted.count || 0) >= API_COUNT_LIMIT) setCityCountLimit(true);
      }
    } catch (e) {}

    if (city.trim() !== '') {
      if (data === null || data.name.toLowerCase() !== city.toLowerCase()) {
        if (newApi && !cityCountLimt) {
          debouncedFetchData();
        } else {
          const historyData = cityHistory.filter((item) => item.name === city);
          setData(historyData[0] || 'Error Occured! ');
        }
      }
    } else {
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

  const formatTemperature = (temperature) => `${temperature}°C`;

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { timeStyle: 'short' });
  };

  const handleListClick = (item) => {
    setCity(item.name);
    setIsLoading(false);
    setData(item);
    setSelectedButton(item);
  };

  return (
    <div className="weather-api">
      <ProjectPageHeader
        title={project.title}
        description={project.description}
        tech={project.tech}
      />

      <div className="weather-api__layout">
        <div className="weather-api__main">
          <p className="weather-api__controls-label">Search a city</p>

          <div className="weather-api__stats">
            <span className="weather-api__stat">
              Searches: <strong>{cityCount}</strong>
            </span>
            <span className="weather-api__stat">
              Limit: <strong>{API_COUNT_LIMIT}</strong>
            </span>
          </div>

          {cityCountLimt && (
            <p className="weather-api__limit-notice">
              Search limit reached — select a city from history.
            </p>
          )}

          {!cityCountLimt && <BasicSelect onChange={handleCityChange} />}

          {isLoading && <LinearProgress sx={progressSx} />}

          {error && !isLoading && (
            <div className="weather-api__error">{error}</div>
          )}

          {data && !isLoading && typeof data === 'object' && (
            <div className="weather-api__result">
              <div className="weather-api__card">
                <div>
                  <h2 className="weather-api__city">{data.name}</h2>
                  <div className="weather-api__details">
                    <p>Temperature: <span>{formatTemperature(data.main.temp)}</span></p>
                    <p>Feels like: <span>{formatTemperature(data.main.feels_like)}</span></p>
                    <p>Conditions: <span>{data.weather[0].description}</span></p>
                    <p>Wind: <span>{data.wind.speed} km/h</span></p>
                    <p>Humidity: <span>{data.main.humidity}%</span></p>
                    <p>Sunrise: <span>{formatTime(data.sys.sunrise)}</span></p>
                    <p>Sunset: <span>{formatTime(data.sys.sunset)}</span></p>
                    <p>Country: <span>{data.sys.country}</span></p>
                  </div>
                </div>
                <div className="weather-api__icon">
                  <img
                    src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                    alt={data.weather[0].description}
                  />
                </div>
              </div>

              <div className="weather-api__toggle">
                <button
                  type="button"
                  className="api-button"
                  onClick={() => setIsRawDataVisible((prev) => !prev)}
                >
                  {isRawDataVisible ? 'Hide raw JSON ▲' : 'Show raw JSON ▼'}
                </button>
              </div>

              {isRawDataVisible && (
                <div className="weather-api__raw">
                  <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
              )}
            </div>
          )}
        </div>

        <aside className="weather-api__sidebar">
          <h2 className="weather-api__sidebar-title">Search history</h2>
          <p className="weather-api__sidebar-hint">Click to revisit</p>

          {cityHistory.map((item) => (
            <List key={item.id || item.name} disablePadding>
              <ListItem disablePadding>
                <ListItemButton
                  className={`weather-api__history-item ${
                    selectedButton && selectedButton.name === item.name
                      ? 'selected'
                      : ''
                  }`}
                  onClick={() => handleListClick(item)}
                >
                  <ListItemText
                    primary={item.name}
                    secondary={`${item.main.temp}°C`}
                    primaryTypographyProps={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8125rem',
                    }}
                    secondaryTypographyProps={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          ))}
        </aside>
      </div>
    </div>
  );
}

export default ApiPage;
