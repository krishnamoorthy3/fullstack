import { useSelector } from 'react-redux'
import { Navigate, Outlet } from "react-router-dom";
import Loader from '../components/loader/Loader';
const PublicRoute = () => {
    const { user, token, isAuthReady } = useSelector(state => state.auth);

    if (!isAuthReady) return <Loader />;

    if (user && token) {
    return <Navigate to="/profile" replace />;
    }

    return <Outlet />;

};

export default PublicRoute;
