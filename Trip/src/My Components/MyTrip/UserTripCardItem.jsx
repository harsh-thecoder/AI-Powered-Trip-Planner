import React, { useState, useEffect } from 'react';
import { createClient } from 'pexels';

function UserTripCardItem({ trip }) {
  const val = import.meta.env.VITE_PEXELS_API_KEY; // Access the Pexels API key
  const [imageUrl, setImageUrl] = useState('/Trip Image.jpg'); // Default image
  const client = createClient(val); // Initialize Pexels client

  // Function to fetch the location image from Pexels
  const fetchLocationImage = async (location) => {
    const query = location;

    try {
      const response = await client.photos.search({ query, per_page: 1 });
      const photos = response.photos;
      if (photos.length > 0) {
        const photo = photos[0];
        setImageUrl(photo.src.original); // Set the image URL from Pexels
      }
    } catch (error) {
      console.error(`Error fetching image for ${location}:`, error.message);
    }
  };

  // Fetch the image when the component mounts or when the trip prop changes
  useEffect(() => {
    if (trip?.userSelection?.location?.address?.name) {
      const location = `${trip.userSelection?.location?.address?.name}, ${trip.userSelection?.location?.address?.country}`;
      fetchLocationImage(location); // Fetch the image based on location
    }
  }, [trip]);

  return (
    <div className="rounded-xl border p-4 shadow-md transition-transform hover:scale-105 hover:shadow-lg">
      <div className="overflow-hidden rounded-xl group">
        <img
          src={imageUrl}
          alt="Trip"
          className="h-[200px] w-full object-cover rounded-xl group-hover:brightness-110 transition-all duration-300"
        />
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold">
          {trip?.userSelection?.location?.address?.name},
          {trip?.userSelection?.location?.address?.country}
        </h2>
        <p className="text-gray-500 mt-2">
          📅 {trip?.userSelection?.noOfDays} Day(s) | 💰 {trip?.userSelection?.budget} Budget
        </p>
        <p className="text-gray-500">🚶‍♂️ {trip?.userSelection?.traveler} Traveler(s)</p>
      </div>
    </div>
  );
}

export default UserTripCardItem;
