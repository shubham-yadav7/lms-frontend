import React, { useEffect, useState } from "react";
import Modal from "../helpComponents/Modal";
import { FaEye } from "react-icons/fa";
import notification from "../../helpers/notification";
import { AiOutlineLeft } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  setForgotPasswordShow,
  setSignUpShow,
  setSignInShow,
} from "../../store/authSlice";
import { useForm } from "react-hook-form";
import AuthServices from "../../auth/services/AuthServices";
import { getCookie, getTime, setCookie } from "../../helpers/HandleOtp";

let timer;

const ForgotPasswordModal = () => {
  const expiry = process.env.REACT_APP_OTP_EXPIRY;
  const { forgotPasswordShow } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [showResendLink, setShowResendLink] = useState(false);
  const [screenNo, setScreenNo] = useState(1);
  const [otpExp, setOtpExp] = useState(expiry);
  const [resendTimes, setResendTimes] = useState(0);
  const [resetToken, setResetToken] = useState(null);
  const [newPass, setNewPass] = useState(false);
  const [confPass, setConfPass] = useState(false);

  // Forgot password form
  const {
    register: changePasswordRegister,
    formState: { errors: changePasswordErrors },
    handleSubmit: changePasswordHandleSubmit,
    reset: changePasswordReset,
    getValues: getChangePasswordValues,
  } = useForm();

  // Verify otp form
  const {
    register: verifyOtpRegister,
    formState: { errors: verifyOtpErrors },
    handleSubmit: verifyOtpHandleSubmit,
    reset: verifyOtpReset,
  } = useForm();

  // Reset Password form
  const {
    register: resetPasswordRegister,
    formState: { errors: resetPasswordErrors },
    handleSubmit: resetPasswordHandleSubmit,
    reset: resetPasswordFormReset,
  } = useForm();

  const toggleRegister = () => {
    dispatch(setForgotPasswordShow(false));
    dispatch(setSignUpShow(true));
  };
  const toggleSignIn = () => {
    dispatch(setForgotPasswordShow(false));
    dispatch(setSignInShow(true));
  };

  const handleHideForgotModal = () => {
    dispatch(setForgotPasswordShow(false));
    setScreenNo(1);
    changePasswordReset();
    resetPasswordFormReset();
    verifyOtpReset();
  };

  // Forget password Request
  const handleChangePassword = async (data) => {
    try {
      setShowResendLink(false);
      setOtpExp(expiry);

      const { message } = await AuthServices.forgotPassword(data);
      notification("success", message);
      setScreenNo(2);
      timer = setInterval(function () {
        setOtpExp((prev) => prev - 1);
      }, 1000);
    } catch (error) {
      console.log(error);
      notification(
        "error",
        error.response
          ? error.response.data.message.split(":")[0]
          : "Something went wrong."
      );
    }
  };

  // Verify otp request
  const handleVerifyOtp = async (data) => {
    try {
      if (!getCookie("limitReached")) {
        data.phone = getChangePasswordValues("phone");
        const { token, message } = await AuthServices.verifyResetOtp(data);
        setResetToken(token);
        setScreenNo(3);
        notification("success", message);
      } else {
        notification("warning", "You can not reset password!");
      }
    } catch (error) {
      console.log(error);
      notification(
        "error",
        error.response
          ? error.response.data.message.split(":")[0]
          : "Something went wrong."
      );
    }
  };

  // Reset password request
  const handleResetPassword = async (data) => {
    try {
      data.resetToken = resetToken;
      const { message } = await AuthServices.resetPassword(data);

      notification("success", message);
      handleHideForgotModal();
      resetPasswordFormReset();
      verifyOtpReset();
    } catch (error) {
      console.log(error);
      notification(
        "error",
        error.response
          ? error.response.data.message.split(":")[0]
          : "Something went wrong."
      );
    }
  };

  // Resend otp request
  const handleResendOtp = async () => {
    if (getCookie("limitReached")) {
      notification("warning", "Resend otp link limit has been reached!");
    } else {
      if (resendTimes < 3) {
        handleChangePassword({ phone: getChangePasswordValues("phone") });
        setResendTimes((prev) => prev + 1);
      } else {
        setCookie("limitReached", true);
        notification("warning", "Resend otp link limit has been reached!");
      }
    }
  };

  useEffect(() => {
    if (otpExp === 0) {
      clearInterval(timer);
      setOtpExp(expiry);
      setShowResendLink(true);
    }
  }, [otpExp, expiry]);

  return (
    <Modal show={forgotPasswordShow} onHide={handleHideForgotModal}>
      {screenNo === 1 && (
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="model-left-img">
              <figure className="mb-0 d-none d-lg-block">
                <img src="/assets/images/common/sign-in.svg" alt="" />
              </figure>
            </div>
          </div>
          <div className="col-lg-6 mt-sm-5 mt-2 mt-lg-0">
            <div className="model-right-content">
              <div className="form-wrap">
                <div className="modal-heading mb-4">
                  <h4>Reset Password</h4>
                </div>
                <form
                  onSubmit={changePasswordHandleSubmit(handleChangePassword)}
                >
                  <div className="input-wrap mb-4">
                    <input
                      type="text"
                      placeholder="Mobile no"
                      name="phone"
                      maxLength={13}
                      {...changePasswordRegister("phone", { required: true })}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                    {changePasswordErrors.phone?.type === "required" && (
                      <small className="errorSpan">
                        This field is required
                      </small>
                    )}
                  </div>
                  <div className="redirect-link-text mb-3">
                    <p onClick={toggleSignIn}>Or Login to your account</p>
                  </div>
                  <div className="form-btn-wrap mb-4">
                    <button type="submit">Reset Password</button>
                  </div>
                  <div className="link-toggle-wrap">
                    <p>
                      Don't have an account?
                      <button
                        className="form-link"
                        type="button"
                        onClick={toggleRegister}
                      >
                        Register Now!
                      </button>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {screenNo === 2 && (
        <div className="row align-items-lg-center">
          <div className="col-lg-5">
            <div className="model-left-img">
              <div className="modal-heading">
                <h4>OTP Verification</h4>
              </div>
              <figure className="mb-0 d-none d-lg-block">
                <img src="/assets/images/common/sign-up.svg" alt="" />
              </figure>
            </div>
          </div>
          <div className="col-lg-7 mt-sm-4 mt-2 mt-lg-0">
            <div className="model-right-content sign-up-modal">
              <button
                type="button"
                className="go-back"
                onClick={() => {
                  setScreenNo(1);
                  setOtpExp(60);
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
                    className="otp-form"
                    onSubmit={verifyOtpHandleSubmit(handleVerifyOtp)}
                  >
                    <div className="input-group">
                      <div className="input-wrap">
                        <input
                          type="text"
                          name="otp"
                          maxLength="6"
                          onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                          {...verifyOtpRegister("otp", { required: true })}
                        />
                        {verifyOtpErrors.otp?.type === "required" && (
                          <small className="errorSpan">
                            This field is required
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
                              onClick={handleResendOtp}
                            >
                              Resend again
                            </button>
                          </p>
                          <div className="change-phone-number">
                            <button
                              className="form-link mt-3"
                              type="button"
                              onClick={() => {
                                setScreenNo(1);
                              }}
                            >
                              Change Phone number
                            </button>
                          </div>
                        </>
                      ) : (
                        <p>{getTime(otpExp)}</p>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {screenNo === 3 && (
        <div className="row">
          <div className="col-lg-6">
            <div className="model-left-img">
              <div className="modal-heading">
                <h4>Reset Password</h4>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mt-sm-5 mt-2 mt-lg-0">
            <div className="model-right-content">
              <div className="form-wrap">
                <form onSubmit={resetPasswordHandleSubmit(handleResetPassword)}>
                  <div className="input-wrap">
                    <input
                      type={newPass ? "text" : "password"}
                      placeholder="New Password"
                      name="newPassword"
                      {...resetPasswordRegister("newPassword", {
                        required: true,
                      })}
                    />
                    <span className="eye" onClick={() => setNewPass(!newPass)}>
                      <FaEye />
                    </span>
                    {resetPasswordErrors.newPassword?.type === "required" && (
                      <small className="errorSpan">
                        This field is required
                      </small>
                    )}
                  </div>
                  <div className="input-wrap">
                    <input
                      type={confPass ? "text" : "password"}
                      placeholder="Confirm password"
                      name="confirmPassword"
                      {...resetPasswordRegister("confirmPassword", {
                        required: true,
                      })}
                    />
                    <span
                      className="eye"
                      onClick={() => setConfPass(!confPass)}
                    >
                      <FaEye />
                    </span>
                    {resetPasswordErrors.confirmPassword?.type ===
                      "required" && (
                      <small className="errorSpan">
                        This field is required
                      </small>
                    )}
                  </div>

                  <div className="form-btn-wrap mb-4">
                    <button type="submit">Reset Password</button>
                  </div>

                  <div className="link-toggle-wrap">
                    <p>
                      Don't have an account?
                      <button
                        className="form-link"
                        type="button"
                        onClick={toggleRegister}
                      >
                        Register Now!
                      </button>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ForgotPasswordModal;
