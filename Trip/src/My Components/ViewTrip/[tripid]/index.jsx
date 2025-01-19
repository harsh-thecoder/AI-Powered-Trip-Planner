import { db } from '@/service/firebaseconfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InformationSection from './Components/InformationSection';
import HotelsInfo from './Components/HotelsInfo';
import PlacesToVisit from './Components/PlacesToVisit';

function ViewTrip() {
  const {tripId} = useParams();
  const [trip,setTrip] = useState([]);

  useEffect(() => {
       tripId&&GetTripData();
  },[tripId])

  const GetTripData = async () => {
    const docref = doc(db,'AITrips',tripId);
    const docSnap = await getDoc(docref);
    if(docSnap.exists()){
      console.log("Document : ",docSnap.data());
      setTrip(docSnap.data());
    }
    else{
      console.log("No such Documents");
      toast({
                title: "No Trip Found",
                description: "Failed to fetch user profile. Please try again.",
                action: <ToastAction altText="Retry">Retry</ToastAction>,
              });
    }
  }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
         {/* Information Section */}
          <InformationSection trip = {trip}/>

         {/* Recommended Hotels */}
          <HotelsInfo trip = {trip}/>

         {/* Daily Plan */}
         <PlacesToVisit trip={trip}/>

         {/* Footer */}
    </div>
  )
}

export default ViewTrip