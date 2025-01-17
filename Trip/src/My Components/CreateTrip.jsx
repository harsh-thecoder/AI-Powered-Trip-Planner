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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader, 
} from "@/components/ui/dialog";

function CreateTrip() {
  const [place, setPlaces] = useState(); // State to store the selected place
  const [formdata, setFormdata] = useState([]);
  const { toast } = useToast(); // Initialize the toast hook
  const [dialog, setDialog] = useState(false); // For Google sign-in dialog

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

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setDialog(true); // Show sign-in dialog if user is not authenticated
      return;
    }

    if (formdata?.noOfDays > 5) {
      toast({
        title: "Invalid Number of Days",
        description: "Please enter number of days less than 5.",
        action: <ToastAction altText="Okay">Okay</ToastAction>,
      });
      return;
    }

    if (formdata?.noOfDays <= 0) {
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

    const FINAL_PROMPT = AI_PROMPT
      .replace("{location}", formdata?.location?.display_name)
      .replace("{totaldays}", formdata?.noOfDays)
      .replace("{traveler}", formdata?.traveler)
      .replace("{budget}", formdata?.budget);

    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
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
        <Button onClick={OnGenerateTrip}>Generate Trip</Button>
      </div>

      <Dialog open={dialog} onOpenChange={setDialog}>
        <DialogContent className="w-80 py-3 px-4">
          <DialogHeader>
            <DialogDescription className="space-y-3">
              <img src="logo.jpg" alt="" className="mx-auto" />
              <h2 className="font-bold text-lg">Sign In with Google</h2>
              <p className="text-sm text-gray-600">Sign in to the App with Google authentication securely</p>
              <Button className="w-full mt-3 mb-3">
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
