import React, { useEffect } from "react";
import { Fancybox as NativeFancybox } from "@fancyapps/ui/dist/fancybox/fancybox.esm";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const FancyBox = (props) => {
  const delegate = props.delegate || "[data-fancybox]";

  useEffect(() => {
    const opts = props.options || {};

    NativeFancybox.bind(delegate, opts);

    return () => {
      NativeFancybox.destroy();
    };
  }, [delegate, props.options]);

  return <>{props.children}</>;
};

export default FancyBox;
