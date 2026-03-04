import express from "express";
import { protect } from "../middleware/middleware.js";
import { addVitals, deleteVitals, getVitals } from "../controllers/vitialControllers.js";
const vitalRouter = express.Router();

vitalRouter.post("/add-vitial", protect, addVitals);
vitalRouter.get("/all-vitals", protect, getVitals);
vitalRouter.delete("/delete/:id", protect, deleteVitals);

export default vitalRouter;     