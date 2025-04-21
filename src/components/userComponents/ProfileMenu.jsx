import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileImage from "../userComponents/ProfileImage.jsx";
import notification from "../../helpers/notification";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/authSlice.js";

const ProfileMenu = ({ right }) => {
  const [profileMenu, setProfileMenu] = useState(false);
  const { user } = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(setUser(null));
    navigate("/");
    notification("success", "Logged Out Successfully");
  };

  return (
    <div
      className="menu-profile-wrap"
      onMouseLeave={() => setProfileMenu(false)}
    >
      <div className="profile-avatar" onMouseEnter={() => setProfileMenu(true)}>
        <ProfileImage />
      </div>

      <div
        className={`profile-dropdown ${right ? "right-side" : ""} ${
          profileMenu ? "show-profile-dropdown" : ""
        }`}
      >
        <Link to="/user-dashboard" className="dropdown-profile-info">
          <figure className="mb-0">
            <ProfileImage />
          </figure>
          <div className="dropdown-name-email-wrap">
            <h4>{`${user?.firstName} ${user?.lastName}`}</h4>
            <p>
              {user?.email?.length > 18
                ? `${user?.email?.substring(0, 17)}..`
                : user?.email}
            </p>
          </div>
        </Link>
        <ol>
          <li>
            <Link to="/user-dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/my-courses">My Courses</Link>
          </li>
          <li>
            <Link to="/notifications">Notifications</Link>
          </li>
          <li>
            <Link to="/my-purchase">Purchase History</Link>
          </li>
          <li>
            <Link to="/user-profile">Profile</Link>
          </li>
          <li>
            <button
              style={{ cursor: "pointer" }}
              onClick={onLogOut}
              type="button"
            >
              Logout
            </button>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default ProfileMenu;
