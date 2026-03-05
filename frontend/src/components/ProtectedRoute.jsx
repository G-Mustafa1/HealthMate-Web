import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { user, loading } = useSelector((state) => state.auth);
    if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;

    if (!user) return <Navigate to="/" replace/>;

    
    return <Outlet />;
};

export default ProtectedRoute;