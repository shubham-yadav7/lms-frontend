import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BackToTop = ({ top = 0 }) => {
  const routePath = useLocation();

  const onTop = (top) => {
    window.scrollTo(0, top);
  };

  useEffect(() => {
    onTop(top);
  }, [routePath, top]);

  return null;
};

export default BackToTop;
