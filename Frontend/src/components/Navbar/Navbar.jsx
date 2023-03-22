import React from "react";

// import scss file
import "./navbar.scss";

//importing mui icons
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const Navbar = ({ type }) => {
  let head;
  switch (type) {
    case "dashboard":
      head = {
        name: "Dashboard",
      };
      break;
    case "projects":
      head = {
        name: "Projects",
      };
      break;
    case "settings":
      head = {
        name: "Settings",
      };
      break;

    default:
      break;
  }
  return (
    <>
      <div className="navbar">
        <div className="left-nav">
          <h2>{head.name}</h2>
        </div>
        <div className="right-nav">
          <div className="right-nav-icons">
            <NotificationsIcon/>
            <HelpOutlineIcon/>
            <AccountCircleIcon/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
