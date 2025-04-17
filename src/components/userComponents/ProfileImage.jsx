import React from "react";
import { useSelector } from "react-redux";

const ProfileImage = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <img
      src={`${process.env.REACT_APP_BACKEND_URL}/uploads/user/profile/${user?.profileImg}`}
      alt=""
      onError={({ currentTarget }) => {
        currentTarget.onerror = null;
        currentTarget.src = "/assets/images/common/image-placeholder.webp";
      }}
    />
  );
};

export default ProfileImage;
