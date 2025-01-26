import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { BsFillSendFill } from 'react-icons/bs';
import { createClient } from 'pexels';

function InformationSection({ trip }) {
  const val = import.meta.env.VITE_PEXELS_API_KEY;
  const [imageUrl, setImageUrl] = useState('/Trip Image.jpg'); // Default image
  const client = createClient(val); // Initialize Pexels client

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

  useEffect(() => {
    if (trip?.userSelection?.location?.address?.name) {
      const location = `${trip.userSelection?.location?.address?.name}, ${trip.userSelection?.location?.address?.country}`;
      fetchLocationImage(location); // Fetch the image based on location
    }
  }, [trip]);

  return (
    <div>
      <img
        src={imageUrl} // Display the fetched image
        className="h-[300px] w-full object-cover rounded-xl"
        alt="Trip"
      />

      <div className="flex justify-between items-center mt-4">
        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location?.address?.name},
            {trip?.userSelection?.location?.address?.country}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 md:text-md">📅 {trip.userSelection?.noOfDays} Day</h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 md:text-md">💰 {trip.userSelection?.budget} Budget</h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 md:text-md">🚶‍♂️ No. of Traveler : {trip.userSelection?.traveler}</h2>
          </div>
        </div>
        <Button>
          <BsFillSendFill />
        </Button>
      </div>
    </div>
  );
}

export default InformationSection;
