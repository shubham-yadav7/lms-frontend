import React, { useEffect, useState } from "react";
import { BsWhatsapp } from "react-icons/bs";

const WhatsAppLink = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 5000);
  }, []);

  return (
    <>
      {show && (
        <div className="fixed-link">
          <a target="_blank" href="">
            <BsWhatsapp />
          </a>
        </div>
      )}
    </>
  );
};

export default WhatsAppLink;
