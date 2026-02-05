import { useSelector } from "react-redux";
import Loader from "../components/loader/Loader";
import { Outlet } from "react-router-dom";
const AuthProtectedRoutes = () => {
  const { user, token, isAuthReady } = useSelector((s) => s.auth);

  if (!isAuthReady) {
    return <Loader/>
  }

  if (!user || !token) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

export default AuthProtectedRoutes;