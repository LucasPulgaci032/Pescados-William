"use client";

import axios from "axios";
import { useEffect } from "react";


declare global {
  interface Window {
    google: any;
  }
}

export default function GoogleLoginButton() {

  async function handleCredentialsResponse(response: any) {
   
    try {
      const token = response.credential;

        const res = await axios.post(
      "/api/users/routes/auth/google",
      {
        token,
      },
      {
        withCredentials: true,
      }
    );
      
      if(res.status === 200){
        console.log("REDIRECIONANDO");
        window.location.replace("/dashboard");
      }
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (document.getElementById("google-script")) return;

    const script = document.createElement("script");

    script.id = "google-script";
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (!window.google) return;

      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleCredentialsResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google_btn"),
        {
          theme: "outline",
          size: "large",
        }
      );
    };

    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return <div id="google_btn"></div>;
}