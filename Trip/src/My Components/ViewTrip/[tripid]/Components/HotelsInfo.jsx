import React from 'react';
import { Link } from 'react-router-dom';

function HotelsInfo({ trip }) {
  if (!trip?.tripData?.hotel_options || trip.tripData.hotel_options.length === 0) {
    return <p>No hotel recommendations available.</p>;
  }

  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendations</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {trip.tripData.hotel_options.map((hotel, index) => (
          <Link to={'https://www.google.com/maps/search/?api=1&query='+ hotel.hotel_name + "," +hotel.hotel_address} target='_blank'>
          <div
            key={index}
            className="p-4 border rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
          >
            <img
              src="/Trip Image.jpg"
              alt={hotel.hotel_name}
              className="rounded-2xl w-full h-48 object-cover mb-3"
            />
            <h3 className="font-semibold text-lg">{hotel.hotel_name}</h3>
            {/* <p className="text-gray-600">{hotel.description}</p> */}
            <p className="text-gray-500 mt-2">📍 {hotel.hotel_address}</p>
            <p className="font-medium mt-2">💰 {hotel.price}</p>
            <p className="font-medium mt-2">⭐ {hotel.rating}</p>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HotelsInfo;
