import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

const FilterOptionCheckbox = (props) => {
  const [option, setOption] = useState(false);

  return (
    <div className="filter-option">
      <div className="filter-option-heading" onClick={() => setOption(!option)}>
        <h4>
          <span>{props.title}</span>
          <BsChevronDown className={option ? "up" : ""} />
        </h4>
      </div>
      <div
        className={`filter-option-body ${option ? "show-filter-options" : ""}`}
      >
        <ul>
          {props.data?.map((item, i) => (
            <li key={i}>
              <div className="filter-option-item">
                <input
                  type="checkbox"
                  id={`${item.title ? item.title : item.name}${i}`}
                  name={props.title}
                  value={item._id}
                  onChange={props.onChangeHandler}
                  checked={
                    props.filterData[`${props.title}`].includes(item._id)
                      ? true
                      : false
                  }
                />
                <label
                  className="checkbox"
                  htmlFor={`${item.title ? item.title : item.name}${i}`}
                >
                  {item.title ? item.title : item.name}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterOptionCheckbox;
