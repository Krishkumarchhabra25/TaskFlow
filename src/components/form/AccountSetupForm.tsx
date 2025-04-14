"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronsRight, Check, User, Users } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function AccountSetup() {
  const [step, setStep] = useState<1 | 2>(1);
  const [accountType, setAccountType] = useState<"personal" | "organization">("personal");
  const [invites, setInvites] = useState<string[]>(["", "", ""]);
  const { setup } = useAuth();
  const router = useRouter();

  const handleInviteChange = (idx: number, value: string) => {
    const updatedInvites = [...invites];
    updatedInvites[idx] = value;
    setInvites(updatedInvites);
  };

  const sendInvite = (email: string) => {
    if (!email.trim()) return;
    console.log(`Sending invitation to: ${email}`);
    // TODO: Replace with actual API call
  };

  const handleNext = () => {
    if (step === 1) {
      setup.mutate(
        { choice: accountType },
        {
          onSuccess: () => {
            if (accountType === "organization") {
              toast.success("You chose Organization", { id: "account-setup" });
              setStep(2);
            } else {
              toast.success("You chose Personal", { id: "account-setup" });
              router.push("/dashboard");
            }
          },
          onError: (err) => {
            toast.error("Setup failed", { id: "account-setup" });
            console.error("Setup failed:", err);
          },
        }
      );
    } else {
      invites
        .filter((email) => email.trim())
        .forEach(sendInvite);

      toast.success("Invitations sent!", { id: "account-setup" });
      router.push("/dashboard");
    }
  };

  const isLoading = setup.isLoading;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            TaskFlow
          </h1>
          <p className="text-gray-500 mt-2">Set up your workspace</p>
        </div>

        <Card className="border-none shadow-md">
          {/* Step Indicator */}
          <CardHeader>
            <div className="flex justify-between mb-2">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    i < step
                      ? "bg-green-500 text-white"
                      : i === step
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {i < step ? <Check className="h-4 w-4" /> : i}
                </div>
              ))}
            </div>
            <CardTitle className="text-xl">
              {step === 1 ? "Choose account type" : "Invite your team"}
            </CardTitle>
            <CardDescription>
              {step === 1
                ? "Select how you plan to use TaskFlow"
                : "Invite up to 3 team members to get started"}
            </CardDescription>
          </CardHeader>

          {/* Content */}
          <CardContent>
            {step === 1 ? (
              <RadioGroup
                value={accountType}
                onValueChange={(val) => setAccountType(val as "personal" | "organization")}
                className="grid gap-4"
              >
                <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-purple-500">
                  <RadioGroupItem
                    value="personal"
                    id="personal"
                    className="data-[state=checked]:bg-[#9B87F5]"
                  />
                  <Label htmlFor="personal" className="flex items-center flex-1">
                    <User className="h-5 w-5 mr-3 text-purple-600" />
                    <div>
                      <p className="font-medium">Personal Use</p>
                      <p className="text-sm text-gray-500">I’ll use TaskFlow for myself</p>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-purple-500">
                  <RadioGroupItem
                    value="organization"
                    id="organization"
                    className="data-[state=checked]:bg-[#9B87F5]"
                  />
                  <Label htmlFor="organization" className="flex items-center flex-1">
                    <Users className="h-5 w-5 mr-3 text-purple-600" />
                    <div>
                      <p className="font-medium">Organization</p>
                      <p className="text-sm text-gray-500">I’ll use TaskFlow with my team</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 mb-4">
                  Invite team members to collaborate on tasks and projects. As the workspace
                  creator, you’ll be the admin.
                </p>
                {invites.map((email, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="email"
                      placeholder="colleague@example.com"
                      className="flex-1 rounded-md border px-3 py-2 text-sm"
                      value={email}
                      onChange={(e) => handleInviteChange(index, e.target.value)}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => sendInvite(email)}
                      disabled={!email.trim()}
                    >
                      Invite
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>

          {/* Footer */}
          <CardFooter>
            <Button
              className="w-full bg-[#9B87F5] hover:bg-primary/90"
              onClick={handleNext}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center">
                  {step === 2 ? "Finish & Go Home" : "Continue"}
                  <ChevronsRight className="h-4 w-4 ml-2" />
                </span>
              )}
            </Button>
            {step === 2 && (
  <div className="w-full flex justify-end">
  <button
    className="text-sm text-gray-500 hover:underline"
    onClick={() => router.push("/")}
  >
    Skip for now
  </button>
</div>
)}

          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
