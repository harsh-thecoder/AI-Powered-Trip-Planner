import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Corrected hook name
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '@/service/firebaseconfig';
import UserTripCardItem from './UserTripCardItem';

function MyTrips() {
  const navigate = useNavigate(); // Use the hook in the main body of the component
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/'); // Use `navigate` directly
    }

    setUserTrips([]);

    const q = query(collection(db, 'AITrips'), where('userEmail', '==', user?.email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setUserTrips(prevVal => [...prevVal, doc.data()])
    });
  };

  return (
    <div>
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
        <h2 className='font-bold text-3xl'>My Trips</h2>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-10'>
         {userTrips.map ((trip,index) => (
            <UserTripCardItem trip={trip} className=""/>
         ))}
      </div>
    </div>
  );
}

export default MyTrips;
