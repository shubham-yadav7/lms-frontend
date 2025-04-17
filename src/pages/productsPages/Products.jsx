import React, { useEffect, useState, useRef } from "react";
import ProductServices from "../../auth/services/ProductServices.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/productSlice.js";
import ProductFilter from "../../components/productComponents/ProductFilter.jsx";
import ProductListing from "../../components/productComponents/ProductListing.jsx";
import PageHeader from "../../components/commonComponents/PageHeader.jsx";

const Products = () => {
  const {
    filterData,
    paginate: { page, perPage, total },
  } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const productsRef = useRef();
  const myRef = useRef();
  const executeScroll = () => myRef.current.scrollIntoView();

  useEffect(() => {
    dispatch(fetchProducts({ ...filterData, page, type: "learner" }));
  }, [dispatch, filterData, page]);

  return (
    <>
      <PageHeader type="All Products" />
      <section className="filter">
        <ProductFilter />
        <ProductListing />
      </section>
    </>
  );
};

export default Products;
