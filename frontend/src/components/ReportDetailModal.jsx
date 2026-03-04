import { AnimatePresence, motion } from "framer-motion";
import { X, FileText, Trash2, Download, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteReport } from "../feature/reportSlice";
import { toast } from "react-hot-toast";

const ReportDetailModal = ({ open, onClose, report }) => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("en");
  const [loading, setLoading] = useState(false);

  if (!report) return null;

  const handleDelete = async () => {
    try {
      setLoading(true);
      await dispatch(deleteReport(report._id)).unwrap();
      toast.success("Report deleted ✅");
      onClose();
    } catch (err) {
      toast.error(err || "Delete failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const isImage = report.fileUrl && report.fileUrl.match(/\.(jpeg|jpg|png|gif)$/i);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white w-[95%] max-w-3xl p-6 rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-5">
              <div className="flex-1">
                <h2 className="font-bold text-lg truncate">{report.title}</h2>
                <p className="text-xs text-gray-500 mt-1">{report.dateSeen}</p>
              </div>
              <button onClick={onClose}>
                <X className="w-5 h-5 text-gray-500 hover:text-red-500" />
              </button>
            </div>

            {/* File Preview */}
            <div className="bg-gray-100 p-4 rounded-xl flex flex-col items-center mb-5">
              {isImage ? (
                <img
                  src={report.fileUrl}
                  alt={report.filename}
                  className="max-h-80 w-auto rounded-lg mb-2"
                />
              ) : (
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-5 h-5 text-gray-600" />
                  <span className="text-sm truncate max-w-50">{report.filename}</span>
                </div>
              )}

              <a
                href={report.fileUrl}
                download
                target="_blank"
                className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1.5 rounded-lg text-xs hover:bg-blue-600 transition"
              >
                <Download className="w-4 h-4" /> Download
              </a>
            </div>

            {/* Summary */}
            <div className="mb-4">
              <h3 className="font-semibold mb-1">🧠 AI Summary</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {report.summary || "No summary available"}
              </p>
            </div>

            {/* Explanation Tabs */}
            <div className="flex gap-2 mb-3">
              {["en", "ro"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    tab === t ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {t === "en" ? "English" : "Roman Urdu"}
                </button>
              ))}
            </div>
            <div className="mb-5">
              <h3 className="font-semibold mb-1">📖 Explanation</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {tab === "en" ? report.explanation_en || "No explanation" : report.explanation_ro || "Koi explanation nahi"}
              </p>
            </div>

            {/* Suggested Questions */}
            <div className="mb-5">
              <h3 className="font-semibold mb-2">💡 Suggested Questions</h3>
              <div className="flex flex-wrap gap-2">
                {report.suggested_questions?.length ? (
                  report.suggested_questions.map((q, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-full text-xs cursor-pointer"
                    >
                      {q}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No questions available</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center border-t pt-4">
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm"
              >
                <Trash2 className="w-4 h-4" />
                {loading ? "Deleting..." : "Delete Report"}
              </button>

              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 rounded-lg text-sm hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ReportDetailModal;