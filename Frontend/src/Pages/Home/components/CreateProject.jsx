import React, { useState, useEffect } from "react";

//import scss file
import "./createproject.scss";

//import third party dependecesis
import axios from "axios";
import { Modal } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddProject from "./AddProject/AddProject";

const ProjectsList = () => {
  const [pData, setPData] = useState([]);
  const [projectLength, setProjectLength] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [search, setsearch] = useState("");

  // table pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerpage = 5;
  const lastIndex = currentPage * recordsPerpage;
  const firstIndex = lastIndex - recordsPerpage;
  const records = pData.slice(firstIndex, lastIndex);
  const npage = Math.ceil(pData.length / recordsPerpage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  // get projects
  const getProjects = async () => {
    try {
      const response = await axios.get(
        "https://risksek-task-backend.cyclic.app/api/get-all-projects"
      );
      const offData = response.data;
      const fullData = offData.response;
      setPData(fullData);
      setProjectLength(fullData.length);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModel = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // toggleStatus
  const toggleStatus = async (id) => {
    try {
      const response = await axios.patch(
        `https://risksek-task-backend.cyclic.app/api/toggleStatus/${id}`
      );
      const updatedProject = response.data.response[0];
      setPData((prevState) => {
        const updatedData = prevState.map((project) => {
          if (project.id === updatedProject.id) {
            return updatedProject;
          }
          return project;
        });
        return updatedData;
      });
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Unable to toggle status. Please try again later.");
      }
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  // table functions
  const data = {
    fontWeight: "bold",
    backgroundColor: "rgba(192,192,192)",
  };
  const image = {
    borderLeft: "3px solid rgba(0,0,0,.3)",
    fontWeight: "bold",
    backgroundColor: "rgba(192,192,192)",
  };
  const style = {
    boxShadow: "0px 3px 2px rgba(0,0,0,.3)",
  };

  // pagination functions
  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const ChangeCPage = (id) => {
    setCurrentPage(id);
  };

  return (
    <div>
      <div className="searchbar">
        <h3 style={{ padding: "15px 0 0 15px" }}>
          Total Projects: {projectLength}
        </h3>
        <div className="search">
          <span>
            Search:
            <input
              className="input"
              type="search"
              placeholder="search by name"
              value={search}
              onChange={(e) => setsearch(e.target.value)}
            />
          </span>
        </div>
        <button className="Add-button" onClick={handleModel}>
          Add
        </button>
      </div>
      <TableContainer className="category-table">
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticy table">
          <TableHead>
            <TableRow style={{ backgroundColor: "rgba(192,192,192)" }}>
              <TableCell align="center" style={data}>
                Name
              </TableCell>
              <TableCell align="center" style={image}>
                Image
              </TableCell>
              <TableCell align="center" style={data}>
                Status
              </TableCell>
              <TableCell align="center" style={data}>
                Last_Update
              </TableCell>
              <TableCell align="center" style={data}>
                Resources
              </TableCell>
              <TableCell align="center" style={data}>
                Project_TimeLine
              </TableCell>
              <TableCell align="center" style={data}>
                Estimation
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records
              .filter((item) => {
                if (search === "") {
                  return item;
                } else if (
                  item.projectName.toLowerCase().includes(search.toLowerCase())
                ) {
                  return item;
                }
              })

              .map((project, index) => (
                <TableRow key={index} className="project-tableRow">
                  <TableCell
                    style={style}
                    align="center"
                    className="project-tableData"
                  >
                    {project.projectName}
                  </TableCell>
                  <TableCell
                    style={style}
                    align="center"
                    className="project-tableData"
                  >
                    <img
                      src={project.projectImage}
                      alt={project.projectName}
                      width="30"
                      height="30"
                    />
                  </TableCell>

                  <TableCell
                    style={style}
                    align="center"
                    className="project-tableData"
                  >
                    <button
                      onClick={() => toggleStatus(project.id)}
                      className={
                        project.status === "On track"
                          ? "track-button"
                          : project.status === "On hold"
                          ? "hold-button"
                          : project.status === "potential risk"
                          ? "potential-button"
                          : project.status === "At risk"
                          ? "risk-button"
                          : "track-button"
                      }
                    >
                      {project.status === "On track"
                        ? "On track"
                        : project.status === "On hold"
                        ? "On hold"
                        : project.status === "potential risk"
                        ? "potential risk"
                        : project.status === "At risk"
                        ? "At risk"
                        : "On track"}
                    </button>
                  </TableCell>
                  <TableCell
                    style={style}
                    align="center"
                    className="project-tableData"
                  >
                    {project.last_Update}
                  </TableCell>
                  <TableCell
                    style={style}
                    align="center"
                    className="project-tableData"
                  >
                    {project.resources}
                  </TableCell>
                  <TableCell
                    style={style}
                    align="center"
                    className="project-tableData"
                  >
                    {project.project_timeline + "   >   "}
                    {project.project_timeline}
                  </TableCell>
                  <TableCell
                    style={style}
                    align="center"
                    className="project-tableData"
                  >
                    {project.estimation}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

 {/* calling modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <div>
          <AddProject
            handleCloseModal={handleCloseModal}
            getProjects={getProjects}
          />
        </div>
      </Modal>

      {/* pagination controlls*/}
      <div>
        <span className="pagination">
          <span className="page-item">
            <button
              className="page-link"
              onClick={prePage}
              disabled={currentPage === 1}
            >
              Prev
            </button>
          </span>
          {numbers.map((n, i) => (
            <span
              className={`page-item ${currentPage === n ? "Active" : ""}`}
              key={i}
            >
              <a
                href="#"
                style={{ display: "flex" }}
                className="page-link"
                onClick={() => ChangeCPage(n)}
              >
                {n}
              </a>
            </span>
          ))}

          <span className="page-item">
            <button
              className="page-link"
              onClick={nextPage}
              disabled={currentPage === npage}
            >
              Next
            </button>
          </span>
        </span>
      </div>
    </div>
  );
};

export default ProjectsList;
