import dotenv from "dotenv";
dotenv.config();
import express from "express"
const app = express()
import cookiesParser from "cookie-parser"
import cors from "cors"
import connectDB from "./config/db.js"
import authRouter from "./routes/userRoute.js"
import reportRouter from "./routes/reportRoute.js"
import vitalRouter from "./routes/vitialRoute.js";


app.use(cors({
  origin: [process.env.BASE_URL,],
  credentials: true,  
})  
);
app.use(express.json())
app.use(cookiesParser())

connectDB()

  
app.use('/auth', authRouter);
app.use('/report', reportRouter);
app.use('/vitals', vitalRouter);

  
app.get('/', (req, res) => {
  res.send('Backend is running 🚀')
})

app.get('/about', (req, res) => {
  res.send('About route 🎉')
})


export default app