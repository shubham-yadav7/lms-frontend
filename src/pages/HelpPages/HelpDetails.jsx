import { useEffect, useState } from "react";
import PageHeader from "../../components/commonComponents/PageHeader";
import YouTube from "react-youtube";
import HelpServices from "../../auth/services/HelpServices";
import notification from "../../helpers/notification";
import { useParams } from "react-router-dom";

const HelpDetails = () => {
  const { slug } = useParams();
  const [helpDetails, setHelpDetails] = useState([]);

  useEffect(() => {
    const getHelpDetails = async () => {
      try {
        const { help } = await HelpServices.getHelpDetails(slug);
        setHelpDetails(help);
      } catch (error) {
        console.log(error);
        notification(
          "error",
          error.response ? error.response.data.message : "Something went wrong."
        );
      }
    };

    if (slug) {
      getHelpDetails();
    }
  }, [slug]);

  return (
    <>
      <PageHeader type={helpDetails?.title} />
      <section className="help pt-5">
        <div className="container">
          <div className="help-video-container">
            <div className="help-title mb-4">
              <h2>{helpDetails.title}</h2>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="help-poster">
                  <figure className="mb-0">
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}/uploads/help/posterImage/${helpDetails?.posterImage}`}
                      alt=""
                    />
                  </figure>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="help-video">
                  <YouTube
                    videoId={helpDetails?.videoLink}
                    iframeClassName="youtube-iframe"
                    opts={{ height: "310", width: "100%" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className="help-description mt-5"
            dangerouslySetInnerHTML={{ __html: helpDetails?.description }}
          ></div>
        </div>
      </section>
    </>
  );
};

export default HelpDetails;
