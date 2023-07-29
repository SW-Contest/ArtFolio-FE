import React from 'react';
import SocialButton from './SocialButton';

const KakaoOauth = () => {
    const REST_API_KEY =import.meta.env.VITE_REST_API_KEY;
    const REDIRECT_URI = 'http://localhost:5173/'
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

    return (
        <div>
            <SocialButton title='Kakao' iconURL={"www.kakaocorp.com/page/"} txtColor={"white"} link={KAKAO_AUTH_URL} />
        </div>
    );
};

export default KakaoOauth;
