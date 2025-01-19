"use client";
import React, { useState, useEffect } from "react";
import PlacesFourSquare from "./PlacesFourSquare";
import { Input } from "@/components/ui/input";
import { SelectBudgetOptions } from "./SelectBudgetOptions";
import { SelectTravelList } from "./SelectTravelList";
import { Button } from "@/components/ui/button";
import { useToast } from "../hooks/use-toast"; // Adjust path based on file structure
import { ToastAction } from "@/components/ui/toast";
import { AI_PROMPT, chatSession } from "@/service/AIModel";
import { FcGoogle } from "react-icons/fc";
import { db } from "@/service/firebaseconfig";
import { setDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader, 
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlaces] = useState(); // State to store the selected place
  const [formdata, setFormdata] = useState([]);
  const { toast } = useToast(); // Initialize the toast hook
  const [dialog, setDialog] = useState(false); // For Google sign-in dialog
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormdata({
      ...formdata,
      [name]: value,
    });
  };

  const handlePlaceSelect = (selectedPlace) => {
    // Handle the selected place here
    setPlaces(selectedPlace);
    handleInputChange("location", selectedPlace);
  };

  useEffect(() => {
    console.log(formdata);
  }, [formdata]);

  // Log the selected place whenever it changes
  useEffect(() => {
    if (place) {
      console.log("Selected Place:", place);
    }
  }, [place]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      console.log(codeResp);
      GetUserProfile(codeResp); // Fetch user profile
    },
    onError: (error) => {
      console.error("Google OAuth Error:", error);
    },
  });
  

  const OnGenerateTrip = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
  
    // If user is not signed in, prompt them to sign in
    if (!user) {
      setDialog(true); // Show sign-in dialog
      return;
    }
  
    // Validate the form inputs
    if (formdata?.noOfDays > 5) {
      toast({
        title: "Invalid Number of Days",
        description: "Please enter number of days less than 5.",
        action: <ToastAction altText="Okay">Okay</ToastAction>,
      });
      return;
    }
  
    if (formdata?.noOfDays < 0) {
      toast({
        title: "Invalid Number of Days",
        description: "Please enter number of days more than 0.",
        action: <ToastAction altText="Okay">Okay</ToastAction>,
      });
      return;
    }
  
    if (!formdata?.budget || !formdata?.traveler || !formdata?.location || !formdata?.noOfDays) {
      toast({
        title: "Incomplete Form",
        description: "Kindly fill all the required fields of the form.",
        action: <ToastAction altText="Fill now">Fill now</ToastAction>,
      });
      return;
    }
  
       setLoading(true);
       // Generate the AI prompt
       const FINAL_PROMPT = AI_PROMPT
      .replace("{location}", formdata?.location?.display_name)
      .replace("{totaldays}", formdata?.noOfDays)
      .replace("{traveler}", formdata?.traveler)
      .replace("{budget}", formdata?.budget);
  
    // console.log(FINAL_PROMPT);
  
    // Send the AI prompt for processing
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log("--",result?.response?.text());
    setLoading(false);
    SaveAITrip(result?.response?.text());
  };

  const SaveAITrip = async (TripData) => {

      setLoading(true);
      const user = JSON.parse(localStorage.getItem('user'));
      const docID = Date.now().toString();
      await setDoc(doc(db, "AITrips", docID), {
      userSelection: formdata,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docID
      });
      setLoading(false); 
      navigate(`/view-trip/${docID}`);
  }
  
  const GetUserProfile = (tokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: "application/json",
        },
      })
      .then((resp) => {
        console.log(resp.data);
        localStorage.setItem("user", JSON.stringify(resp.data)); // Save user profile
        setDialog(false); // Close the dialog
        OnGenerateTrip(); // Retry generating the trip
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
        toast({
          title: "Sign-In Error",
          description: "Failed to fetch user profile. Please try again.",
          action: <ToastAction altText="Retry">Retry</ToastAction>,
        });
      });
  };
  

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us Your Preferences 🌅🌴</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic Information and we'll provide you Customized
        Itinerary based on Your Preferences
      </p>

      <div className="mt-20 flex flex-col gap-9">
        <div>
          <h2 className="text-xl">What is your destination of choice?</h2>
          {/* Integrating the PlacesFourSquare component */}
          <PlacesFourSquare onPlaceSelect={handlePlaceSelect} />
        </div>
        <div>
          <h2 className="text-xl">How many days are you Planning for your Trip?</h2>
          <Input
            placeholder={"Ex.3"}
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
      </div>

      <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
      <div className="grid grid-cols-3 gap-5 mt-5">
        {SelectBudgetOptions.map((item, index) => (
          <div
            key={index}
            onClick={() => handleInputChange("budget", item.title)}
            className={`p-4 border cursor-pointer hover:shadow-lg transform hover:scale-105 transition-transform duration-200 
             ${formdata?.budget === item.title && "shadow-lg border-black rounded-2xl"} `}
          >
            <h2 className="text-4xl">{item.icon}</h2>
            <h2 className="font-bold text-lg">{item.title}</h2>
            <h2 className="text-sm text-gray-500">{item.description}</h2>
          </div>
        ))}
      </div>

      <h2 className="text-xl my-3 font-medium mt-5">
        Who do you plan on travelling with on Your next Adventure?
      </h2>
      <div className="grid grid-cols-3 gap-5 mt-5">
        {SelectTravelList.map((item, index) => (
          <div
            key={index}
            onClick={() => handleInputChange("traveler", item.people)}
            className={`p-4 border cursor-pointer hover:shadow-lg transform hover:scale-105 transition-transform duration-200
              ${formdata?.traveler === item.people && "shadow-lg border-black rounded-2xl"}`}
          >
            <h2 className="text-4xl">{item.icon}</h2>
            <h2 className="font-bold text-lg">{item.title}</h2>
            <h2 className="text-sm text-gray-500">{item.description}</h2>
          </div>
        ))}
      </div>

      <div className="my-10 flex justify-end">
        <Button 
           disabled = {loading}
           onClick={OnGenerateTrip}>
          {loading ? 
             <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" /> : 'Generate Trip'
          }
        </Button>
      </div>

      <Dialog open={dialog} onOpenChange={setDialog}>
        <DialogContent className="w-80 py-3 px-4">
          <DialogHeader>
            <DialogDescription className="space-y-3">
              <img src="logo.jpg" alt="" className="mx-auto" />
              <h2 className="font-bold text-lg">Sign In with Google</h2>
              <p className="text-sm text-gray-600">Sign in to the App with Google authentication securely</p>
              <Button 
                 onClick = {login} 
                 className="w-full mt-3 mb-3">
                <FcGoogle className="mr-2" /> Sign in With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
