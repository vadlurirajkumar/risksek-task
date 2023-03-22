import React, { useState } from "react";
import axios from "axios";

// import css file
import "./addproject.scss";

const AddProject = ({ handleCloseModal, getProjects }) => {
  const [loading, setLoading] = useState(false);
  const [addData, setAddData] = useState({
    projectName: "",
    last_Update: "",
    project_timeline: "",
    resources: "",
    estimation: "",
    avatar: null,
  });

  const handleInputChange = (e) => {
    setAddData({ ...addData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    setAddData({ ...addData, avatar: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("projectName", addData.projectName);
    formData.append("last_Update", addData.last_Update);
    formData.append("project_timeline", addData.project_timeline);
    formData.append("resources", addData.resources);
    formData.append("estimation", addData.estimation);
    formData.append("avatar", addData.avatar);

    try {
      const response = await axios.post(
        "https://risksek-task-backend.cyclic.app/api/create-project",
        formData
      );
      setAddData({
        projectName: "",
        last_Update: "",
        project_timeline: "",
        resources: "",
        estimation: "",
        avatar: null,
      });
      getProjects();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      handleCloseModal();
    }
  };

  const handleClose = () => {
    handleCloseModal();
  };

  return (
    <div>
      <div className="project-model">
        <div className="project-edit-form">
          <h1>Add Project</h1>
          <div className="edit-style">
            <div className="edit-form-style">
              <div className="left-edit">
                <label htmlFor="project-name">Project Name:</label>
                <label htmlFor="project-image">Project Image:</label>
                <label htmlFor="project-last_update">Last_Update:</label>
                <label htmlFor="project-resources">Resources:</label>
                <label htmlFor="project-project_timeline">
                  Project_TimeLine:
                </label>
                <label htmlFor="project-estimation">Estimation:</label>
              </div>
              <div className="right-edit">
                <input
                  type="text"
                  name="projectName"
                  value={addData.projectName}
                  onChange={handleInputChange}
                />
                <input
                  type="file"
                  name="avatar"
                  onChange={handleAvatarChange}
                />

                <input
                  type="date"
                  name="last_Update"
                  value={addData.last_Update}
                  onChange={handleInputChange}
                  readOnly="true"
                />
                <input
                  type="text"
                  name="resources"
                  value={addData.resources}
                  onChange={handleInputChange}
                />
                <input
                  type="date"
                  name="project_timeline"
                  value={addData.project_timeline}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="estimation"
                  value={addData.estimation}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="edit-buttons">
              <button
                className="update-button"
                type="submit"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Loading..." : "Add"}
              </button>
              <button className="close-button" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProject;
