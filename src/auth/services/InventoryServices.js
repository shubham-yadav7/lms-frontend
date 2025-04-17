import fetch from "../FetchInterceptor";

let InventoryServices = {};

InventoryServices.addToCart = (data) => {
  return fetch({
    url: `/inventory/add-to-cart`,
    method: "POST",
    data,
  });
};

InventoryServices.removeFromCart = (id) => {
  return fetch({
    url: `/inventory/remove-from-cart`,
    method: "POST",
    data: {id},
  });
};

InventoryServices.fetchCart = (coupon) => {
  return fetch({
    url: `/inventory/cart?coupon=${coupon}`,
    method: "GET",
  });
};

InventoryServices.fetchCoupons = () => {
  return fetch({
    url: `/inventory/fetch-coupons`,
    method: "GET",
  });
};

export default InventoryServices;
