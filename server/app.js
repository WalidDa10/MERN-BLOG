import dotenv from "dotenv"
import express, { json } from "express";
import ConnectToDB from "./config/DB.js"

import authRoutes from "./Routers/authRoute.js"
import usersRoutes from "./Routers/usersRoute.js"
import postsRoutes from "./Routers/postsRoute.js"
import commentRoutes from "./Routers/commentRoute.js"
import categoryRoutes from "./Routers/caregoryRoute.js"

dotenv.config();


//init App
const app = express();


//Connetion to DB
ConnectToDB()

//Middlawers
app.use(express.json())


// Routes
app.use("/api/auth",authRoutes)
app.use("/api/users",usersRoutes)
app.use("/api",postsRoutes)
app.use("/api/category",categoryRoutes)

app.use("/api",commentRoutes)

const Port = process.env.PORT || 2020

app.listen(Port ,()=>{
    console.log(`Server is running on PORT: ${Port}`);
} )






