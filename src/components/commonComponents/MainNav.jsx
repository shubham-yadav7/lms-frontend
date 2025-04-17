import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { AiOutlineBars } from "react-icons/ai";
import { useSelector } from "react-redux";
// import AppContext from '../Context/AppContext';

const MainNav = ({ setShowNav }) => {
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
    <div className="main-nav">
      <div className="container">
        <ul className="main-nav-list">
          <li>
            <NavLink activeclassname="active" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink activeclassname="active" to="/courses">
              All Courses
            </NavLink>
          </li>
          {/* <li>
              <NavLink activeclassname="active" to="/courses/downloadable-courses">Downloadable Courses</NavLink>
          </li> */}
          <li>
            <NavLink activeclassname="active" to="/bundle-courses">
              Bundled Courses
            </NavLink>
          </li>
          <li>
            <NavLink activeclassname="active" to="/products">
              All Products
            </NavLink>
          </li>
          <li>
            <NavLink activeclassname="active" to="/book-courses">
              Books
            </NavLink>
          </li>
          <li>
            <NavLink activeclassname="active" to="/blogs">
              Blogs
            </NavLink>
          </li>
          <li className="more-dropdown-wrap">
            <button>
              More <FaChevronDown />
            </button>
            <div className="more-dropdown">
              <ul>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
                <li>
                  <Link to="/about">About us</Link>
                </li>
                <li>
                  <Link to="/frequently-asked-questions">FAQ</Link>
                </li>
                <li>
                  <Link to="/help">Help</Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>

        <div className="small-search-wrap">
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

export default MainNav;
