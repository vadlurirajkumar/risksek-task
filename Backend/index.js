const express = require("express")
require("dotenv").config();
const cors = require("cors")
const cloudinary = require("cloudinary")
const port = process.env.PORT
const app = express()

// Db connection 
require("./config/dbFile")

// config cloudinary 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

// importing router files
const projectRouter = require("./routes/projectRoute")

// middleware
app.use(express.json())
app.use(cors());

// admin& user routes
app.use("/api", projectRouter) //  routes calling

// Port 
app.listen(port, ()=>{
    console.log(`port running at ${port}`)
})