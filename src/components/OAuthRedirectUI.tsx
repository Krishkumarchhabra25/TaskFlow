// components/OAuthRedirectUI.tsx
"use client";
import { Loader2, CheckCircle2 } from "lucide-react";

interface Props {
  authStep: "authenticating" | "success";
}

export default function OAuthRedirectUI({ authStep }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9b87f5] to-[#8670e3] flex items-center justify-center">
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl w-full max-w-md mx-4">
        {authStep === "authenticating" ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-[#9b87f5]/10 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-[#9b87f5] animate-spin" />
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-[#9b87f5] border-t-transparent animate-spin" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Authenticating...</h2>
            <p className="text-gray-500 text-center">
              Please wait while we securely log you in
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Success!</h2>
            <p className="text-gray-500 text-center">
              You have been successfully authenticated
            </p>
            <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#9b87f5] animate-[progress_1s_ease-in-out_forwards]" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
