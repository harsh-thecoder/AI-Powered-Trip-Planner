import React from 'react';
import { Link } from 'react-router-dom';

function PlacesToVisit({ trip }) {
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
                      target='_blank'
                      className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transform transition-transform duration-300 hover:scale-105"
                      style={{ maxWidth: '1000px', margin: '0 auto' }}
                    >
                      {/* Image Section */}
                      <div className="w-full md:w-1/2">  {/* Reduced width to 1/2 */}
                        <img
                          src='/Trip Image.jpg'
                          alt={place.place_name}
                          className="h-60 md:h-full w-full object-cover"
                        />
                      </div>

                      {/* Info Section */}
                      <div className="p-6 w-full md:w-1/2"> {/* Info section still takes up 1/2 */}
                        <h4 className="font-semibold text-lg text-blue-500">{place.place_name}</h4> {/* Blue Title */}
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

export default PlacesToVisit;
