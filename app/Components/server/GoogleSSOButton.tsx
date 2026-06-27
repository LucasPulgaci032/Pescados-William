"use client";

import axios from "axios";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    google: any;
  }
}

export default function GoogleLoginButton() {
  const buttonRef = useRef<HTMLDivElement>(null);

  async function handleCredentialsResponse(response: any) {
    try {
      const token = response.credential;

      const res = await axios.post(
        "/api/users/routes/auth/google",
        { token },
        { withCredentials: true }
      );

      if (res.status === 200) {
        window.location.replace("/dashboard");
      }
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
      if (!window.google || !buttonRef.current) return;

      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleCredentialsResponse,
      });

      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: "outline",
        size: "large",
        width: 280,
      });
    };

    document.body.appendChild(script);

    return () => {
      document.getElementById("google-script")?.remove();
    };
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div ref={buttonRef} className="w-[280px]" />
    </div>
  );
}