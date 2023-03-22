import React from "react";
import { NavLink } from "react-router-dom";

//import scss file
import "./sidebar.scss";

//import mui icons
import FolderIcon from "@mui/icons-material/Folder";
import SettingsIcon from "@mui/icons-material/Settings";

const Sidebar = () => {

  //Navlink Styles
  const Styles = ({isActive}) => {
    return {
      backgroundColor: isActive ? "#cb42f5" : "",
    };
  };

  return (
    <>
      <div className="sidebar">
        <NavLink style={Styles} to="/dashboard">
          <img src={require("../../assets/images/logo-shell.jpg")} alt="logo" />
        </NavLink>
        <NavLink style={Styles} to="/">
          <FolderIcon sx={{ color: "white" }} />
        </NavLink>
        <NavLink style={Styles} to="/settings">
          <SettingsIcon />
        </NavLink>
      </div>
    </>
  );
};

export default Sidebar;
