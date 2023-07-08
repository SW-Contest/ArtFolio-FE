import React from 'react';
import SocialButton from './SocialButton';

const NaverOauth = () => {

    const NAVER_CLIENT_ID =import.meta.env.VITE_NAVER_CLIENT_ID;
    const REDIRECT_URI = "http://localhost:5173/";
    const STATE = "false";
    const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;
  
  
    return (
        <div>
            <SocialButton title='Naver' iconURL='www.naver.com' txtColor={"white"} link={NAVER_AUTH_URL} />
        </div>
    );
};

export default NaverOauth;