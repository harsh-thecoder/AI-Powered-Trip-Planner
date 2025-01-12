import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlacesFourSquare = ({ onPlaceSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const API_TOKEN = import.meta.env.VITE_LOCATION_IQ_AUTOCOMPLETE_API_KEY;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // Wait for 500ms after the user stops typing

    return () => clearTimeout(timer); // Cleanup the timer on query change
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(
          `https://us1.locationiq.com/v1/autocomplete.php`,
          {
            params: {
              key: API_TOKEN,
              q: debouncedQuery,
              limit: 5,
            },
          }
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSelectSuggestion = (place) => {
    setQuery(place.display_name);
    setSuggestions([]);
    if (onPlaceSelect) {
      onPlaceSelect(place);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a place..."
        className="w-full p-3 border rounded shadow-sm"
      />
      <ul className="bg-white border rounded mt-2">
        {suggestions.map((place, index) => (
          <li
            key={index}
            onClick={() => handleSelectSuggestion(place)}
            className="p-2 hover:bg-gray-100 cursor-pointer"
          >
            {place.display_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlacesFourSquare;
