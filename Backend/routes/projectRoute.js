const express = require("express");
const projectRoute = express.Router();
const {createProject, getAllProjects, toggleStatus} = require("../controllers/projectController")
const uploadImage = require("../utils/multer");

//routes

// create project
projectRoute.post( "/create-project", uploadImage.single("avatar"), createProject);

// get projects
projectRoute.get("/get-all-projects", getAllProjects)

//toggleStatus
projectRoute.patch("/toggleStatus/:id", toggleStatus);


module.exports = projectRoute