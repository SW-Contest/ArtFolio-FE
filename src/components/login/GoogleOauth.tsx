import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import SocialButton from "./SocialButton";
import { HOST } from "../../constants/host";

const GoogleOauth = () => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_KEY;

  return (
    <div>
      {clientId && (
        <GoogleOAuthProvider clientId={clientId}>
          <SocialButton
            title="Google"
            iconURL={"www.google.com"}
            txtColor={"white"}
          />
        </GoogleOAuthProvider>
      )}
    </div>
  );
};

export default GoogleOauth;
