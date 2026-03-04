import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addReport } from "../feature/reportSlice";
import { Upload, X, FileText } from "lucide-react";
import toast from "react-hot-toast";

const UploadModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [drag, setDrag] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "application/pdf"];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only image files (jpeg, jpg, png, webp, pdf) are allowed!");
      setFile(null);
      return;
    }

    setFile(file);
  }

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title.trim()) return toast.error("Enter report title");
    if (!file) return toast.error("Select file");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      setLoading(true);
      await dispatch(addReport(formData)).unwrap();
      toast.success("Uploaded successfully ✅");
      setFile(null);
      setTitle("");
      onClose();
    } catch (err) {
      toast.error(err || "Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white w-105 p-6 rounded-2xl shadow-xl"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-semibold">Upload Report</h2>
              <button onClick={onClose}>
                <X className="w-5 h-5 text-gray-500 hover:text-red-500" />
              </button>
            </div>

            <form onSubmit={handleUpload} className="space-y-4">
              {/* Title Input */}
              <div>
                <label className="text-sm text-gray-600">Report Title</label>
                <input
                  type="text"
                  placeholder="Enter report title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Drag & Drop */}
              <label
                className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 cursor-pointer transition ${drag ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:bg-gray-50"
                  }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDrag(true);
                }}
                onDragLeave={() => setDrag(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setFile(e.dataTransfer.files[0]);
                  setDrag(false);
                }}
              >
                <Upload className="w-8 h-8 text-blue-500 mb-2" />
                <p className="text-sm text-gray-600 text-center">
                  {file ? "File selected below" : "Drag & drop or click to upload"}
                </p>
                <input
                  type="file"
                  accept=".pdf,.jpg,.png"
                  className="hidden"
                  onChange={handleImageChange}
                // onChange={(e) => setFile(e.target.files[0])}
                />
              </label>

              {/* File Preview */}
              {file && (
                <div className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-gray-600" />
                    <span className="text-sm truncate max-w-50">{file.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Upload Button */}
              <button
                disabled={loading}
                className={`w-full py-2 rounded-xl text-white font-medium transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                  }`}
              >
                {loading ? "Uploading..." : "Upload Report"}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default UploadModal;