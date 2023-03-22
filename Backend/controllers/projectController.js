const ProjectData = require("../model/projectSchema");
const cloudinary = require("cloudinary");

// create project
const createProject = async (req, res) => {
  try {
    const { projectName, resources, project_timeline, estimation } = req.body;
    let { last_Update } = req.body; // get the last_Update field from the request body

    if (!projectName || !resources || !project_timeline || !estimation) {
      return res.status(401).send({ message: "all fields is required" });
    }

    const projectCount = await ProjectData.countDocuments(); // Get the number of existing projects
    const id = projectCount + 1; // Generate the ID by adding 1 to the number of existing projects

    const existingProject = await ProjectData.findOne({ projectName });
    if (existingProject) {
      return res.status(200).send({
        status: false,
        message: "Project already exists",
      });
    }

    const result = await cloudinary.v2.uploader.upload(req.file.path);
    if (!result) {
      return res.status(500).json({
        status: false,
        message: "Error while uploading image",
      });
    }

    // Convert the last_Update field to a Date object
    if (last_Update) {
      last_Update = new Date(last_Update);
    } else {
      // If last_Update is not provided in the request body, set it to the current date and time
      last_Update = new Date();
    }

    const project = await new ProjectData({
      id,
      projectName,
      status: "On track",
      last_Update,
      resources,
      project_timeline,
      estimation,
      avatar: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    }).save();

    const response = {
      id: project.id,
      projectName: project.projectName,
      status: project.status,
      projectImage: project.avatar.url,
      last_Update: project.last_Update.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }),
      resources: project.resources,
      project_timeline: project.project_timeline,
      estimation: project.estimation,
    };

    res.status(201).json({ status: true, data: response });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error while creating project" });
  }
};

// get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await ProjectData.find();
    const response = projects.map((project) => {
      return {
        id: project._id,
        projectName: project.projectName,
        status: project.status,
        projectImage: project.avatar.url,
        last_Update: project.last_Update
          ? project.last_Update.toLocaleString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })
          : null,
        resources: project.resources,
        estimation: project.estimation,
        project_timeline: project.project_timeline
          ? project.project_timeline.toLocaleDateString()
          : null,
      };
    });

    res.status(200).send({
      status: true,
      message: "All projects retrieved successfully",
      response: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      error,
      message: "Error retrieving projects",
    });
  }
};

// toggle-status
const toggleStatus = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await ProjectData.findById(projectId);
    if (!project) {
      return res.status(404).send({
        status: false,
        message: "Project not found",
      });
    }

    let newStatus;
    switch (project.status) {
      case "On track":
        newStatus = "On hold";
        break;
      case "On hold":
        newStatus = "potential risk";
        break;
      case "potential risk":
        newStatus = "At risk";
        break;
      case "At risk":
        newStatus = "On track";
        break;
      default:
        newStatus = "On track";
    }

    project.status = newStatus;
    project.last_Update = new Date(); // Set the last_Update field to the current date and time
    await project.save();

    const response = {
      id: project._id,
      projectName: project.projectName,
      status: project.status,
      projectImage: project.avatar.url,
      last_Update: project.last_Update
        ? project.last_Update.toLocaleString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })
        : null,
      resources: project.resources,
      estimation: project.estimation,
      project_timeline: project.project_timeline
        ? project.project_timeline.toLocaleDateString()
        : null,
    };

    res.status(200).send({
      status: true,
      message: "Project status updated successfully",
      response: [response],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      error,
      message: "Error updating project status",
    });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  toggleStatus,
};
