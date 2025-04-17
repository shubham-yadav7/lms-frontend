import React, { useEffect, useState } from "react";
import PageHeader from "../../components/commonComponents/PageHeader";
import notification from "../../helpers/notification";
import HelpCard from "../../components/commonComponents/HelpCard.jsx";
import HelpServices from "../../auth/services/HelpServices.js";

const HelpListing = () => {
  const [help, setHelp] = useState([]);
  const [paginate, setPaginate] = useState({
    page: 1,
    perPage: 0,
    total: 0,
    totalHelps: 0,
  });

  useEffect(() => {
    const fetchHelps = async () => {
      try {
        const { page, perPage, total, helps, totalHelps } =
          await HelpServices.fetchHelp({
            page: paginate.page,
            type: "learner",
          });

        setHelp(helps);
        setPaginate((prev) => ({
          ...prev,
          page,
          perPage,
          total,
          totalHelps,
        }));
      } catch (error) {
        console.log(error);
        notification(
          "error",
          error.response ? error.response.data.message : "Something went wrong."
        );
      }
    };

    fetchHelps();
  }, [paginate.page]);

  return (
    <>
      <PageHeader type="Help" />
      <section className="help-listing">
        <div className="container">
          <div className="row">
            {help?.map((item, i) => (
              <div className="col-lg-4 col-md-6" key={i}>
                <HelpCard helpDetails={item} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HelpListing;
