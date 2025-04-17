import { toast } from "react-toastify";

const notification = (response, message, dir = "top-right") => {
  if (response === "success") {
    return toast.success(message, {
      position: dir,
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
    });
  }
  if (response === "error") {
    return toast.error(message, {
      position: dir,
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
    });
  }
  if (response === "warning") {
    return toast.warn(message, {
      position: dir,
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
    });
  }
};

export default notification;
