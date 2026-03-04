import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FileText,
  Heart,
  TrendingUp,
  Activity,
  Plus,
  ArrowRight,
  Droplets,
  Weight,
  AlertTriangle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getReports } from "@/feature/reportSlice";
import toast from "react-hot-toast";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { reports, error } = useSelector((state) => state.report);
  const { vitals, } = useSelector((state) => state.vital);

  // Fetch reports on mount
  useEffect(() => {
    dispatch(getReports());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const latestVital = {
    bp: "120/80",
    sugar: 95,
    weight: 70,
    date: new Date(),
    notes: "Feeling good"
  };

  const stats = [
    {
      label: "Total Reports",
      value: reports?.length || 0,
      icon: FileText,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "AI Analyzed",
      value: reports?.filter(r => r.summary)?.length || 0,
      icon: TrendingUp,
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      label: "Vitals Logged",
      value: vitals?.length || 0,
      icon: Heart,
      color: "text-destructive",
      bg: "bg-destructive/10",
    },
    {
      label: "Latest BP",
      value: latestVital?.bp || "—",
      icon: Activity,
      color: "text-info",
      bg: "bg-info/10",
    },
  ];

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-extrabold text-foreground"
          >
            Assalam-o-Alaikum, {user?.fullname || "User"} 👋
          </motion.h1>
          <p className="text-muted-foreground mt-1">Here's your health overview</p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/report"
            className="gradient-bg text-primary-foreground px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 hover:opacity-90 transition-opacity shadow-md text-sm"
          >
            <Plus className="w-4 h-4" />
            Upload Report
          </Link>
          <Link
            to="/vitals"
            className="glass-card text-foreground px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 hover:bg-card/80 transition-all text-sm"
          >
            <Heart className="w-4 h-4" />
            Add Vitals
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-2xl bg-white p-5 hover:shadow-xl transition-shadow"
          >
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Reports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-foreground">Recent Reports</h2>
            <Link to="/report" className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {reports?.slice(0, 3).map((report) => (
              <div
                key={report._id}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/20 transition-colors"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${report.summary ? "bg-success/10" : "bg-warning/10"}`}>
                  <FileText className={`w-5 h-5 ${report.summary ? "text-success" : "text-warning"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm truncate">{report.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(report.dateSeen).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
                {report.summary ? (
                  <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">Analyzed</span>
                ) : (
                  <span className="text-xs font-medium text-warning bg-warning/10 px-2 py-1 rounded-full">Pending</span>
                )}
              </div>
            ))}
            {!reports?.length && <p className="text-sm text-muted-foreground">No reports uploaded yet</p>}
          </div>
        </motion.div>

        {/* Latest Vitals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-foreground">Latest Vitals</h2>
            <Link to="/vitals" className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {latestVital ? (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-muted/40 rounded-xl p-4 text-center">
                  <Activity className="w-5 h-5 text-info mx-auto mb-1" />
                  <p className="text-lg font-bold text-foreground">{latestVital.bp}</p>
                  <p className="text-xs text-muted-foreground">Blood Pressure</p>
                </div>
                <div className="bg-muted/40 rounded-xl p-4 text-center">
                  <Droplets className="w-5 h-5 text-destructive mx-auto mb-1" />
                  <p className="text-lg font-bold text-foreground">{latestVital.sugar}</p>
                  <p className="text-xs text-muted-foreground">Sugar (mg/dL)</p>
                </div>
                <div className="bg-muted/40 rounded-xl p-4 text-center">
                  <Weight className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-lg font-bold text-foreground">{latestVital.weight}</p>
                  <p className="text-xs text-muted-foreground">Weight (kg)</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Recorded on {new Date(latestVital.date).toLocaleDateString("en-PK", { day: "numeric", month: "long", year: "numeric" })}
              </p>
              {latestVital.notes && (
                <p className="text-sm text-foreground/80 italic">"{latestVital.notes}"</p>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No vitals recorded yet</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;