import React from "react";
import notification from "../../helpers/notification";
import ProfileImage from "../userComponents/ProfileImage";
import moment from "moment";
import AuthServices from "../../auth/services/AuthServices";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/authSlice";
import { BsPencil } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

const UserDashProfile = ({ editProfile }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const ChangeProfile = async (e) => {
    try {
      if (e.target.files[0]) {
        let formData = new FormData();
        formData.append("userProfileImg", e.target.files[0]);
        let { message } = await AuthServices.changeProfilePicture(formData);
        notification("success", message);
        dispatch(fetchUser());
      }
    } catch (error) {
      console.log(error);
      notification(
        "error",
        error.response ? error.response.data.message : "Something went wrong."
      );
    }
  };
  const removeProfileImg = async () => {
    try {
      const { message } = await AuthServices.updateProfile({
        type: "remove-profile",
      });
      notification("success", message);
      dispatch(fetchUser());
    } catch (error) {
      console.log(error);
      notification(
        "error",
        error.response ? error.response.data.message : "Something went wrong."
      );
    }
  };

  return (
    <>
      <div className={`user-dash-profile ${editProfile}`}>
        <div className="profile-wrap">
          <figure className="mb-0">
            <ProfileImage />
            <label htmlFor="userProfile" className="edit-profile">
              <BsPencil />
            </label>
            <div
              className={`delete-overlay ${
                user?.profileImg ? "d-flex" : "d-none"
              }`}
              onClick={removeProfileImg}
            >
              <MdDelete />
            </div>
          </figure>
          <input
            type="file"
            id="userProfile"
            name="userProfileImg"
            accept="image/*"
            onChange={ChangeProfile}
          />
        </div>
        {editProfile ? (
          <div className="about-user-wrap">
            <h4>Edit Profile Image</h4>
            <p>Last Update {moment(user?.updatedAt).format("MMM Do YYYY")}</p>
          </div>
        ) : (
          <div className="about-user-wrap">
            <h4>
              {user?.firstName} {user?.lastName}
            </h4>
            <p>{user?.email}</p>
            <span>
              Joined On {moment(user?.createdAt).format("MMM Do YYYY")}
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default UserDashProfile;
