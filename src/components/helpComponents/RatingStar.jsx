import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

const RatingStar = ({ rateCount }) => {
  let stars = [];
  for (let i = 1; i <= 5; i++) {
    if (parseInt(rateCount) - i >= 0) {
      stars.push("filled");
    } else {
      stars.push("unfilled");
    }
  }
  return (
    <span>
      {stars.map((star, i) =>
        star === "filled" ? <FaStar key={i} /> : <FaRegStar key={i} />
      )}
    </span>
  );
};

export default RatingStar;
