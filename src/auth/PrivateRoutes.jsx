import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const token = useSelector((store) => store.user.token);
  if (token !== "") {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};
export default PrivateRoutes;
