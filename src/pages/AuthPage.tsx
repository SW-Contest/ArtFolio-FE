import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { oauthLogin } from "../api/auth.api";
import { useUserStore, useAnimationStore } from "../store/store";

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const provider = useParams().provider;
  const { setUserId } = useUserStore();
  const { showAnimation, hideAnimation } = useAnimationStore();

  const oauthLoginHandler = async ({ code, provider, state }: any) => {
    const response = await oauthLogin({ code, provider, state });
    return response!.headers;
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    const login = async () => {
      try {
        showAnimation("loading");
        const response = await oauthLoginHandler({ code, provider, state });

        setUserId(Number(response["userid"]));

        sessionStorage.setItem("userId", response["userid"]);
        sessionStorage.setItem("accessToken", response["authorization"]);
        sessionStorage.setItem(
          "refreshToken",
          response["authorization-refresh"]
        );

        hideAnimation();
        navigate("/");
      } catch (error) {
        console.log("로그인 중 에러가 발생했습니다.");
        hideAnimation();
        navigate("/login");
      }
    };

    if (code) {
      login();
    }
  }, [provider]);

  return <div></div>;
};

export default AuthPage;
