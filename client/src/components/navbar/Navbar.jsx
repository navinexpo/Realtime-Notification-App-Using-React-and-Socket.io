import React, { useEffect, useState } from "react";
import "./navbar.css";
import { MdOutlineNotificationAdd } from "react-icons/md";
import { LuMessageSquareDashed } from "react-icons/lu";
import { GrSettingsOption } from "react-icons/gr";

const Navbar = ({ socket }) => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);

  console.log(notifications);

  const handleRead = () => {  
    setNotifications([])
    setOpen(false)
  }

  const displayNotification = ({ senderName, type }) => {
    let action;

    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "commented";
    } else {
      action = "shared";
    }
    return (
      <span className="notification">{`${senderName} ${action} your post`}</span>
    );
  };

  return (
    <div className="navbar">
      <span className="logo">Navin's App</span>
      <div className="icons">
        <div className="icon" onClick={() => setOpen(!open)}>
          <MdOutlineNotificationAdd />
          {/* <div className="counter">2</div> */}
          {
            notifications.length > 0 &&
          <div className="counter">{notifications.length}</div>
          }
        </div>

        <div className="icon" onClick={() => setOpen(!open)}>
          <LuMessageSquareDashed />
          {/* <div className="counter">2</div> */}
          <div className="counter">{notifications.length}</div>
        </div>

        <div className="icon" onClick={() => setOpen(!open)}>
          <GrSettingsOption />
          {/* <div className="counter">2</div> */}
          <div className="counter">{notifications.length}</div>
        </div>
      </div>
      {open && (
        <div className="notifications">
          {notifications.map((n) => displayNotification(n))}
          <button className="nbutton" onClick={handleRead}>Mark as Red</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
