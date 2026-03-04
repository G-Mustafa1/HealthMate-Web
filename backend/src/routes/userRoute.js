import express from "express";
import { getUser, login, logout, signup } from "../controllers/userController.js";
import { protect } from "../middleware/middleware.js";

const authRouter = express.Router();


authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/user", protect, getUser);


export default authRouter;