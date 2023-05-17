import React from 'react';
import Carousel from '../components/ui/Carousel';
import Layout from '../components/ui/Layout';
import Logo from '../components/ui/Logo';
import InputBar from '../components/ui/InputBar';

const LoginPage = () => {
    //이곳에 로그인 페이지의 내용 작성
    return (
            <Layout>
            <header>
            <Logo />
            </header>
            <div className='mt-20'>
                <InputBar />
            </div>
            </Layout>
    );
};

export default LoginPage;