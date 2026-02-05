import { useSelector } from 'react-redux'
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const { user, accessToken } = useSelector(state => state.auth);

    if (!user || !accessToken) {
        return <Navigate to="/auth" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;

