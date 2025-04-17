import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="error-page ">
      <div className="container">
        <div className="error-wrap">
          <figure className="mb-0">
            <img src="/assets/images/common/404.png" alt="" />
          </figure>

          <h4 className="mt-5">
            Oops! The Page You Are Looking For Does Not Exist
          </h4>
          <p>
            Please return to the site's homepage, It looks like nothing was
            found at this location
          </p>
          <Link to="/" className="redirect-link filled-btn mt-4">
            Back To Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
