import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    FileText,
    Heart,
    CalendarDays,
    LogOut,
    X,
    Stethoscope,
    Menu,
} from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { logout } from "@/feature/authSlice";

const navItems = [
    { path: "/home", label: "Dashboard", icon: LayoutDashboard },
    { path: "/report", label: "Reports", icon: FileText },
    { path: "/vitals", label: "Vitals", icon: Heart },
    // { path: "/timeline", label: "Timeline", icon: CalendarDays },
];

const Sidebar = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => {
        toast.success("Logged out successfully");
        dispatch(logout());
        // navigate("/");
    };

    const renderNavLinks = (isMobile = false) =>
        navItems.map((item) => {
            return (
                <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => isMobile && setMobileOpen(false)}
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-gray-100 ${isActive
                            ? "gradient-bg text-primary-foreground shadow-md text-white"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                        }`
                    }
                >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                </NavLink>
            );
        });

    return (
        <div className="min-h-screen bg-[#f0f7f5] page-gradient flex">
            <aside className="hidden lg:flex flex-col shadow-xl rounded-none bg-white w-64 glass-card-strong border-r border-border/50 p-6 fixed h-full z-30">
                <Link to="/home" className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                        <Stethoscope className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg text-foreground">HealthMate</h1>
                        <p className="text-xs text-muted-foreground">Sehat ka Smart Dost</p>
                    </div>
                </Link>

                <nav className="flex-1 space-y-1">{renderNavLinks()}</nav>

                <div className="border-t border-border/50 pt-4 mt-4">
                    <div className="flex items-center gap-3 px-4 mb-3">
                        <div className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-sm">
                            {user?.fullname?.charAt(0) || "U"}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{user?.fullname || "User"}</p>
                            <p className="text-xs text-muted-foreground truncate">{user?.email || "Email"}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-muted-foreground hover:bg-red-500 hover:text-white hover:bg-opacity-10 transition-all w-full"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-40 rounded-none glass-card-strong border-b border-border/50 px-4 py-3 flex items-center justify-between">
                <Link to="/home" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                        <Stethoscope className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="font-bold text-foreground">HealthMate</span>
                </Link>
                <button onClick={() => setMobileOpen(!mobileOpen)} className="text-foreground p-2">
                    {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0  bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
                            onClick={() => setMobileOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed left-0 top-0 bottom-0 w-72 rounded-none glass-card-strong z-50 p-6 lg:hidden"
                        >
                            <div className="flex justify-between">
                                <div className="gap-3 mb-8 flex items-center justify-center">
                                    <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                                    <Stethoscope className="w-5 h-5 text-white  " />
                                </div>
                                <div>
                                    <h1 className="font-bold text-lg text-foreground">HealthMate</h1>
                                    <p className="text-xs text-muted-foreground">Sehat ka Smart Dost</p>
                                </div>
                                </div>
                                <X className="w-5 h-5 text-foreground" onClick={() => setMobileOpen(false)} />
                            </div>

                            <nav className="space-y-1">{renderNavLinks(true)}</nav>

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-4 py-3 mt-8 rounded-xl text-sm text-muted-foreground hover:bg-red-500 hover:text-white hover:bg-opacity-10 transition-all duration-200 w-full"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
                <div className="p-4 md:p-8 max-w-7xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default Sidebar;