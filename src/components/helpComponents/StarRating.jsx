import React from "react";

const StarRating = ({ rating }) => {
  return (
    <>
      {rating === 0 && <span className="rating-star-wrap zero-star"></span>}
      {rating > 0 && rating <= 1 && (
        <span className="rating-star-wrap one-star"></span>
      )}
      {rating > 1 && rating <= 1.5 && (
        <span className="rating-star-wrap oneHalf-star"></span>
      )}
      {rating > 1.5 && rating <= 2 && (
        <span className="rating-star-wrap two-star"></span>
      )}
      {rating > 2 && rating <= 2.5 && (
        <span className="rating-star-wrap twoHalf-star"></span>
      )}
      {rating > 2.5 && rating <= 3 && (
        <span className="rating-star-wrap three-star"></span>
      )}
      {rating > 3 && rating <= 3.5 && (
        <span className="rating-star-wrap threeHalf-star"></span>
      )}
      {rating > 3.5 && rating <= 4 && (
        <span className="rating-star-wrap four-star"></span>
      )}
      {rating > 4 && rating <= 4.5 && (
        <span className="rating-star-wrap fourHalf-star"></span>
      )}
      {rating > 4.5 && <span className="rating-star-wrap five-star"></span>}
    </>
  );
};

export default StarRating;
