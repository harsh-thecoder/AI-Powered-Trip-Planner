import React from 'react';
import { Button } from '@/components/ui/button';
import { BsFillSendFill } from "react-icons/bs";

function InformationSection({ trip }) {
    return (
        <div className="">
            <img src="/Trip Image.jpg" className="h-[300px] w-full object-cover rounded-xl" alt="Trip" />

            <div className='flex justify-between items-center'>
                <div className='flex flex-col gap-4'>
                    <h2 className='font-bold text-2xl'>
                        {trip?.userSelection?.location?.address?.name},
                        {trip?.userSelection?.location?.address?.country}
                    </h2>
                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 md:text-md'>📅 {trip.userSelection?.noOfDays} Day</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 md:text-md'>💰 {trip.userSelection?.budget} Budget</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 md:text-md'>🚶‍♂️ No. of Traveler : {trip.userSelection?.traveler}</h2>
                    </div>
                </div>
                <Button><BsFillSendFill /></Button>
            </div>
        </div>
    );
}

export default InformationSection;
