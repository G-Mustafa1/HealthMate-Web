import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "./Loader";

const ProtectedRoute = () => {
    const { user, loading } = useSelector((state) => state.auth);
    if (loading) return <Loader />;
    if (!user) return <Navigate to="/" replace />;


    return <Outlet />;
};

export default ProtectedRoute;