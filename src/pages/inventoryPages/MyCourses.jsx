import React, { useEffect, useState } from "react";
import { BsPatchCheckFill } from "react-icons/bs";
import PaymentSummary from "../../components/inventoryComponents/PaymentSummary.jsx";
import InventoryServices from "../../auth/services/InventoryServices";
import notification from "../../helpers/notification";
import CartItem from "../../components/inventoryComponents/CartItem.jsx";
import moment from "moment";
import PageBreadcrumb from "../../components/commonComponents/PageBreadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, fetchCoupons, setCoupon, setIsFetchCoupon } from "../../store/inventorySlice.js";
import MyCourseCard from "../../components/commonComponents/MyCourseCard.jsx";

const MyCourses = () => {
  const { cart, coupons, isFetchCoupon, coupon } = useSelector(
    (state) => state.inventory
  );
const enrolledCourses =
  useSelector((state) => state.auth.user?.enrolledCourses) || [];

  const dispatch = useDispatch();

  const [selectedCoupon, setSelectedCoupon] = useState();
  const [couponText, setCouponText] = useState('')

  const handleCoupon = async(couponCode) => {
    setCouponText(couponCode.code);
    await applyCoupon(couponCode.code)
  };

  const removeFromCart = async (id) => {
    try {
      const {message} = await InventoryServices.removeFromCart(id)
      notification('success', message);
      dispatch(fetchCart())

    } catch (error) {
      console.log(error)
      notification('error', error.response ? error.response.data.message : 'something went wrong.')
    }
  }

  const applyCoupon = async (couponCode = '') => {
    try {
      let enteredCode = couponCode;
      if(!enteredCode || enteredCode === '') {
        dispatch(setCoupon(''))
        dispatch(fetchCart())
        return;
        // return notification('warning', 'Please enter coupon code.')
      }
      
      let matchedCoupon = coupons.find(({code}) => code === enteredCode)
      if(!matchedCoupon) {
        dispatch(setCoupon(''))
        return notification('warning', 'Coupon is invalid.')
      }
      dispatch(setCoupon(matchedCoupon._id))
      dispatch(fetchCart())

    } catch (error) {
      console.log(error)
      notification('error', error.response ? error.response.data.message : 'Something went wrong.')
    }
  }

//   console.log(user);
  console.log(enrolledCourses)



  useEffect(() => {
    if (!isFetchCoupon) {
      dispatch(fetchCoupons());
      dispatch(setIsFetchCoupon(true));
    }
  }, [dispatch,isFetchCoupon]);

  return (
    <>
      <PageBreadcrumb pageTitle="My Courses" currentPage="My Courses" />
      <section className="cart pt-5">
        <div className="container">
            <div className="row">
    
          {enrolledCourses?.map((course, i) => (
            <div key={i} className="col-lg-4 col-md-6 mt-5">
              <MyCourseCard course={course} />
            </div>
          ))}
            </div>
        </div>
      </section>
    </>
  );
};

export default MyCourses;
