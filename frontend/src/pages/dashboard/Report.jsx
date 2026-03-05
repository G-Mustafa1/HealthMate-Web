import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Plus, Trash2, Image } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { deleteReport, getReports,  } from "@/feature/reportSlice";
import UploadModal from "@/components/UploadModal";
import ReportDetailModal from "@/components/ReportDetailModal";

const Report = () => {
  const dispatch = useDispatch();
  const { reports, loading, error } = useSelector((state) => state.report);

  const [showUpload, setShowUpload] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    dispatch(getReports());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">📁 Medical Reports</h1>
          <p className="text-gray-500 text-sm">AI powered report insights</p>
        </div>

        <button
          onClick={() => setShowUpload(true)}
          className="bg-linear-to-r from-blue-500 to-indigo-500 px-5 py-2 rounded-xl text-white flex items-center gap-2 shadow hover:scale-105 transition"
        >
          <Plus className="w-4 h-4" />
          Upload
        </button>
      </div>

      {/* LOADING */}
      {loading && <p className="text-center text-gray-500">Loading reports...</p>}

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-5">
        {reports?.map((r) => (
          <motion.div
            key={r._id}
            whileHover={{ scale: 1.03 }}
            onClick={() => setSelectedReport(r)}
            className="bg-white p-5 rounded-2xl shadow hover:shadow-lg cursor-pointer border transition"
          >
            <div className="flex justify-between mb-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                {r.fileType === "pdf" ? (
                  <FileText className="text-blue-500 w-5 h-5" />
                ) : (
                  <Image className="text-blue-500 w-5 h-5" />
                )}
              </div>

              <Trash2
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(deleteReport(r._id));
                  toast.success("Deleted");
                }}
                className="text-red-400 hover:text-red-600 cursor-pointer"
              />
            </div>

            <h3 className="font-semibold text-sm line-clamp-2">{r.title}</h3>
            <p className="text-xs text-gray-400 mt-1">
              {new Date(r.createdAt).toLocaleDateString()}
            </p>
            <p className="text-xs text-gray-500 mt-2 line-clamp-2">{r.summary}</p>
          </motion.div>
        ))}
      </div>

      {/* EMPTY */}
      {!loading && reports?.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <FileText className="mx-auto mb-3 w-8 h-8" />
          No reports uploaded yet
        </div>
      )}

      {/* MODALS */}
      <UploadModal open={showUpload} onClose={() => setShowUpload(false)} />
      <ReportDetailModal
        open={!!selectedReport}
        report={selectedReport}
        onClose={() => setSelectedReport(null)}
      />
    </div>
  );
};

export default Report;