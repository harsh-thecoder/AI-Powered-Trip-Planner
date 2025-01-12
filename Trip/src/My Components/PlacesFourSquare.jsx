import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlacesFourSquare = ({ onPlaceSelect }) => {
  const [query, setQuery] = useState(''); // The query state for user input
  const [suggestions, setSuggestions] = useState([]); // Suggestions from API
  const [debouncedQuery, setDebouncedQuery] = useState(''); // The debounced query

  const API_TOKEN = import.meta.env.VITE_LOCATION_IQ_AUTOCOMPLETE_API_KEY;

  // Debounce the query input to reduce API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // Wait for 500ms after the user stops typing

    return () => clearTimeout(timer); // Cleanup the timer on query change
  }, [query]);

  // Fetch the suggestions based on the debounced query
  useEffect(() => {
    if (!debouncedQuery) {
      setSuggestions([]); // Clear suggestions if query is empty
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
        setSuggestions(response.data); // Set suggestions from API
      } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error);
      }
    };

    fetchSuggestions(); // Trigger the fetch on debounced query change
  }, [debouncedQuery]);

  const handleInputChange = (e) => {
    setQuery(e.target.value); // Update query on input change
  };

  const handleSelectSuggestion = (place) => {
    setQuery(place.display_name); // Update input with selected place
    setSuggestions([]); // Clear the suggestions list
    if (onPlaceSelect) {
      onPlaceSelect(place); // Pass selected place to the parent component
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange} // Trigger on input change
        placeholder="Search for a place..."
        className="w-full p-3 border rounded shadow-sm"
      />
      <ul className="mt-2">
        {suggestions.map((place, index) => (
          <li
            key={index}
            onClick={() => handleSelectSuggestion(place)} // Select suggestion
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
