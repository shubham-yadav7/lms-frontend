import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { AiOutlineBars } from "react-icons/ai";
import { MdOutlineDashboard } from "react-icons/md";
import { FiBookOpen, FiHome } from "react-icons/fi";
import { BiPurchaseTag } from "react-icons/bi";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";

const UserNav = ({ setShowNav, onLogout }) => {
  const { courseCategories } = useSelector((state) => state.course);
  const toggleDropdown = () => {
    document
      .querySelector("#main-nav-dropdown")
      .classList.toggle("showDropdown");
  };
  const showSearchBar = () => {
    document.querySelector(".search-bar").classList.add("showSearchBar");
  };

  return (
    <div className="main-nav right-overlay">
      <div className="container">
        <div className="overflow-wrapper">
          <ul className="main-nav-list user-nav-list">
            <li>
              <NavLink activeclassname="active" to="/">
                <FiHome /> Home
              </NavLink>
            </li>
            <li>
              <NavLink activeclassname="active" to="/user-dashboard">
                <MdOutlineDashboard /> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink activeclassname="active" to="/my-courses">
                <FiBookOpen />
                My Courses
              </NavLink>
            </li>
            {/* <li>
                  <NavLink activeclassname="active" to="/enrolled-courses"><FiBookOpen />Enrolled Courses</NavLink>
              </li> */}
            <li>
              <NavLink activeclassname="active" to="/my-purchase">
                <BiPurchaseTag />
                My Purchase
              </NavLink>
            </li>
            <li>
              <NavLink activeclassname="active" to="/notifications">
                <IoNotificationsOutline /> Notification
              </NavLink>
            </li>
            <li>
              <NavLink activeclassname="active" to="/user-profile">
                <CgProfile />
                Profile
              </NavLink>
            </li>
            <li>
              <button onClick={onLogout}>
                <IoMdLogOut />
                Logout
              </button>
            </li>
          </ul>
        </div>

        <div className="small-search-wrap d-none">
          <div className="nav-search main-nav-search">
            <div className="dropdown" onClick={toggleDropdown}>
              <button id="dropBtn">
                <img src="/assets/images/homepage/category_menu.png" alt="" />
                <span> Categories </span>
                <FaChevronDown />
              </button>
              <div className="dropdown-list" id="main-nav-dropdown">
                <ul>
                  {courseCategories?.map((c, i) => (
                    <li key={i}>
                      <Link to={`/courses/category/${c.slug}`}>{c.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <form className="search-form">
              <input
                className="form-control"
                type="search"
                placeholder="What do you want to learn?"
              />
              <button className="btn btn-outline-success" type="submit">
                <img src="/assets/images/homepage/search_icon.png" alt="" />
              </button>
            </form>
          </div>

          <div className="main-menu-toggle-wrap">
            <button className="main-menu-search" onClick={showSearchBar}>
              <img src="/assets/images/homepage/search_icon.png" alt="" />
            </button>
            <button
              className="main-menu-toggle"
              onClick={() => setShowNav(true)}
            >
              <AiOutlineBars />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNav;
