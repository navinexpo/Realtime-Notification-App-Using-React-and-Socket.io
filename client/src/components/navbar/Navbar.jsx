import React, { useEffect, useState } from "react";
import "./navbar.css";
import { MdOutlineNotificationAdd } from "react-icons/md";
import { LuMessageSquareDashed } from "react-icons/lu";
import { GrSettingsOption } from "react-icons/gr";

const Navbar = ({ socket }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);

  console.log(notifications);

  return (
    <div className="navbar">
      <span className="logo">Navin's App</span>
      <div className="icons">
        <div className="icon">
          <MdOutlineNotificationAdd />
          <div className="counter">2</div>
        </div>

        <div className="icon">
          <LuMessageSquareDashed />
          <div className="counter">2</div>
        </div>

        <div className="icon">
          <GrSettingsOption />
          <div className="counter">2</div>
        </div>
      </div>
      <div className="notifications">
        {
          notifications.map()
        }
      </div>
    </div>
  );
};

export default Navbar;
