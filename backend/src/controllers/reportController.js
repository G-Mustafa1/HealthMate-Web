import analyzeFileBase64 from "../gemini/gemini.js";
import Report from "../models/ReportSchema.js";

export const uploadReport = async (req, res) => {
    try {
        const userId = req.user._id;
        if (!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'File is required' });
        }

        // ✅ Cloudinary Info
        const fileUrl = req.file.path;
        const publicId = req.file.filename;
        const mimeType = req.file.mimetype;

        // ✅ Download file from Cloudinary using fetch()
        const fileResponse = await fetch(fileUrl);
        const arrayBuffer = await fileResponse.arrayBuffer();
        const base64File = Buffer.from(arrayBuffer).toString("base64");

        // ✅ AI Insights
        const ai = await analyzeFileBase64(base64File, mimeType);

        const report = await Report.create({
            user: userId,
            filename: req.file.originalname,
            fileUrl,
            public_id: publicId,
            title: ai?.parsed?.title || 'Untitled Report',
            dateSeen: ai?.parsed?.date || new Date().toISOString().split("T")[0],
            summary: ai?.parsed?.summary || '',
            explanation_en: ai?.parsed?.explanation_en || '',
            explanation_ro: ai?.parsed?.explanation_ro || '',
            suggested_questions: ai?.parsed?.suggested_questions || [],
        });

        return res.status(200).json({
            success: true,
            message: 'Report uploaded successfully ✅',
            report
        });

    } catch (err) {
        console.error("Upload Error:", err);
        return res.status(500).json({
            success: false,
            message: 'Server error while uploading report',
            error: err.message
        });
    }
};

export const getReport = async (req, res) => {
    try {
        const userId = req.user._id;

        const reports = await Report.find({ user: userId })
            .sort({ createdAt: -1 }); // latest first

        return res.status(200).json({
            success: true,
            count: reports.length,
            reports
        });
    } catch (err) {
        console.error("Get Reports Error:", err);
        return res.status(500).json({
            success: false,
            message: "Server error while fetching reports",
            error: err.message
        });
    }
};

// ✅ Get single report by ID
export const singleReport = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const report = await Report.findOne({ _id: id, user: userId });
        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found"
            });
        }

        return res.status(200).json({
            success: true,
            report
        });
    } catch (err) {
        console.error("Single Report Error:", err);
        return res.status(500).json({
            success: false,
            message: "Server error while fetching report",
            error: err.message
        });
    }
};

// ✅ Delete report by ID
export const deleteReport = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const report = await Report.findOne({ _id: id, user: userId });
        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found"
            });
        }

        if (report.public_id) {
            await cloudinary.uploader.destroy(report.public_id);
        }

        await Report.deleteOne({ _id: id });

        return res.status(200).json({
            success: true,
            message: "Report deleted successfully ✅",
            report
        });
    } catch (err) {
        console.error("Delete Report Error:", err);
        return res.status(500).json({
            success: false,
            message: "Server error while deleting report",
            error: err.message
        });
    }
};