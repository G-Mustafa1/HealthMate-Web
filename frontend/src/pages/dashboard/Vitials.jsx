import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Plus, Trash2, X, Activity, Droplets, Weight } from "lucide-react";
import { getVitals, addVital, deleteVital } from "@/feature/vitalsSlice";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const Vitals = () => {
  const dispatch = useDispatch();
  const { vitals, loading, error } = useSelector((state) => state.vital);

  const [showAdd, setShowAdd] = useState(false);
  const [bp, setBp] = useState("");
  const [sugar, setSugar] = useState("");
  const [weight, setWeight] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    dispatch(getVitals());
  }, [dispatch]);

  // Show toast on error
  useEffect(() => {
    if (error) toast.error(error.message || "Something went wrong");
  }, [error]);

  const handleSave = async () => {
    if (!bp && !sugar && !weight) {
      toast.error("Please enter at least one vital");
      return;
    }

    try {
      await dispatch(addVital({ bp, sugar, weight, note })).unwrap();
      toast.success("Vitals saved");
      setShowAdd(false);
      setBp(""); setSugar(""); setWeight(""); setNote("");
    } catch (err) {
      toast.error(err.message || "Failed to save vital");
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteVital(id)).unwrap();
      toast.success("Vital deleted");
    } catch (err) {
      toast.error(err.message || "Failed to delete vital");
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground">Vitals Tracker</h1>
          <p className="text-muted-foreground mt-1">Track your blood pressure, sugar, and weight</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="gradient-bg text-primary-foreground px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 hover:opacity-90 transition-opacity shadow-md text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Vitals
        </button>
      </div>

      {/* Vitals Cards */}
      <div className="space-y-3 relative z-10">
        {loading ? (
          <p>Loading...</p>
        ) : vitals.length ? (
          vitals.map((vital, i) => (
            <motion.div
              key={vital._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-2xl p-5 hover:shadow-lg transition-shadow group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <p className="text-sm font-medium text-muted-foreground min-w-25">{new Date(vital.date).toLocaleDateString()}</p>
                <div className="flex flex-wrap gap-3 flex-1">
                  <div className="flex items-center gap-2 bg-info/10 px-3 py-1.5 rounded-lg">
                    <Activity className="w-3.5 h-3.5 text-info" /> BP: <span className="font-semibold text-foreground">{vital.bp}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-destructive/10 px-3 py-1.5 rounded-lg">
                    <Droplets className="w-3.5 h-3.5 text-destructive" /> Sugar: <span className="font-semibold text-foreground">{vital.sugar} mg/dL</span>
                  </div>
                  <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-lg">
                    <Weight className="w-3.5 h-3.5 text-primary" /> Weight: <span className="font-semibold text-foreground">{vital.weight} kg</span>
                  </div>
                </div>
                {vital.note && <p className="text-sm text-muted-foreground italic flex-1 truncate">"{vital.note}"</p>}
                <button
                  onClick={() => handleDelete(vital._id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive p-1 shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p>No vitals recorded yet</p>
        )}
      </div>

      <AnimatePresence>
        {showAdd && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
              onClick={() => setShowAdd(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="glass-card-strong rounded-3xl p-6 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-bold text-foreground">Add Vitals</h2>
                  <button onClick={() => setShowAdd(false)} className="text-muted-foreground hover:text-foreground p-1">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Blood Pressure</label>
                    <input value={bp} onChange={(e) => setBp(e.target.value)} placeholder="e.g., 120/80" className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-gray-300 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Sugar (mg/dL)</label>
                    <input value={sugar} onChange={(e) => setSugar(e.target.value)} placeholder="e.g., 95" className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-gray-300 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Weight (kg)</label>
                    <input value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g., 72" className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-gray-300 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Notes (optional)</label>
                    <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="How are you feeling today?" rows={2} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-gray-300 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"/>
                  </div>
                  <button onClick={handleSave} className="w-full gradient-bg text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                    Save Vitals
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Vitals;