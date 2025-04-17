import React, { useState } from "react";
import Collapsible from "react-collapsible";
import { BiPlus, BiMinus } from "react-icons/bi";

const FaqCollapseItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible
      transitionTime={200}
      onOpen={() => setOpen(true)}
      onClosing={() => setOpen(false)}
      className="faq-accordion"
      trigger={question}
    >
      <p>{answer}</p>
      <span className="icon" trigger={question}>
        {open ? <BiMinus /> : <BiPlus />}
      </span>
    </Collapsible>
  );
};

export default FaqCollapseItem;
