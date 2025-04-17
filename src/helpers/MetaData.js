import { Helmet } from "react-helmet-async";

const MetaData = ({ title, meta }) => {
  return (
    <Helmet prioritizeSeoTags>
      {/* TODO: Set Meta tags here */}
      <title>{title}</title>
    </Helmet>
  );
};

export default MetaData;
