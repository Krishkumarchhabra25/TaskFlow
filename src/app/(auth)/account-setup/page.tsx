"use client";

import React, {useState} from 'react'
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
  } from "@/components/ui/card";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";

import { Check, ChevronsRight, Users, User } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
const AccountSetup = () => {

    const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState<"personal" | "organization">("personal");
  const [invites, setInvites] = useState<string[]>(["", "", ""]);
  const [loading, setLoading] = useState(false);
  const navigate = useRouter();


  const handleInviteChange = (index: number, value: string) => {
    const newInvites = [...invites];
    newInvites[index] = value;
    setInvites(newInvites);
  };

  const handleNext = () => {
    if (step === 1) {
      if (accountType === "organization") {
        setStep(2); // Go to team invite step for organization
      } else {
        // Skip team invite for personal use
        finalizeSetup();
      }
    } else {
      finalizeSetup();
    }
  };

  const sendInvite = (email: string) => {
    if (!email) return;
    
    // In a real app, this would send an invitation email
    console.log(`Sending invitation to: ${email}`);
   /*  toast({
      title: "Invitation sent",
      description: `An invitation has been sent to ${email}`,
    }); */
  };

  const finalizeSetup = () => {
    setLoading(true);
    
    // In a real app, this would save the user preferences to the API
    setTimeout(() => {
      console.log("Account setup completed:", {
        accountType,
        invites: invites.filter(inv => inv.trim() !== "")
      });
      
      // Update user with admin status and team owner status if organization account
     /*  if (user) {
        updateUser({
          role: "admin", // First user is always admin
          isTeamOwner: accountType === "organization",
          // In a real app, you would also set the teamId here
        });
      } */
      
      // Send invites if organization account
      if (accountType === "organization") {
        invites.forEach(email => {
          if (email.trim()) {
            sendInvite(email);
          }
        });
      }
      
      setLoading(false);
    /*   toast({
        title: "Setup complete",
        description: "Your workspace is ready to use!",
      }); */
      navigate.push("/"); // Redirect to dashboard
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            TaskFlow
          </h1>
          <p className="text-gray-500 mt-2">Set up your workspace</p>
        </div>

        <Card className="border-none shadow-md">
          <CardHeader>
            <div className="flex justify-between mb-2">
              {[1, 2].map((i) => (
                <div 
                  key={i}
                  className={`w-8 h-8 rounded-full flex items-center justify-center 
                    ${i < step ? "bg-green-500 text-white" : 
                      i === step ? "bg-purple-600 text-white" : 
                      "bg-gray-200 text-gray-500"}`}
                >
                  {i < step ? <Check className="h-4 w-4" /> : i}
                </div>
              ))}
            </div>
            <CardTitle className="text-xl">
              {step === 1 ? "Choose account type" : "Invite your team"}
            </CardTitle>
            <CardDescription>
              {step === 1 ? "Select how you plan to use TaskFlow" : 
               "Invite up to 3 team members to get started"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 && (
             <RadioGroup 
             value={accountType} 
             onValueChange={(value) => setAccountType(value as "personal" | "organization")}
             className="grid grid-cols-1 gap-4"
           >
             <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-purple-500">
               <RadioGroupItem 
                 value="personal" 
                 id="personal" 
                 className="data-[state=checked]:bg-[#9B87F5]" 
               />
               <Label htmlFor="personal" className="flex items-center cursor-pointer flex-1">
                 <User className="h-5 w-5 mr-3 text-purple-600" />
                 <div>
                   <p className="font-medium">Personal Use</p>
                   <p className="text-sm text-gray-500">I'll use TaskFlow for my own tasks</p>
                 </div>
               </Label>
             </div>
           
             <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-purple-500">
               <RadioGroupItem 
                 value="organization" 
                 id="organization" 
                 className="data-[state=checked]:bg-[#9B87F5]" 
               />
               <Label htmlFor="organization" className="flex items-center cursor-pointer flex-1">
                 <Users className="h-5 w-5 mr-3 text-purple-600" />
                 <div>
                   <p className="font-medium">Organization</p>
                   <p className="text-sm text-gray-500">I'll use TaskFlow with my team</p>
                 </div>
               </Label>
             </div>
           </RadioGroup>
           
            )}

            {step === 2 && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 mb-4">
                  Invite team members to collaborate on tasks and projects.
                  As the workspace creator, you will be the admin with full control.
                </p>
                
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <input
                      type="email"
                      placeholder="colleague@example.com"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={invites[i]}
                      onChange={(e) => handleInviteChange(i, e.target.value)}
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => sendInvite(invites[i])}
                      disabled={!invites[i].trim()}
                    >
                      Invite
                    </Button>
                  </div>
                ))}
                
                <div className="text-sm text-gray-500 mt-6">
                  <p>Team members will be invited as regular users (not admins).</p>
                  <p>You can manage permissions in team settings after setup.</p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full  hover:bg-primary/90 bg-[#9B87F5]"
              onClick={handleNext}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center">
                  {step === 2 ? "Complete Setup" : "Continue"}
                  <ChevronsRight className="h-4 w-4 ml-2" />
                </span>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default AccountSetup
