import React from 'react';

interface LoginButtonProps {
    onClick: () => void;
}
/* onClick: () => void; 는 LoginButtonProps 인터페이스에서 
정의된 onClick 속성이 함수이며, 아무런 값을 반환하지 않는다는 것을 의미한다.
즉, 이 함수는 호출되었을 때 어떤 값을 반환하지 않고, 단순히 어떤 작업을 수행하는 역할을 가지고 있다.*/

const LoginButton = (props : LoginButtonProps) => {
    return (
       <button
        onClick={props.onClick} 
        className="w-11/12 text-sm bg-black ml-4 mt-10 pt-3 pb-3 rounded text-white">
           LOGIN
       </button>
    );
};

export default LoginButton;