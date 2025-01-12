import React, { useState, useEffect } from 'react';
import PlacesFourSquare from './PlacesFourSquare';
import { Input } from "@/components/ui/input"
import { SelectBudgetOptions } from './SelectBudgetOptions';
import { SelectTravelList } from './SelectTravelList';
import { Button } from '@/components/ui/button';

function CreateTrip() {
  const [place, setPlaces] = useState(); // State to store the selected place
  const [formdata,setFormdata] = useState([]);

  const handleInputChange = (name,value) => {
    setFormdata({
      ...formdata,
      [name]:value 
    })
  }

  useEffect(() => {
    console.log(formdata);
  },[formdata])

  const handlePlaceSelect = (selectedPlace) => {
    // Handle the selected place here
    setPlaces(selectedPlace);
  };

  // Log the selected place whenever it changes
  useEffect(() => {
    if (place) {
      console.log('Selected Place:', place);
    }
  }, [place]); // Dependency array ensures this effect runs only when "place" changes

  const OnGenerateTrip = () => {
    if(formdata?.noOfDays > 5){
      alert('Please Enter Number of days for Trip Less than 5');
      return;  
    }

    console.log(formdata);
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us Your Preferences 🌅🌴</h2>
      <p className='mt-3 text-gray-500 text-xl'>
        Just provide some basic Information and we'll provide you Customized
        Itinerary based on Your Preferences
      </p>

      <div className='mt-20 flex flex-col gap-9'>
        <div>
          <h2 className='text-xl'>What is your destination of choice?</h2>
          {/* Integrating the PlacesFourSquare component */}
          <PlacesFourSquare onPlaceSelect={handlePlaceSelect} />
        </div>
        <div>
          <h2 className='text-xl'>How many days are you Planning for your Trip ?</h2>
          <Input placeholder={'Ex.3'} type='number'
           onChange = {(e) => handleInputChange('noOfDays',e.target.value)}
          />
        </div>
      </div>

      <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
      <div className='grid grid-cols-3 gap-5 mt-5'>
        {SelectBudgetOptions.map((item, index) => (
          <div
            key={index}
            onClick={(e) => handleInputChange('budget',item.title)}
            className= {`p-4 border cursor-pointer hover:shadow-lg transform hover:scale-105 transition-transform duration-200 
             ${formdata?.budget == item.title &&'shadow-lg border-black rounded-2xl'} `}
            >
            <h2 className='text-4xl'>{item.icon}</h2>
            <h2 className='font-bold text-lg'>{item.title}</h2>
            <h2 className='text-sm text-gray-500'>{item.description}</h2>
          </div>
        ))}
      </div>  

      <h2 className='text-xl my-3 font-medium mt-5'>Who do you plan on travelling with on Your next Adventure ?</h2>
      <div className='grid grid-cols-3 gap-5 mt-5'>
        {SelectTravelList.map((item, index) => (
          <div
            key={index}
            onClick={(e) => handleInputChange('traveler',item.people)} 
            className={`p-4 border cursor-pointer hover:shadow-lg transform hover:scale-105 transition-transform duration-200
              ${formdata?.traveler==item.people &&'shadow-lg border-black rounded-2xl'}`
          }>
            <h2 className='text-4xl'>{item.icon}</h2>
            <h2 className='font-bold text-lg'>{item.title}</h2>
            <h2 className='text-sm text-gray-500'>{item.description}</h2>
          </div>
        ))}
      </div> 

      <div className='my-10 flex justify-end'>
         <Button onClick={OnGenerateTrip}>Generate Trip</Button>
      </div>

    </div>
  );
}

export default CreateTrip;
