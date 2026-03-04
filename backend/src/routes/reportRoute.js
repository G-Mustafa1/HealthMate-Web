import express from "express";
import { upload } from "../Cloudinary/upload.js";
import { deleteReport, getReport, singleReport, uploadReport } from "../controllers/reportController.js";
import { protect } from "../middleware/middleware.js";
const reportRouter = express.Router();

reportRouter.post("/add-report", protect, upload.single("file"), uploadReport);
reportRouter.get("/all-reports", protect, getReport);
reportRouter.get("/single/:id", protect, singleReport);
reportRouter.delete("/delete/:id", protect, deleteReport);

export default reportRouter;  