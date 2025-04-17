import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import notification from "../../helpers/notification";
import CourseServices from "../../auth/services/CourseServices";
// import CourseDescription from '../components/CourseDescription'
import DetailPageHeader from "../../components/courseComponents/DetailPageHeader";
import CourseDescription from "../../components/courseComponents/CourseDescription.jsx";
// import RelatedCourse from '../components/RelatedCourse'

const CourseDetails = () => {
  const { slug } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);
  const [topics, setTopics] = useState();
  // const [relatedCourse,setRelatedCourse]=useState([])
  // const [reviews, setReviews] = useState([]);
  const [instructorCourses, setInstructorCourses] = useState([]);

  //Pagination
  const [pageCount, setPageCount] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [pageNo, setPageNo] = useState(0);

  const myRef = useRef();
  const executeScroll = () => myRef.current.scrollIntoView();

  const handlePageClick = (e) => {
    setPageNo(e.selected);
  };

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const { course, totalInstructorCourses, topics } = await CourseServices.fetchCourse(slug);
        setCourseDetails(course);
        setInstructorCourses(totalInstructorCourses);
        setTopics(topics);
      } catch (error) {
        console.log(error);
        notification(
          "error",
          error.response ? error.response.data.message : "Something went wrong."
        );
      }
    };

    fetchCourseDetails();
  }, [slug]);

  return (
    <>
      <DetailPageHeader executeScroll={executeScroll} details={courseDetails} />
      <CourseDescription
        details={courseDetails}
        handlePageClick={handlePageClick}
        pageCount={pageCount}
        itemsPerPage={itemsPerPage}
        pageNo={pageNo}
        myRef={myRef}
        instructorCourses={instructorCourses}
        topics={topics}
      />
    </>
  );
};

export default CourseDetails;
