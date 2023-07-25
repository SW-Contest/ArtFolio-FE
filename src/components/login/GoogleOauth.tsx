import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import SocialButton from './SocialButton';

const GoogleOauth = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_KEY;

    return (
        <div>
            {clientId && (
                <GoogleOAuthProvider clientId={clientId} >
                 <SocialButton title='Google' iconURL='www.google.com' txtColor={"white"} link={"http://syu.artfolio.shop/oauth2/authorization/google"} />
                 </GoogleOAuthProvider>
            )}
       
    </div>
    );
};

export default GoogleOauth;