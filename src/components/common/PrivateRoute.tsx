import { Navigate, useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/store";

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { userId } = useUserStore();
  if (!userId) {
    return <Navigate to="/login" />;
  }
  return props.element;
};

export default PrivateRoute;
