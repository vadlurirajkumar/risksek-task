import React from "react";

// import scss file
import "./home.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import ProjectsList from "./components/CreateProject";
const Home = () => {
  return (
    <>
      <div className="project-alignments">
        <div className="left-alignment">
          <Sidebar />
        </div>
        <div className="right-alignment">
          <div className="nav">
            <Navbar type="projects" />
          </div>
          <div>
            {/* <h1>Projects Data</h1> */}
            <ProjectsList/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
