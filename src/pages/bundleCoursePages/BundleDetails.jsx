import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import BundleServices from "../../auth/services/BundleServices";
import BundlePageHeader from "../../components/bundleComponents/BundlePageHeader.jsx";
import BundleDescription from "../../components/bundleComponents/BundleDescription.jsx";
import notification from "../../helpers/notification";

const BundleDetails = () => {
  const { slug } = useParams();

  const [bundleDetails, setBundleDetails] = useState(null);
  const [reviewsCount, setReviewsCount] = useState([]);
  //   Review pending

  const myRef = useRef();
  const executeScroll = () => myRef.current.scrollIntoView();

  //   reviews pagination pending

  useEffect(() => {
    const fetchBundleBySlug = async () => {
      try {
        const { courseBundles } = await BundleServices.fetchBundleBySlug(slug);
        setBundleDetails(courseBundles);
      } catch (error) {
        console.log(error);
        notification(
          "error",
          error.response ? error.response.data.message : "Something went wrong!"
        );
      }
    };

    fetchBundleBySlug();
  }, [slug]);

  return (
    <>
      <BundlePageHeader executeScroll={executeScroll} details={bundleDetails} />
      <BundleDescription
        details={bundleDetails}
        myRef={myRef}
        reviewsCount={reviewsCount}
      />
    </>
  );
};

export default BundleDetails;
