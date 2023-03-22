const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
      unique:true
    },
    last_Update: {
      type: Date,
      default: Date.now // Set the default value for the last_Update field to the current date and time
    },
    resources: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["On track", "On hold", "At risk", "potential risk"],
      default: "On track", // Set the default value for the status field to "active"
    },
    avatar: {
      public_id: String,
      url: String,
    },
    project_timeline:{
        type: Date,
        required:true
    },
    estimation:{
        type:String,
        required:true
    }
  },
  { timestamps: true }
);

const ProjectData = mongoose.model("ProjectData", projectSchema);

module.exports = ProjectData;