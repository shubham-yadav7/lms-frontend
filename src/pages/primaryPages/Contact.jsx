import React, { lazy } from "react";
import { BsClock } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import { SiGmail } from "react-icons/si";
import { GoLocation } from "react-icons/go";
import notification from "../../helpers/notification";
import { useForm } from "react-hook-form";
import PrimaryService from "../../auth/services/PrimaryServices";

const PageHeader = lazy(() =>
  import("../../components/commonComponents/PageHeader")
);

const Contact = () => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  const handleContactForm = async (data) => {
    try {
      const { message } = await PrimaryService.contactRequest(data);
      notification("success", message);
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
    <>
      <PageHeader type="Contact Us" />
      <section className="contact-us">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mx-auto">
              <div className="heading center">
                <span className="tag">NEED HELP?</span>
                <h2>Get In Touch With us</h2>
              </div>
            </div>
          </div>
          <div className="contact-info-card-wrap mt-5">
            <div className="row">
              <div className="col-xl-3 col-md-6 mb-xl-0 mb-4">
                <div className="contact-info-card">
                  <div className="contact-info-icon purple">
                    <FiPhoneCall />
                  </div>
                  <div className="contact-info-title">
                    <h4>Ring Us Up</h4>
                  </div>
                  <div className="contact-info-text">
                    <p>Sales & Seller Support</p>
                    <a href="tel:+918591597259">+91 85915 97259</a>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6 mb-xl-0 mb-4">
                <div className="contact-info-card">
                  <div className="contact-info-icon orange">
                    <SiGmail />
                  </div>
                  <div className="contact-info-title">
                    <h4>Write To Us</h4>
                  </div>
                  <div className="contact-info-text">
                    <p>Email Support</p>
                    <a href="mailto:info@one-lms.com">info@one-lms.com</a>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6 mb-md-0 mb-4">
                <div className="contact-info-card">
                  <div className="contact-info-icon blue">
                    <BsClock />
                  </div>
                  <div className="contact-info-title">
                    <h4>Workings Hours</h4>
                  </div>
                  <div className="contact-info-text">
                    <p>Monday to Saturday</p>
                    <p>11:00 AM to 07:00 PM</p>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6 ">
                <div className="contact-info-card">
                  <div className="contact-info-icon red">
                    <GoLocation />
                  </div>
                  <div className="contact-info-title">
                    <h4>Address</h4>
                  </div>
                  <div className="contact-info-text">
                    <p>
                      R.No 103, C-Wing, Marathon Complex, Karve Nagar,
                      Kanjurmarg - East, Mumbai - 400042, State : Maharashtra,
                      Country : India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="contact-form dark">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mt-5 mt-lg-0 order-1 order-lg-0">
              <div className="how-to-download-wrap">
                <iframe
                  src="https://www.youtube.com/embed/pvspuc5bits"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <div className="col-lg-6 order-0 order-lg-1">
              <div className="contact-form-wrap">
                <div className="heading mb-3">
                  <span className="tag">CONTACT US</span>
                  <h2 className="mt-1">Send Us A Message</h2>
                </div>
                <form onSubmit={handleSubmit(handleContactForm)}>
                  <div className="input-group">
                    <div className="input-wrap mb-4">
                      <input
                        type="text"
                        placeholder="Name"
                        {...register("name", { required: true })}
                      />
                      {errors?.name && (
                        <span className="errorSpan"> {errors?.name} </span>
                      )}
                    </div>
                    <div className="input-wrap mb-4">
                      <input
                        type="email"
                        placeholder="Email"
                        {...register("email", { required: true })}
                      />
                      {errors?.email && (
                        <span className="errorSpan"> {errors?.email} </span>
                      )}
                    </div>
                  </div>
                  <div className="input-group">
                    <div className="input-wrap mb-4 w-100">
                      <input
                        type="tel"
                        placeholder="Contact Number"
                        {...register("number", { required: true })}
                        maxLength={10}
                        minLength={10}
                      />
                      {errors?.number && (
                        <span className="errorSpan"> {errors?.number} </span>
                      )}
                    </div>
                  </div>
                  <div className="input-group">
                    <div className="input-wrap mb-4 w-100">
                      <input
                        type="text"
                        placeholder="Subject"
                        {...register("subject")}
                      />
                    </div>
                  </div>
                  <div className="input-group">
                    <div className="input-wrap mb-4 w-100">
                      <textarea
                        id="description"
                        placeholder="Your Comment"
                        {...register("description", { required: true })}
                      ></textarea>
                    </div>
                  </div>
                  <div className="form-btn-wrap">
                    <button type="submit">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="contact-map py-0">
        <iframe
          title="location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.5492412412145!2d72.92642031532272!3d19.127420755323666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c78e80e9b493%3A0xbeda55dbe61c51c5!2sShree%20Swami%20Samartha%20Society%20%2C%20Marathon%20Complex!5e0!3m2!1sen!2sin!4v1652422357255!5m2!1sen!2sin"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </>
  );
};

export default Contact;
