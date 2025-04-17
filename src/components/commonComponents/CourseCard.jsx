import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCourse } from "../../store/courseSlice";
// import { fetchUser, setSignInShow } from "../../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import StarRating from "../helpComponents/StarRating";
import { fetchCart } from "../../store/inventorySlice";
import notification from "../../helpers/notification";
import InventoryServices from "../../auth/services/InventoryServices";
import { fetchUser } from "../../store/authSlice";

const CourseCard = ({ course }) => {
  // const { user } = useSelector((state) => state.auth);
  const { purchasedCourses } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.inventory);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  // 🚨 add to cart complete  | update redux state and continue further
  const handleCart = async (id) => {
    try {
      const { message } = await InventoryServices.addToCart({
        id,
        type: "course",
      });

      notification("success", message);
      dispatch(fetchCart());
      dispatch(fetchUser());
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 409) {
        notification(
          "warning",
          error.response ? error.response.data.message : "Something went wrong."
        );
      } else {
        notification(
          "error",
          error.response ? error.response.data.message : "Something went wrong."
        );
      }
    }
  };

  return (
    <>
      {course && (
        <div className="course-item">
          <Link to={`/course/${course?.slug}`}>
            <figure className="mb-0">
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/uploads/courses/thumbnails/${course?.thumbnailImage}`}
                alt=""
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src =
                    "/assets/images/common/image-placeholder.webp";
                }}
              />
            </figure>
          </Link>
          <div className="course-content">
            <div className="course-details-wrap">
              <div className="course-detail">
                <img
                  src="/assets/images/homepage/courses/user_icon.png"
                  alt=""
                />
                <span>{course?.studentsEnrolled} Students Enrolled</span>
              </div>
              <div className="course-detail">
                <img
                  src="/assets/images/homepage/courses/clock_icon.png"
                  alt=""
                />
                <span>{course?.duration?.inWords || 0}</span>
              </div>
            </div>
            <Link
              to={`/course/${course?.slug}`}
              className="course-title d-block"
            >
              <h4>
                {course?.title?.length > 45
                  ? `${course?.title?.substring(0, 45)}...`
                  : course?.title}
              </h4>
            </Link>
            <div className="course-price-wrap">
              <div className="course-price">
                <h5>
                  ₹{course?.discountedPrice}{" "}
                  <span className="og-price">₹{course?.price}</span>
                </h5>
              </div>
              <div className="course-rating">
                <span className="no_dash">
                  <StarRating
                    rating={course?.averageRating ? course?.averageRating : 0}
                  />
                  <span className="rating ml-0">
                    ({course?.ratings?.length})
                  </span>
                </span>
              </div>
            </div>
            <Link
              to={`/course/${course?.slug}`}
              className="view-course-btn custom-btn d-block d-sm-none"
            >
              View Course
            </Link>
          </div>
          <div className="course-more-details">
            <div className="more-details-header">
              <p className="update-date">
                updated {new Date(course?.updatedAt).toDateString()}
              </p>
            </div>
            <div className="more-details-title">
              <h4>
                {course?.title.length > 55
                  ? `${course?.title.substring(0, 55)}...`
                  : course?.title}
              </h4>
              <div className="more-details-stats">
                <div className="stats-details mr-3">
                  <img
                    src="/assets/images/homepage/courses/clipboard_icon.png"
                    alt=""
                  />
                  <span>{course?.totalLessons} Lessons</span>
                </div>
                <div className="stats-details">
                  <img
                    src="/assets/images/homepage/courses/clock_icon.png"
                    alt=""
                  />
                  <span>{course?.duration?.inWords || "0 hrs"}</span>
                </div>
              </div>
            </div>
            <div className="more-details-pointers">
              {course?.benefits?.length === 0 && course?.description ? (
                <>
                  <h5>Course Details</h5>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: course?.description?.slice(0, 10),
                    }}
                  ></p>
                </>
              ) : (
                <>
                  <h5>List is Given Below</h5>
                  <ul>
                    {course?.benefits?.slice(0, 4).map((benefit, i) => (
                      <li key={i}>
                        <img
                          src="/assets/images/homepage/courses/tick_icon.png"
                          alt=""
                        />
                        <p>{benefit}</p>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <div className="more_btn_wrap">
              <div className="more-details-action-wrap">
                {/* TODO: */}
                {!purchasedCourses?.includes(course?._id.toString()) ? (
                  <>
                    {cart?.find(
                      (item) => item?.item?._id.toString() === course?._id.toString()
                    ) ? (
                      <button
                        className="redirect-link green filled"
                        onClick={() => navigate("/cart")}
                      >
                        Go To Cart
                      </button>
                    ) : (
                      <button
                        className="redirect-link green filled"
                        onClick={() => handleCart(course?._id)}
                      >
                        Add To Cart
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    type={"button"}
                    onClick={() => startCourse(course?._id)}
                    className="redirect-link green filled"
                  >
                    Start Course
                  </button>
                )}

                <Link to={`/course/${course?.slug}`} className="redirect-link">
                  View course
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseCard;
