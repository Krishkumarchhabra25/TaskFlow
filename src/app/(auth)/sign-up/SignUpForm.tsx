"use client";
import React from 'react'

import  { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeOffIcon, UserPlus, Github ,EyeIcon } from "lucide-react";
import { RegisterUserData } from '@/lib/api/auth';
import { useAuth } from '@/hooks/useAuth';
import toast from "react-hot-toast";

const SignUp = () => {
    const { register } = useAuth();

    const [formData, setFormData] = useState<RegisterUserData & { confirmPassword: string }>({
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
  
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };
  
    const validate = () => {
      const newErrors: Record<string, string> = {};
      if (!formData.username.trim()) newErrors.username = "Username is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      if (!formData.password.trim()) newErrors.password = "Password is required";
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleSignUp = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;
  
      try {
        setLoading(true);
        await register.mutateAsync({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
        toast.success("Account created successfully");
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);  
      }
    };
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          TaskFlow
        </h1>
        <p className="text-gray-500 mt-2">Create your account</p>
      </div>

      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Get started</CardTitle>
          <CardDescription>
            Register to manage your tasks and collaborate with your team
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="w-full" 
           //   onClick={() => handleSocialSignUp('Google')}
              disabled={loading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 mr-2">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </Button>
            <Button 
              variant="outline" 
              className="w-full" 
            //  onClick={() => handleSocialSignUp('GitHub')}
              disabled={loading}
            >
              <Github className="h-5 w-5 mr-2" />
              GitHub
            </Button>
          </div>

          <div className="flex items-center justify-center my-6">
  <div className="flex-grow border-t border-gray-300" />
  <span className="mx-4 text-xs text-gray-500">OR</span>
  <div className="flex-grow border-t border-gray-300" />
</div>


          <form onSubmit={handleSignUp}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium text-gray-700">
                  Username
                </label>
                <Input
                  id="username"
                  name="username"
                  placeholder="johndoe"
                  value={formData.username}
                  onChange={handleChange}
                  className={errors.username ? "border-red-500" : ""}
                />
                {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? "border-red-500" : ""}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? "border-red-500" : ""}
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 mt-2"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Sign up
                  </span>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center text-gray-500 w-full">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-purple-600 hover:text-purple-800 font-medium">
  Sign in
</Link>

          </p>
        </CardFooter>
      </Card>
    </div>
  </div>
  ) 
}

export default SignUp
