import React from 'react';
import Carousel from '../components/ui/Carousel';
import Layout from '../components/ui/Layout';
import Logo from '../components/ui/Logo';
import InputBar from '../components/ui/InputBar';
import LoginButton from '../components/ui/LoginButton';
import SocialButton from '../components/ui/SocialButton';

const LoginPage = () => {
    //이곳에 로그인 페이지의 내용 작성
    return (
            <Layout>
            <header>
            <Logo />
            </header>
            <div className='mt-20'>
                <InputBar />
                <LoginButton />
                <div className='w-full flex items-center list-none mx-12 text-xs mt-8 text-slate-400 space-x-4'>
                    <li className='pr-8 border-r border-slate-400'>아이디 찾기</li>
                    <div className=' border-1 border-slate-400 h-6'></div>
                    <li className='pr-8 border-r border-slate-400'>비밀번호 찾기</li>
                    <div className=' border-1 border-slate-400 h-6'></div>
                    <li>회원가입</li>
                </div>
            </div>
            <div className='text-slate-400 mt-20 text-sm flex items-center'>
        <hr className='flex-grow border-slate-400 mx-3'></hr>    
        간편 로그인
        <hr className='flex-grow border-slate-400 mx-3'></hr>
        </div>
            <SocialButton title={"Naver"} bgColor={"#17CE5F"} txtColor={"white"} />
            <SocialButton title={"Kakao"} bgColor={"#FAE100"} txtColor={"black"} />
            <SocialButton title={"Google"} bgColor={"#4284F3"} txtColor={"white"} />
            <div className='mb-20'/>
            </Layout>
    );
};

export default LoginPage;