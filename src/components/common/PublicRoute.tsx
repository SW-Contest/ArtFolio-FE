import { Navigate, useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/store";

interface PublicRouteProps {
  element: JSX.Element;
}

const PublicRoute = (props: PublicRouteProps) => {
  const { userId } = useUserStore();
  if (userId) {
    return <Navigate to="/" />;
  }
  return props.element;
};

export default PublicRoute;
