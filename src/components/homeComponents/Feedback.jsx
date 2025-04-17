import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Fancybox from "../../helpers/FancyBox";
import { BsFillPlayCircleFill } from "react-icons/bs";
import notification from "../../helpers/notification";
import PrimaryService from "../../auth/services/PrimaryServices";

const Feedback = () => {
  const [videos, setVideos] = useState([]);

  const feedBackVideos = async () => {
    try {
      const { feedbackVideos } = await PrimaryService.feedBackVideos();
      setVideos(feedbackVideos);
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

  useEffect(() => {
    feedBackVideos();
  }, []);

  return (
    <section className="feedback">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 mx-auto">
            <div className="heading center white">
              <span className="tag">Keep Your Skills</span>
              <h2>What Student's Says about our Courses</h2>
            </div>
          </div>
        </div>
        <div className="feedback-slider-wrap mt-5">
          <Splide
            className="feedback-slider"
            options={{
              type: "loop",
              arrows: false,
              perPage: 3,
              gap: 30,
              snap: true,
              breakpoints: {
                0: { perPage: 1 },
                760: { perPage: 1 },
                991: { perPage: 2 },
              },
            }}
          >
            {videos?.map((v, i) => (
              <SplideSlide key={i}>
                <div className="item">
                  <Fancybox>
                    <a
                      data-fancybox="video"
                      href={`https://www.youtube.com/watch?v=${v.videoId}`}
                    >
                      <span className="overlay">
                        <BsFillPlayCircleFill className="wave" />
                      </span>
                      <figure className="mb-0">
                        <img
                          src={`https://img.youtube.com/vi/${v.videoId}/hqdefault.jpg`}
                          alt=""
                        />
                      </figure>
                    </a>
                  </Fancybox>
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
      <div className="moving-elem filled-circle">
        <img
          className="toLeft"
          src="assets/images/homepage/feedback/filled-circ.png"
          alt=""
        />
      </div>
      <div className="moving-elem first">
        <img
          className="toRight"
          src="assets/images/homepage/feedback/outline-circ.png"
          alt=""
        />
      </div>
      <div className="moving-elem second">
        <img
          className="toLeft"
          src="assets/images/homepage/feedback/outline-circ.png"
          alt=""
        />
      </div>
      <div className="moving-elem third">
        <img
          className="toRight"
          src="assets/images/homepage/feedback/outline-circ.png"
          alt=""
        />
      </div>
    </section>
  );
};

export default Feedback;
