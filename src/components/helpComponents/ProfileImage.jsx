import React from "react";
import { useSelector } from "react-redux";

const ProfileImage = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <img
      src={
        !user?.profileImg
          ? "/assets/images/homepage/profile-placeholder.jpg"
          : `${process.env.REACT_APP_BACKEND_URL}/uploads/user/profile/${user.profileImg}`
      }
      alt=""
    />
  );
};

export default ProfileImage;
