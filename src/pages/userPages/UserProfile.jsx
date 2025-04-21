import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { HiLockClosed } from "react-icons/hi";
import { AiFillEdit, AiOutlineLeft } from "react-icons/ai";
import notification from "../../helpers/notification";
import AuthServices from "../../auth/services/AuthServices";
import Modal from "../../components/helpComponents/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/authSlice";
import { useForm, Controller } from "react-hook-form";
import AddressStateCity from "../../components/helpComponents/AddressStateCity.jsx";
import UserDashProfile from "../../components/userComponents/UserDashProfile.jsx";
import {getCookie, getTime, setCookie} from '../../helpers/HandleOtp'

let timer = null;

const UserProfile = () => {
  const expiry = process.env.REACT_APP_OTP_EXPIRY;
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [screenNo, setScreenNo] = useState(1);
  const [showEditMobileModal, setShowEditMobileModal] = useState(false);
  const [showResendLink, setShowResendLink] = useState(false);
  const [resendTimes, setResendTimes] = useState(0);
  const [otpExp, setOtpExp] = useState(expiry);
  const [showPassword, setShowPassword] = useState({
    oldPass: false,
    newPass: false,
    confirmPass: false,
  });

  // Basic info update form
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const updateProfileForm = async (data) => {
    try {
      const { message } = await AuthServices.updateProfile({
        ...data,
        type: "profile-update",
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

  // Address update form
  const {
    register: addressFormRegister,
    formState: { errors: addressFormError },
    handleSubmit: addressFormSubmit,
    setValue: addressFormSetValue,
    control: addressFormControl,
  } = useForm();

  const handleAddressForm = async (data) => {
    try {
      const { message } = await AuthServices.updateProfile({
        ...data,
        type: "address-update",
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

  // Change Password form
  const {
    register: changePasswordRegister,
    formState: { errors: changePasswordError },
    handleSubmit: changePasswordSubmit,
    watch: changePasswordWatch,
    reset: changePasswordReset,
  } = useForm();
  const newPassword = changePasswordWatch("newPassword");

  const handleChangePasswordSubmit = async (data) => {
    try {
      const { message } = await AuthServices.changePassword(data);
      notification("success", message);
      changePasswordReset();
    } catch (error) {
      console.log(error);
      notification(
        "error",
        error.response ? error.response.data.message : "Something went wrong."
      );
    }
  };

  // Update mobile || Send OTP form
  const {
    register: updateMobileRegister,
    formState: { errors: updateMobileError },
    handleSubmit: updateMobileSubmit,
    reset: updateMobileReset,
    getValues: updateMobileValues,
  } = useForm();

  const handleHideEditMobileModal = () => {
    setShowEditMobileModal(false);
    setScreenNo(1);
  };

  const handleUpdateMobile = async (data) => {
    try {
      if (!getCookie("limitReached2")) {
        const { message } = await AuthServices.sendOtp(data);
        notification("success", message);
        setScreenNo(2);
        setShowResendLink(false);
        setOtpExp(expiry);
        timer = setInterval(function () {
          setOtpExp((prev) => prev - 1);
        }, 1000);
      } else {
        notification("warning", "Mobile number can't be changed");
      }
    } catch (error) {
      console.log(error);
      notification(
        "error",
        error.response ? error.response.data.message : "Something went wrong"
      );
    }
  };

  // Otp form
  const {
    register: verifyOtpRegister,
    formState: { errors: verifyOtpError },
    handleSubmit: verifyOtpSubmit,
    reset: verifyOtpReset,
  } = useForm();

  const handleOtpVerification = async (data) => {
    try {
      data.phone = updateMobileValues("phone");
      const { message } = await AuthServices.updatePhone(data);
      notification("success", message);
      setScreenNo(1);
      setShowEditMobileModal(false);
      setResendTimes(0);
      dispatch(fetchUser());
      verifyOtpReset();
      updateMobileReset();
    } catch (error) {
      console.log(error);
      notification(
        "error",
        error.response ? error.response.data.message : "Something went wrong"
      );
    }
  };

  const handleResendLink = (e) => {
    if (getCookie("limitReached2")) {
      notification("warning", "Resend otp link limit has been reached!");
      setResendTimes(0);
    } else {
      if (resendTimes < 3) {
        handleUpdateMobile({ phone: updateMobileValues("phone") });
        setResendTimes((prev) => prev + 1);
      } else {
        setCookie("limitReached2", true);
        notification("warning", "Resend otp link limit has been reached!");
      }
    }
  };

  useEffect(() => {
    if (user) {
      setValue("firstName", user?.firstName);
      setValue("lastName", user?.lastName);
      setValue("email", user?.email);
      addressFormSetValue("address", user?.address ? user?.address : "");
      addressFormSetValue("pinCode", user?.pinCode ? user?.pinCode : "");
    }
  }, [user, setValue, addressFormSetValue]);

  useEffect(() => {
    if (otpExp === 0) {
      clearInterval(timer);
      setOtpExp(expiry);
      setShowResendLink(true);
    }
  }, [otpExp, expiry]);

  return (
    <section className="user-profile dark py-5">
      <div className="container">
        <h4 className="page-title">Profile</h4>
        <div className="profile-edit-wrap">
          <div className="row">
            <div className="col-lg-4">
              <UserDashProfile editProfile={"edit-profile"} />
            </div>
            <div className="col-lg-8 mt-5 mt-lg-0">
              <div className="profile-edit-form">
                <h4 className="form-title">Personal Details</h4>
                <form onSubmit={handleSubmit(updateProfileForm)}>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="input-wrap">
                        <input
                          type="text"
                          placeholder="First Name"
                          {...register("firstName", { required: true })}
                        />
                        {errors.firstName && (
                          <span className="errorSpan">
                            {" "}
                            {errors.firstName}{" "}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="input-wrap">
                        <input
                          type="text"
                          placeholder="Last Name"
                          {...register("lastName", { required: true })}
                        />
                        {errors.lastName && (
                          <span className="errorSpan"> {errors.lastName} </span>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="input-wrap">
                        <input
                          type="email"
                          placeholder="Email"
                          {...register("email", { required: true })}
                        />
                        {errors.email && (
                          <span className="errorSpan"> {errors.email} </span>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div
                        className="phone-no"
                        onClick={() => {
                          setShowEditMobileModal(true);
                        }}
                      >
                        <p>
                          <span>
                            <HiLockClosed />
                          </span>
                          {user?.phone}
                        </p>
                        <AiFillEdit />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-btn-wrap">
                        <button type="submit">Update Profile</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
             
              <div className="profile-edit-form mt-5">
                <h4 className="form-title">Change Password</h4>
                <form
                  onSubmit={changePasswordSubmit(handleChangePasswordSubmit)}
                >
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="input-wrap">
                        <input
                          type={showPassword.oldPass ? "text" : "password"}
                          placeholder="Old Password"
                          {...changePasswordRegister("oldPassword", {
                            required: true,
                          })}
                        />
                        <span
                          className="eye"
                          onClick={() =>
                            setShowPassword((prev) => ({
                              ...prev,
                              oldPass: !showPassword.oldPass,
                            }))
                          }
                        >
                          <FaEye />
                        </span>
                        {changePasswordError.oldPassword &&
                          changePasswordError.oldPassword.type && (
                            <small className="errorSpan">
                              This field is required
                            </small>
                          )}
                      </div>
                    </div>
                    <div className="col-lg-6"></div>
                    <div className="col-lg-6">
                      <div className="input-wrap ">
                        <input
                          type={showPassword.newPass ? "text" : "password"}
                          placeholder="New Password"
                          {...changePasswordRegister("newPassword", {
                            required: true,
                          })}
                        />
                        <span
                          className="eye"
                          onClick={() =>
                            setShowPassword((prev) => ({
                              ...prev,
                              newPass: !showPassword.newPass,
                            }))
                          }
                        >
                          <FaEye />
                        </span>
                        {changePasswordError.newPassword &&
                          changePasswordError.newPassword.type && (
                            <small className="errorSpan">
                              This field is required
                            </small>
                          )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="input-wrap ">
                        <input
                          type={showPassword.confPass ? "text" : "password"}
                          placeholder="Confirm password"
                          {...changePasswordRegister("confirmPassword", {
                            required: true,
                            validate: (value) =>
                              value === newPassword ||
                              "New password and and confirm password not same",
                          })}
                        />
                        <span
                          className="eye"
                          onClick={() =>
                            setShowPassword((prev) => ({
                              ...prev,
                              confPass: !showPassword.confPass,
                            }))
                          }
                        >
                          <FaEye />
                        </span>
                        {changePasswordError.confirmPassword && (
                          <>
                            {changePasswordError.confirmPassword.type ===
                              "required" && (
                              <small className="errorSpan">
                                This field is required.
                              </small>
                            )}
                            {changePasswordError.confirmPassword.type ===
                              "validate" && (
                              <small className="errorSpan">
                                {changePasswordError.confirmPassword.message}
                              </small>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    {changePasswordError.custom && (
                      <small
                        style={{
                          display: "block",
                          color: "red",
                          textAlign: "center",
                          width: "100%",
                          marginBottom: "10px",
                        }}
                      >
                        {changePasswordError.custom.message}
                      </small>
                    )}
                    <div className="col-lg-12">
                      <div className="form-btn-wrap">
                        <button type="submit">Change Password</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={showEditMobileModal}
        onHide={handleHideEditMobileModal}
        xsm={true}
      >
        {screenNo === 1 && (
          <form onSubmit={updateMobileSubmit(handleUpdateMobile)}>
            <h4 className="form-title">Edit mobile number</h4>
            <div className="input-wrap">
              <input
                type="tel"
                placeholder="Phone"
                {...updateMobileRegister("phone", {
                  required: true,
                  minLength: 10,
                })}
                maxLength={10}
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
              {updateMobileError.phone &&
                updateMobileError.phone.type === "required" && (
                  <small className="errorSpan">This field is required</small>
                )}
              {updateMobileError.phone &&
                updateMobileError.phone.type === "minLength" && (
                  <small className="errorSpan">
                    Please provide valid number
                  </small>
                )}
            </div>
            <div className="form-btn-wrap mb-4">
              <button type="submit">Update</button>
            </div>
          </form>
        )}
        {screenNo === 2 && (
          <div className="model-right-content sign-up-modal">
            <button
              type="button"
              className="go-back"
              onClick={() => {
                setScreenNo(1);
                setOtpExp(expiry);
              }}
            >
              <AiOutlineLeft /> Back
            </button>
            <div className="form-wrap">
              <div className="screen">
                <div className="screen-heading">
                  <h2>Verification</h2>
                  <p>You will get a OTP via SMS</p>
                </div>
                <form
                  className="otp-form mt-2"
                  onSubmit={verifyOtpSubmit(handleOtpVerification)}
                >
                  <div className="input-group">
                    <div className="input-wrap">
                      <input
                        type="text"
                        {...verifyOtpRegister("otp", {
                          required: true,
                        })}
                        maxLength="6"
                        onKeyPress={(e) => {
                          if (!/[0-9]/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                      />
                      {verifyOtpError.otp &&
                        verifyOtpError.otp.type === "required" && (
                          <small className="errorSpan">
                            This field is required.
                          </small>
                        )}
                    </div>
                  </div>
                  <div className="form-btn-wrap mb-sm-4 mb-2">
                    <button type="submit">Verify</button>
                  </div>
                  <div className="link-toggle-wrap">
                    {showResendLink ? (
                      <>
                        <p>
                          Didn't receive the verification OTP?
                          <button
                            className="form-link"
                            type="button"
                            onClick={(e) => {
                              handleResendLink(e);
                            }}
                          >
                            Resend again
                          </button>
                        </p>
                      </>
                    ) : (
                      <p>{getTime(otpExp)}s</p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default UserProfile;
