import React from 'react';

interface SocialButtonProps {
    title: string;
    bgColor: string;
    txtColor: string;
}

const SocialButton = (props:SocialButtonProps) => {

    return (
        <div className='flex justify-center'>
            <button style={{background : `${props.bgColor}`}} className={`w-11/12 text-sm flex justify-center mt-5 pt-3 pb-3 rounded text-${props.txtColor}`}>
            {props.title}로 로그인
        </button>    
       </div>
    );
};


export default SocialButton;