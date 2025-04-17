import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import ProductServices from "../../auth/services/ProductServices";
import ProductPageHeader from "../../components/productComponents/ProductPageHeader";
import ProductDescription from "../../components/productComponents/ProductDescription";
import notification from "../../helpers/notification";

const ProductDetails = () => {
  const { slug } = useParams();
  const [reviewsCount, setReviewsCount] = useState([]); //Pending TODO:

  const [productDetails, setProductDetails] = useState();

  const myRef = useRef();
  const executeScroll = () => myRef.current.scrollIntoView();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { product } = await ProductServices.fetchProductBySlug(slug);
        setProductDetails(product);
      } catch (error) {
        console.log(error);
        notification(
          "error",
          error.response ? error.response.data.message : "Something went wrong."
        );
      }
    };

    fetchProduct();
  }, [slug]);

  return (
    <>
      <ProductPageHeader
        executeScroll={executeScroll}
        details={productDetails}
        reviewsCount={reviewsCount}
      />
      <ProductDescription
        reviewsCount={reviewsCount}
        details={productDetails}
        myRef={myRef}
      />
    </>
  );
};

export default ProductDetails;
