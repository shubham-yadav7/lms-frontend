import React, { Suspense, lazy, useEffect, useState } from "react";
// import { setSignInShow } from "../../store/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import notification from "../../helpers/notification.js";
import PrimaryService from "../../auth/services/PrimaryServices.js";
import Cookies from "universal-cookie";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import { BsChevronUp } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { GrLanguage } from "react-icons/gr";
import debounce from "lodash.debounce";
import { fetchCoursesCategories } from "../../store/courseSlice.js";
import {
  fetchUser,
  setSignInShow,
  setSignUpShow,
  setUser,
} from "../../store/authSlice.js";
import ProfileCircle from "../placeholderComponents/ProfileCircle.jsx";
import { fetchCart } from "../../store/inventorySlice.js";

const SignUpModal = lazy(() => import("../commonComponents/SignUpModal"));
const SignInModal = lazy(() => import("../commonComponents/SignInModal"));
const ForgotPasswordModal = lazy(() =>
  import("../commonComponents/ForgotPasswordModal.jsx")
);
const Announcement = lazy(() => import("../commonComponents/Announcement"));
const ProfileMenu = lazy(() => import("../userComponents/ProfileMenu"));
const MainNav = lazy(() => import("./MainNav.jsx"));
const UserNav = lazy(() => import("./UserNav.jsx"));

const Header = ({ showUserNav }) => {
  const { courseCategories } = useSelector((state) => state.course);
  const { user, token, isUserFetched } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.inventory);
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const navigate = useNavigate();

  const [announcement, setAnnouncement] = useState();
  const [showResult, setShowResult] = useState(false);
  const [products, setProducts] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showNav, setShowNav] = useState(false);
  const [showMore, setShowMore] = useState(false);

  // Dismiss Announcement
  const dismissAlert = () => {
    cookies.set(`dismissed-${announcement._id}`, "true", {
      path: "/",
      maxAge: 604800,
    });
    document.querySelector(".quick-alert").style.display = "none";
  };
  // Fetch Announcement
  const fetchAnnouncement = async () => {
    try {
      const { announcement } = await PrimaryService.fetchAnnouncement();
      setAnnouncement(announcement);
    } catch (error) {
      console.log(error);
      notification(
        "error",
        error.response
          ? error.response.data.message.split(":")[0]
          : "Something went wrong."
      );
    }
  };

  // Top Nav
  const showDropdown = () => {
    document.querySelector(".dropdown-list").classList.add("showDropdown");
  };
  const hideDropdown = () => {
    document.querySelector(".dropdown-list").classList.remove("showDropdown");
  };
  const hideSearchBar = () => {
    document.querySelector(".search-bar").classList.remove("showSearchBar");
  };

  // Search
  const fetchItems = async (data, cb) => {
    try {
      const res = await PrimaryService.searchItems(data);
      cb(res);
    } catch (error) {
      cb(error);
    }
  };

  const debouncedFetchData = debounce((query, cb) => {
    fetchItems(query, cb);
  }, 1000);

  const handleInputChange = (e) => {
    if (e.target.value !== "") {
      setShowResult(true);
      debouncedFetchData(e.target.value, ({ courses, products }) => {
        setCourses(courses);
        setProducts(products);
      });
    } else {
      setCourses([]);
      setProducts([]);
      setShowResult(false);
    }
  };

  // Auth
  const onLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(setUser(null));
    navigate("/");
    notification("success", "Logged out successfully!");
  };



  useEffect(() => {
    if (courseCategories?.length === 0) {
      dispatch(fetchCoursesCategories());
    }
  }, [dispatch, courseCategories?.length]);

  useEffect(() => {
    if (token && !isUserFetched) {
      dispatch(fetchUser());
      dispatch(fetchCart());
    }
  }, [token, isUserFetched, dispatch]);

  return (
    <>
      <header>
   
        <div className="container">
          <nav className="navbar">
            <div className="nav-logo">
              <Link to="/" className="navbar-brand">
                <img src="/assets/images/logos/learnr-logo.png" alt="" />
              </Link>
            </div>

            {/* <div className="nav-search">
             

              <form
                className="search-form"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  className="form-control"
                  type="search"
                  placeholder="What do you want to learn?"
                  onChange={handleInputChange}
                />
                <button className="btn btn-outline-success" type="submit">
                  <img src="/assets/images/homepage/search_icon.png" alt="" />
                </button>
                <div
                  className="input-results"
                  style={{ display: `${showResult ? "block" : "none"}` }}
                >
                  <ul>
                    {courses?.length > 0 && <p>Courses:</p>}

                    {courses?.map((course) => (
                      <li key={course._id}>
                        <Link to={`/course/${course.slug}`}>
                          {course.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {products?.length > 0 && <p>Product:</p>}
                  <ul>
                    {products?.map((product) => (
                      <li key={product._id}>
                        <Link to={`/product/${product.slug}`}>
                          {product.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </form>
            </div> */}

            <div className="nav-action">
              <ul>
                <li>
                  {user ? (
                    <Link className="cart" to="/cart">
                      <img
                        src="/assets/images/homepage/shopping_cart.png"
                        alt=""
                      />
                      <span className="cart-item">{cart?.length}</span>
                    </Link>
                  ) : (
                    <button
                      className="cart"
                      onClick={() => setSignInShow(true)}
                    >
                      <img
                        src="/assets/images/homepage/shopping_cart.png"
                        alt=""
                      />
                      <span className="cart-item">{cart?.length}</span>
                    </button>
                  )}
                </li>
                {!user ? (
                  <>
                    <li>
                      <button
                        onClick={() => dispatch(setSignInShow(true))}
                        className="login-btn outlined custom-btn mr-3"
                      >
                        Login
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => dispatch(setSignUpShow(true))}
                        className="signUp-btn custom-btn filled"
                      >
                        Sign up
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/notifications" className="notification">
                        <IoNotificationsOutline />
                      </Link>
                    </li>
                    <li>
                      <Suspense fallback={<ProfileCircle />}>
                        <ProfileMenu onLogout={onLogout} />
                      </Suspense>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </nav>
        </div>

        {!showUserNav ? (
          <MainNav setShowNav={setShowNav} />
        ) : (
          <UserNav setShowNav={setShowNav} onLogout={onLogout} />
        )}

        <div className="search-bar">
          <form className="popup-search">
            <div className="input-wrap">
              <input
                type="text"
                placeholder="What Do You Want To Learn"
                onChange={handleInputChange}
              />
              <button>
                <BsSearch />
              </button>
            </div>
            <div
              className="input-results"
              style={{ display: `${showResult ? "block" : "none"}` }}
            >
              <ul>
                {courses?.length > 0 && <p className="mb-2">Courses:</p>}

                {courses?.map((c) => (
                  <li key={c._id}>
                    <Link to={`/course/${c.slug}`}>{c.title}</Link>
                  </li>
                ))}
              </ul>
              {products?.length > 0 && <p className="mt-3 mb-2">Product:</p>}
              <ul>
                {products?.map((p) => (
                  <li key={p._id}>
                    <Link to={`/product/${p.slug}`}>{p.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </form>
          <div className="cancel-bar-wrap" onClick={hideSearchBar}>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className={`side-nav ${showNav ? "showSideNav" : ""}`}>
          <div className="side-nav-close" onClick={() => setShowNav(false)}>
            <span></span>
            <span></span>
          </div>

          <div className="side-nav-header">
            <Link to="/">
              <img src="/assets/images/homepage/brand_logo.png" alt="" />
            </Link>
          </div>

          <div className="side-nav-body">
            <ul>
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
              <li>
                <NavLink activeclassname="active" to="/bundle-courses">
                  Bundled Courses
                </NavLink>
              </li>
              {/* <li>
                <NavLink activeclassname="active" to="/products">
                  All Products
                </NavLink>
              </li> */}
              {/* <li>
                <NavLink activeclassname="active" to="/book-courses">
                  Books
                </NavLink>
              </li> */}
              <li>
                <NavLink activeclassname="active" to="/blogs">
                  Blogs
                </NavLink>
              </li>
              <li>
                <button onClick={() => setShowMore(!showMore)}>
                  More {showMore ? <BsChevronUp /> : <BsChevronDown />}
                </button>
                <div
                  className={`more-links ${showMore ? "d-block" : "d-none"}`}
                >
                  <ul className="m-0 pl-3">
                    <li>
                      <NavLink activeclassname="active" to="/contact">
                        Contact Us
                      </NavLink>
                    </li>
                    <li>
                      <NavLink activeclassname="active" to="/about">
                        About us
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        activeclassname="active"
                        to="/frequently-asked-questions"
                      >
                        FAQ
                      </NavLink>
                    </li>
                    <li>
                      <NavLink activeclassname="active" to="/help">
                        Help
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>

          <div className="side-nav-footer">
            <div className="mt-4">
              {!user ? (
                <>
                  <button
                    onClick={() => dispatch(setSignInShow(true))}
                    className="login-btn custom-btn d-inline-flex mr-3"
                    to="FIXME:"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => dispatch(setSignUpShow(true))}
                    className="signup-btn custom-btn d-inline-flex filled"
                    to="FIXME:"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <button
                  onClick={onLogout}
                  className="signup-btn custom-btn d-inline-flex filled"
                  to="FIXME:"
                >
                  Logout
                </button>
              )}
            </div>
            <div>
              <Link to="#" className="language-btn">
                <GrLanguage />
                <span>English</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <SignUpModal />
      <SignInModal />
      <ForgotPasswordModal />
    </>
  );
};

export default Header;
