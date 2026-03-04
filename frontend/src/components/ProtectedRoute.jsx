import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";


const ProtectedRoute = ({ user, loading }) => {

    if (!user) return <Navigate to="/" replace />;
    if (loading) return <p>Checking authentication...</p>;
    // if (!user) return <Navigate to="/" />;

    return <Outlet />;
};


export default ProtectedRoute;