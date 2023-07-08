import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import SocialButton from './SocialButton';

const GoogleOauth = () => {
    return (
        <div>
        <SocialButton title='Google' iconURL='www.google.com' txtColor={"white"} link={""} />
    </div>
    );
};

export default GoogleOauth;