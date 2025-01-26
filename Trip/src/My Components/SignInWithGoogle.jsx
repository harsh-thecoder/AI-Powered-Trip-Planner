import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader, 
  } from "@/components/ui/dialog";
  
const [dialog, setDialog] = useState(false); 

function SignInWithGoogle() {
  return (
    <div>
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

export default SignInWithGoogle