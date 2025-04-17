import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import RatingStar from "../helpComponents/RatingStar";

const FilterOptionRadio = (props) => {
  const [option, setOption] = useState(false);
  return (
    <div className="filter-option">
      <div className="filter-option-heading" onClick={() => setOption(!option)}>
        <h4>
          <span>{props?.title}</span>
          <BsChevronDown className={option ? "up" : ""} />
        </h4>
      </div>
      <div
        className={`filter-option-body ${option ? "show-filter-options" : ""}`}
      >
        <ul>
          {props?.data?.map((item, i) =>
            !(props.title === "rating") ? (
              <li key={i}>
                <div className="filter-option-item">
                  <input
                    type="radio"
                    id={`${item.title}${i}`}
                    name={props.title}
                    value={item._id}
                    onChange={props.onChangeHandler}
                    checked={
                      props.filterData[`${props.title}`]?.includes(item._id)
                        ? true
                        : false
                    }
                  />
                  <label className="radio" htmlFor={`${item.title}${i}`}>
                    {item.title}{" "}
                  </label>
                </div>
              </li>
            ) : (
              <li key={i}>
                <div className="filter-option-item">
                  <input
                    type="radio"
                    id={`${props.title}${i}`}
                    name={props.title}
                    value={item._id}
                    onChange={props.onChangeHandler}
                    checked={
                      props.filterData[`${props.title}`]?.includes(item._id)
                        ? true
                        : false
                    }
                  />
                  <label className="radio" htmlFor={`${props.title}${i}`}>
                    <RatingStar rateCount={item.title} />
                  </label>
                </div>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default FilterOptionRadio;
