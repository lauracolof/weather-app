import { useState, ChangeEvent, useEffect } from 'react';
import { forecastType, optionType } from '../types';

const useForecast = () => {
  const [term, setTerm] = useState<string>('');
  const [location, setLocation] = useState<optionType | null>(null);
  const [options, setOptions] = useState<[]>([]);
  const [forecast, setForecast] = useState<forecastType | null>(null);

  const getSearchOptions = (value: string) => {
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${
        process.env.REACT_APP_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => setOptions(data));
  };

  //define type like change event that happens in the HTML input
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setTerm(value);
    if (value === '') return;
    getSearchOptions(value);
  };

  const getForecast = (location: optionType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&unit=metric&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        const forecastData = {
          ...data.location,
          list: data.list.slice(0, 16),
        };
        setForecast(forecastData);
      });
  };

  const onSubmit = () => {
    if (!location) return;

    getForecast(location);
  };

  const onOptionSelect = (option: optionType) => {
    setLocation(option);
  };

  useEffect(() => {
    if (location) {
      setTerm(location.name);
      setOptions([]);
    }
  }, [location]);

  return { term, options, forecast, onInputChange, onOptionSelect, onSubmit };
};

export default useForecast;
