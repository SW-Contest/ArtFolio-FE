import React, { ChangeEvent } from 'react';
import { StringLiteral } from 'typescript';

interface InputBarProps {
  emailValue: string;
  passwordValue: string;
  NAVER_CLINET_ID: string;
  REDIRECT_URI: string;
  STATE: string;
  NAVER_AUTH_URL: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
}

const InputBar = ({
  emailValue,
  passwordValue,
  onEmailChange,
  onPasswordChange
}: InputBarProps) => {
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    onEmailChange(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    onPasswordChange(e.target.value);
  };

  const inputStyle = {
    margin: '0rem 1rem 0rem 1rem'
  };

  return (
    <div>
      <div className="mb-2">
        <span className="text-sm font-semibold text-black relative left-4">이메일 주소</span>
        <input
          type="text"
          value={emailValue}
          onChange={handleEmailChange}
          placeholder=""
          style={inputStyle}
          className="w-11/12 border-b border-gray-300 py-1"
        />
      </div>
      <div>
        <span className="text-sm font-semibold text-black relative left-4">비밀번호</span>
        <input
          type="password"
          value={passwordValue}
          onChange={handlePasswordChange}
          placeholder=""
          style={inputStyle}
          className="w-11/12 border-b border-gray-300 py-1"
        />
      </div>
    </div>
  );
};


export default InputBar