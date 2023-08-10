import Layout from "../components/common/Layout";
import Logo from "../components/login/Logo";
import SocialButton from "../components/login/SocialButton";

const LoginPage = () => {
  return (
    <Layout className=" justify-center gap-10">
      <Logo />
      <div className="flex flex-col gap-3">
        <SocialButton title="naver" />
        <SocialButton title="kakao" />
        <SocialButton title="google" />
      </div>
    </Layout>
  );
};

export default LoginPage;
