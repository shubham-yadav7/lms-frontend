import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../components/helpComponents/Modal";
import { IoCloseOutline } from "react-icons/io5";
import { AiOutlineLeft } from "react-icons/ai";
import notification from "../../helpers/notification";
import { useDispatch, useSelector } from "react-redux";
import { getCookie, getTime, setCookie } from "../../helpers/HandleOtp";

import {
  setSignInShow,
  setSignUpShow,
  setUser,
  setToken,
} from "../../store/authSlice";
import { useForm } from "react-hook-form";
import AuthServices from "../../auth/services/AuthServices";

var timer = null;

const SignUpModal = () => {
  const expiry = process.env.REACT_APP_OTP_EXPIRY;
  const { signUpShow } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    register: userRegister,
    formState: { errors: registerError },
    handleSubmit: handleRegisterSubmit,
    reset: registerReset,
  } = useForm();

  const {
    register: userVerify,
    formState: { errors: verifyError },
    handleSubmit: handleVerifySubmit,
    reset: verifyReset,
  } = useForm();

  const {
    register: userChangeNumber,
    formState: { errors: changeNumberError },
    handleSubmit: handleChangeNumberSubmit,
  } = useForm();

  const [otpExp, setOtpExp] = useState(expiry);
  const [userData, setUserData] = useState();
  const [formError, setFormError] = useState({});
  const [showResendLink, setShowResendLink] = useState(false);
  const [resendTimes, setResendTimes] = useState(0);
  const [screenNo, setScreenNo] = useState(1);

  const toggleAuth = () => {
    dispatch(setSignUpShow(false));
    dispatch(setSignInShow(true));
  };
  const handleHideSignUp = () => {
    dispatch(setSignUpShow(false));
    registerReset();
  };

  const sendOtp = async (data) => {
    try {
      setShowResendLink(false);
      setOtpExp(expiry);
      if (!getCookie("limitReached")) {
        setUserData(data);
        const { message } = await AuthServices.sendOtp(data);
        notification("success", message);
        setScreenNo(2);
        registerReset();
        timer = setInterval(function () {
          setOtpExp((prev) => prev - 1);
        }, 1000);
      } else {
        notification("Your OTP limit is reached.", "warning");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const registerUser = async (data) => {
    try {
      const { learner: user, token } = await AuthServices.register(data);
      notification("success", "Registered Successfully.");
      dispatch(setUser(user));
      dispatch(setToken(token));
      localStorage.setItem("token", token);
      dispatch(setSignUpShow(false));
      registerReset();
    } catch (error) {
      console.error(error);
      notification("error", "Unable to register.");
    }
  };

  const verifyOtpAndRegister = async (data) => {
    try {
      if (!getCookie("limitReached")) {
        userData.otp = data.otp;
        const { learner: user, token } = await AuthServices.register(userData);
        notification("success", "Registered Successfully.");
        dispatch(setUser(user));
        dispatch(setToken(token));
        localStorage.setItem("token", token);
        setOtpExp(60);
        setShowResendLink(false);
        dispatch(setSignUpShow(false));
        verifyReset();
      }
    } catch (error) {
      console.log(error);
      notification("error", "Unable to register.");
    }
  };

  const handleChangeNumber = async (data) => {
    userData.phone = data.phone;
    sendOtp(userData);
  };

  const handleResend = (e) => {
    if (getCookie("limitReached")) {
      notification("warning", "Resend otp link limit has been reached!");
      setResendTimes(0);
    } else {
      if (resendTimes < 3) {
        sendOtp(userData);
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
    <Modal show={signUpShow} onHide={handleHideSignUp}>
      {screenNo === 1 && (
        <div className="row align-items-lg-center">
          <div className="col-lg-5">
            <div className="model-left-img">
              <div className="modal-heading">
                <h4>Sign up</h4>
              </div>
              <figure className="mb-0 d-none d-lg-block">
                <img src="/assets/images/common/sign-up.svg" alt="" />
              </figure>
            </div>
          </div>
          <div className="col-lg-7 mt-sm-4 mt-2 mt-lg-0">
            <div className="model-right-content sign-up-modal">
              <div className="form-wrap">
                <form onSubmit={handleRegisterSubmit(registerUser)}>
                  <div className="input-group">
                    <div className="input-wrap">
                      <input
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        {...userRegister("firstName", { required: true })}
                      />
                      {registerError.firstName?.type === "required" && (
                        <small className="errorSpan">
                          This field is required
                        </small>
                      )}
                    </div>
                    <div className="input-wrap">
                      <input
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        {...userRegister("lastName", { required: true })}
                      />
                      {registerError.lastName?.type === "required" && (
                        <small className="errorSpan">
                          This field is required
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="input-group">
                    <div className="input-wrap">
                      <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        {...userRegister("email", { required: true })}
                      />
                      {registerError.email?.type === "required" && (
                        <small className="errorSpan">
                          This field is required
                        </small>
                      )}
                    </div>
                    <div className="input-wrap">
                      <input
                        type="tel"
                        placeholder="Phone "
                        name="phone"
                        {...userRegister("phone", { required: true })}
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        maxLength={10}
                      />
                      {registerError.phone?.type === "required" && (
                        <small className="errorSpan">
                          This field is required
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="input-group">
                    <div className="input-wrap mb-sm-4">
                      <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        {...userRegister("password", { required: true })}
                      />
                      {registerError.password?.type === "required" && (
                        <small className="errorSpan">
                          This field is required
                        </small>
                      )}
                    </div>
                    <div className="input-wrap mb-4">
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        {...userRegister("confirmPassword", { required: true })}
                      />
                      {registerError.confirmPassword?.type === "required" && (
                        <small className="errorSpan">
                          This field is required
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="checkbox-wrap mb-3">
                    <input
                      type="checkbox"
                      id="privacyPolicy"
                      name="privacyPolicy"
                      {...userRegister("privacyPolicy", { required: true })}
                    />
                    <label htmlFor="privacyPolicy">
                      Accept the terms and
                      <Link
                        className="form-link ml-0"
                        to="/privacy-policy"
                        target="_blank"
                      >
                        Privacy Policy
                      </Link>
                    </label>
                    {registerError.privacyPolicy?.type === "required" && (
                      <small className="errorSpan">
                        This field is required
                      </small>
                    )}
                  </div>
                  <div className="form-btn-wrap mb-sm-4 mb-2 mt-4">
                    <button type="submit">Register now</button>
                  </div>
                  <div className="link-toggle-wrap">
                    <p>
                      Already have an account?
                      <button
                        className="form-link"
                        type="button"
                        onClick={toggleAuth}
                      >
                        Log in
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
                    onSubmit={handleVerifySubmit(verifyOtpAndRegister)}
                  >
                    <div className="input-group">
                      <div className="input-wrap">
                        <input
                          type="text"
                          name="otp"
                          {...userVerify("otp", { required: true })}
                          maxLength="6"
                          onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                        />
                        {verifyError.otp?.type === "required" && (
                          <small className="errorSpan">
                            Please provide OTP.
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
                              onClick={handleResend}
                            >
                              Resend again
                            </button>
                          </p>
                          <div className="change-phone-number">
                            <button
                              className="form-link mt-3"
                              type="button"
                              onClick={() => {
                                setScreenNo(3);
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
        <div className="row align-items-lg-center">
          <div className="col-lg-5">
            <div className="model-left-img">
              <div className="modal-heading">
                <h4>Edit Phone number</h4>
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
                  <div className="screen-heading mb-4">
                    <h2>Edit Phone number</h2>
                  </div>
                  <form onSubmit={handleChangeNumberSubmit(handleChangeNumber)}>
                    <div className="input-wrap">
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        {...userChangeNumber("phone", { required: true })}
                      />
                      {changeNumberError.phone?.type === "required" && (
                        <small className="errorSpan">
                          This field is required.
                        </small>
                      )}
                    </div>
                    <div className="form-btn-wrap mb-sm-4 mb-2">
                      <button type="submit">Send OTP</button>
                    </div>
                    {formError.error && (
                      <div className="error-message-toast">
                        <span>{formError.error}</span>
                        <IoCloseOutline onClick={() => setFormError({})} />
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default SignUpModal;
