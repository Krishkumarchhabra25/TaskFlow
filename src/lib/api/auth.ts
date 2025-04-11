
import axios from "axios";


const BASE_URL = process.env.NEXT_PUBLIC_API_URL  || "http://localhost:5001/api";


export interface RegisterUserData{
   username:string;
   email:string;
   password:string
}

export interface AuthResponse{
    message?:string;
    user: any;
    token:string;
}

export interface SetupRequest {
    choice: "personal" | "organization";
    organizationName?: string;
  }
  
  export interface SetupResponse {
    message: string;
    organization?: { id: string };
  }
  


//Resgister User
export async function registerUser(data:RegisterUserData):Promise<AuthResponse>{
    const res = await axios.post(`${BASE_URL}/user/register-user` , data);
    console.log("resgister succesfully...." ,res.data)
    return res.data
}

export async function loginUser(email:string , password:string):Promise<AuthResponse>{
   const res = await axios.post(`${BASE_URL}/user/login-user` , {email , password});
   console.log("Login Response " , res.data)
   return res.data;
}

export async function googleOAuthLogin(code:string):Promise<AuthResponse>{
    const res = await axios.post(`${BASE_URL}/user/auth/google` , {code});
    console.log("GoogleOAuth Response...." , res.data)

    return res.data
}
export async function githubOAuthLogin(code:string):Promise<AuthResponse>{
    const res = await axios.post(`${BASE_URL}/user/auth/github` , {code});
    console.log("GithubOAuth Response...." , res.data)

    return res.data
}

export async function setupAccount(
    data: SetupRequest,
    token: string
  ): Promise<SetupResponse> {
    const res = await axios.post(
      `${BASE_URL}/invite/setup`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("Setup Response:", res.data);
    return res.data;
  }