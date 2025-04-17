import React, { useEffect, useState } from "react";
import notification from "../../helpers/notification";
import PrimaryService from "../../auth/services/PrimaryServices";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Fancybox from "../../helpers/FancyBox";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const Banner = () => {
  const [banners, setBanners] = useState([]);

  const getAllBanners = async () => {
    try {
      const { banners } = await PrimaryService.getAllBanners("website");
      setBanners(banners);
    } catch (error) {
      console.log(error);
      // notification(
      //   "error",
      //   error.response
      //     ? error.response.data.message.split(":")[0]
      //     : "Something went wrong."
      // );
    }
  };

  useEffect(() => {
    getAllBanners();
  }, []);

  return (
    <section className="banner py-0">
      <Splide
        className="banner-slider"
        options={{
          type: "loop",
          arrows: false,
          gap: 5,
          interval: 8000,
          autoplay: true,
          pauseOnHover: true,
          autoplaySpeed: 100,
          speed: 1000,
        }}
      >
        <SplideSlide>
          <div className="item">
            <img
              className="banner-bg-img"
              src={`/assets/images/homepage/banner/LMS-scaled-1.webp`}
              alt=""
            />
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className="item">
            <img
              className="banner-bg-img"
              src={`/assets/images/homepage/banner/Learning-Management-Systems-Cover.webp`}
              alt=""
            />
          </div>
        </SplideSlide>
      </Splide>
    </section>
  );
};

export default Banner;
