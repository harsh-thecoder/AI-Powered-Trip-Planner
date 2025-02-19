import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createClient } from 'pexels';

function HotelsInfo({ trip }) {
  const [images, setImages] = useState({});
  const val = import.meta.env.VITE_PEXELS_API_KEY;
  const client = createClient(val); // Initialize Pexels client

  const fetchHotelImage = async (hotelName) => {
    const query = hotelName;

    try {
      const response = await client.photos.search({ query, per_page: 1 });

      const photos = response.photos;
      if (photos.length > 0) {
        const photo = photos[0];
        return photo.src.original; // Return the URL of the original image
      }
    } catch (error) {
      console.error(`Error fetching image for ${hotelName}:`, error.message);
    }

    return '/Trip Image.jpg'; // Fallback image
  };

  useEffect(() => {
    const fetchAllImages = async () => {
      const newImages = {};
      if (trip.tripData?.hotel_options) {
        const fetches = []; // Array to store all fetch promises

        trip.tripData.hotel_options.forEach((hotel) => {
          fetches.push(
            fetchHotelImage(hotel.hotel_name).then((imageUrl) => {
              newImages[hotel.hotel_name] = imageUrl;
            })
          );
        });

        await Promise.all(fetches); // Wait for all fetches to complete
        setImages(newImages); // Update the state after all images are fetched
      }
    };

    fetchAllImages();
  }, [trip]);

  if (!trip?.tripData?.hotel_options || trip.tripData.hotel_options.length === 0) {
    return <p>No hotel recommendations available.</p>;
  }

  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendations</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {trip.tripData.hotel_options.map((hotel, index) => (
          <Link
            key={index}
            to={`https://www.google.com/maps/search/?api=1&query=${hotel.hotel_name},${hotel.hotel_address}`}
            target='_blank'
          >
            <div
              className="p-4 border rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
            >
              <img
                src={images[hotel.hotel_name] || '/Trip Image.jpg'} // Use the fetched image
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
