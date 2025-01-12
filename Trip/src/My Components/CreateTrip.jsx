import React from 'react';
import PlacesFourSquare from './PlacesFourSquare'; // Ensure this is the correct path to your component

function CreateTrip() {
  const handlePlaceSelect = (selectedPlace) => {
    // Handle the selected place here
    console.log('Selected Place:', selectedPlace);
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us Your Preferences</h2>
      <p className='mt-3 text-gray-500 text-xl'>
        Just provide some basic Information and we'll provide you Customized
        Itinerary based on Your Preferences
      </p>

      <div className='mt-20'>
        <div>
          <h2 className='text-xl'>What is your destination of choice?</h2>
          {/* Integrating the PlacesFourSquare component */}
          <PlacesFourSquare onPlaceSelect={handlePlaceSelect} />
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
