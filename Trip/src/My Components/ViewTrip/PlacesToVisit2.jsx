import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createClient } from 'pexels';

function PlacesToVisit2({ trip }) {
  const [images, setImages] = useState({});
  const client = createClient('e9XVYtoCy2GjEv6N1c8stNr9RVurSxaq1e7gpbLCrV7Uu5EZCQFcV2RY'); // Initialize Pexels client

  const fetchPlaceImage = async (placeName) => {
    const query = placeName;

    try {
      const response = await client.photos.search({ query, per_page: 1 });

      const photos = response.photos;
      if (photos.length > 0) {
        const photo = photos[0];
        return photo.src.original; // Return the URL of the original image
      }
    } catch (error) {
      console.error(`Error fetching image for ${placeName}:`, error.message);
    }

    return '/Trip Image.jpg'; // Fallback image
  };

  useEffect(() => {
    const fetchAllImages = async () => {
      const newImages = {};
      if (trip.tripData?.itinerary) {
        const fetches = []; // Array to store all fetch promises

        Object.values(trip.tripData.itinerary).forEach((dayData) => {
          dayData.places.forEach((place) => {
            fetches.push(
              fetchPlaceImage(place.place_name).then((imageUrl) => {
                newImages[place.place_name] = imageUrl;
              })
            );
          });
        });

        await Promise.all(fetches); // Wait for all fetches to complete
        setImages(newImages); // Update the state after all images are fetched
      }
    };

    fetchAllImages();
  }, [trip]);

  return (
    <div>
      <h2 className="font-bold text-lg mt-6">Places to Visit</h2>
      <div>
        {trip.tripData?.itinerary &&
          Object.entries(trip.tripData.itinerary)
            .sort(([keyA], [keyB]) => {
              const numA = parseInt(keyA.replace('day', ''), 10);
              const numB = parseInt(keyB.replace('day', ''), 10);
              return numA - numB;
            })
            .map(([dayKey, dayData], index) => (
              <div key={index} className="mb-8">
                <h3 className="font-semibold text-xl mb-6">
                  {dayKey.charAt(0).toUpperCase() + dayKey.slice(1)} - Best Time: {dayData.best_time_to_visit}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {dayData.places.map((place, placeIndex) => (
                    <Link
                      key={placeIndex}
                      to={`https://www.google.com/maps/search/?api=1&query=${place.place_name},${place.place_address}`}
                      target="_blank"
                      className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transform transition-transform duration-300 hover:scale-105"
                      style={{ maxWidth: '1000px', margin: '0 auto' }}
                    >
                      {/* Image Section */}
                      <div className="w-full md:w-1/2">
                        <img
                          src={images[place.place_name] || '/Trip Image.jpg'}
                          alt={place.place_name}
                          className="h-60 md:h-full w-full object-cover"
                        />
                      </div>

                      {/* Info Section */}
                      <div className="p-6 w-full md:w-1/2">
                        <h4 className="font-semibold text-lg text-blue-500">{place.place_name}</h4>
                        <p className="text-gray-600 mt-2">{place.place_details}</p>
                        <div className="mt-4">
                          <p className="text-gray-500">🕖 {place.time_travel}</p>
                          <p className="font-medium mt-2">⭐ {place.rating}</p>
                          <p className="font-medium mt-2">🎟 {place.ticket_pricing}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default PlacesToVisit2;
