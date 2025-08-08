import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from "./Route/Auth.route.js";
import portfolioRoutes from "./Route/Portfolio.Route.js"

const app = express()
app.use(express.json({ limit: '16kb' }))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true, limit: "2mb" }))
app.use(express.static("public"))
app.use('/api/v1/portfolio',portfolioRoutes)

app.use(
  cors({
    // origin:process.env.ORIGIN    ,
    origin: "https://selfolio-client.onrender.com",
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE"], 

  })
);

app.use('/api/v1/users',authRoutes)

export default app
