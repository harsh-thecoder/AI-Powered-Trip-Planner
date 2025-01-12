import React, { useState } from 'react';
import axios from 'axios';

const PlacesFourSquare = ({ onPlaceSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const API_TOKEN = import.meta.env.VITE_LOCATION_IQ_AUTOCOMPLETE_API_KEY; // Your LocationIQ token

  const fetchSuggestions = async (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://us1.locationiq.com/v1/autocomplete.php`,
        {
          params: {
            key: API_TOKEN,
            q: input,
            limit: 5,
          },
        }
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching autocomplete suggestions:', error);
    }
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setQuery(input);
    fetchSuggestions(input);
  };

  const handleSelectSuggestion = (place) => {
    setQuery(place.display_name); // Update input field
    setSuggestions([]); // Clear suggestions
    if (onPlaceSelect) {
      onPlaceSelect(place); // Pass selected place to parent
    }
  };

  return (
    <div style={{ marginTop: '10px' }}>
      <input
        type='text'
        value={query}
        onChange={handleInputChange}
        placeholder='Search for a place...'
        className='w-full p-3 border rounded shadow-sm'
      />
      <ul className='bg-white border rounded mt-2'>
        {suggestions.map((place, index) => (
          <li
            key={index}
            onClick={() => handleSelectSuggestion(place)}
            className='p-2 hover:bg-gray-100 cursor-pointer'
          >
            {place.display_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlacesFourSquare;
