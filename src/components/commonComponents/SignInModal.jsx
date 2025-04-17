import React from "react";
import Modal from "../helpComponents/Modal";
import AuthServices from "../../auth/services/AuthServices";
import "react-toastify/dist/ReactToastify.css";
import notification from "../../helpers/notification";
import { useDispatch, useSelector } from "react-redux";
import {
  setSignInShow,
  setSignUpShow,
  setForgotPasswordShow,
  setUser,
  setToken,
} from "../../store/authSlice";
import { useForm } from "react-hook-form";

const SignInModal = () => {
  const { signInShow } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const toggleAuth = () => {
    dispatch(setSignUpShow(true));
    dispatch(setSignInShow(false));
  };
  const forgotPass = () => {
    dispatch(setSignInShow(false));
    dispatch(setForgotPasswordShow(true));
  };
  const loginSubmit = async (data) => {
    try {
      const { learner: user, token } = await AuthServices.login(data);

      notification("success", "Logged In Successfully.");
      dispatch(setUser(user));
      dispatch(setToken(token));
      localStorage.setItem("token", token);
      dispatch(setSignInShow(false));
      reset();
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

  return (
    <Modal show={signInShow} onHide={() => dispatch(setSignInShow(false))}>
      <div className="row align-items-lg-center">
        <div className="col-lg-6">
          <div className="model-left-img">
            <div className="modal-heading">
              <h4>Sign in</h4>
            </div>
            <figure className="mb-0 d-none d-lg-block">
              <img src="/assets/images/common/sign-in.svg" alt="" />
            </figure>
          </div>
        </div>
        <div className="col-lg-6 mt-sm-5 mt-2 mt-lg-0">
          <figure style={{ textAlign: "center", marginBottom: "40px" }}>
            <img
              src="/assets/images/homepage/brand_logo.png"
              alt="Logo"
              width={200}
            />
          </figure>
          <div className="model-right-content">
            <div className="form-wrap">
              <form onSubmit={handleSubmit(loginSubmit)}>
                <div className="input-wrap">
                  <input
                    type="text"
                    placeholder="Email or 10 Digit Mobile No"
                    name="email"
                    {...register("email", { required: true })}
                  />
                  {errors.email?.type === "required" && (
                    <small className="errorSpan">This field is required</small>
                  )}
                </div>
                <div className="input-wrap mb-4">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    {...register("password", { required: true })}
                  />
                  {errors.password?.type === "required" && (
                    <small className="errorSpan">This field is required</small>
                  )}
                </div>
                <div className="checkbox-wrap hasSibling mb-3">
                  <div className="d-flex align-items-center">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      {...register("rememberMe")}
                    />
                    <label htmlFor="rememberMe">Remember me</label>
                  </div>
                  <button type="button" onClick={forgotPass}>
                    Forgot password?
                  </button>
                </div>
                <div className="form-btn-wrap mb-4">
                  <button type="submit">Login</button>
                </div>

                <div className="link-toggle-wrap">
                  <p>
                    Not registered?
                    <button
                      className="form-link"
                      type="button"
                      onClick={toggleAuth}
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SignInModal;
