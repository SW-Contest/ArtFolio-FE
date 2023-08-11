import { Navigate } from "react-router-dom";
import { useUserStore } from "../../store/store";

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { userId, setUserId } = useUserStore();

  // 로그인이 되어있는지 확인합니다.
  if (!userId) {
    // 이떄 로그인이 되어 있지 않지만 , 스토리지에 로그인 정보가 남아있는 경우
    // 스토리지에 있는 정보를 스토어에 저장합니다.
    if (sessionStorage.getItem("userId")) {
      setUserId(Number(sessionStorage.getItem("userId")));
    }
    // 스토리지에도 로그인 정보가 없는 경우 로그인 페이지로 이동합니다.
    else {
      return <Navigate to="/login" />;
    }
  }
  return props.element;
};

export default PrivateRoute;
