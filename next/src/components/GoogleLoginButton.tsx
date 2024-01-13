"use client";

import { useEffect, useRef } from "react";
declare const google: any;

export default function GoogleLoginButton() {
  const button = useRef(null);

  useEffect(() => {
    if (!google) {
      return;
    }

    if (button.current) {
      google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        login_uri: process.env.NEXT_PUBLIC_GOOGLE_LOGIN_URI,
        ux_mode: "redirect",
      });
      google.accounts.id.renderButton(button.current, {
        theme: "outline",
        size: "large",
        type: "standard",
        text: "sign_in_with",
        shape: "pill",
        logo_alignment: "left",
        width: "256",
      });
    }
  }, [button]);

  return <div ref={button}></div>;
}
