import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { googleLogout } from '@react-oauth/google';
import { useGoogleLogin } from "@react-oauth/google";
import axios from 'axios';
import { FcGoogle } from "react-icons/fc";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader, 
  } from "@/components/ui/dialog";
import { useNavigate } from 'react-router-dom';
import MyTrips from './MyTrip';


function Header() {

    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: (codeResp) => {
          console.log(codeResp);
          GetUserProfile(codeResp); // Fetch user profile
        },
        onError: (error) => {
          console.error("Google OAuth Error:", error);
        },
      });

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
    
    const [dialog, setDialog] = useState(false); 
    return (
        <div className='p-3 flex justify-between items-center'>
            <div className='h-30 w-20'>
               <a href="/"> <img src="/logo.jpg" alt="" /> </a> 
            </div>
            {user ?
                <div className='flex items-center gap-3'>
                    
                    <a href="/my-trips">
                      <Button variant="outline" className="rounded-full">My Trips</Button>
                    </a>
                    <Popover>
                        <PopoverTrigger>
                        <img src={user?.picture} className='h-[50px] w-[50px] rounded-full' />
                        </PopoverTrigger>
                        <PopoverContent>
                           <h2 className='cursor-pointer' onClick={() => {
                            googleLogout();
                            localStorage.clear();
                            navigate('/');
                           }}>Logout</h2> 
                        </PopoverContent>
                    </Popover>

                </div>
                :
                <Button onClick={() => setDialog(true)}>Sign In</Button>
            }

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

    )
}

export default Header