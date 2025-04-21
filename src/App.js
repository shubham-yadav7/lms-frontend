import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { lazy } from "react";

import Header from "./components/commonComponents/Header";
import Footer from "./components/commonComponents/Footer";

const ProtectedRoute = lazy(()=> import('./middleware/ProtectedRoute')) 

const Home = lazy(() => import("./pages/primaryPages/Home"));
const Contact = lazy(() => import("./pages/primaryPages/Contact"));
const About = lazy(() => import("./pages/primaryPages/About"));
const FAQ = lazy(() => import("./pages/primaryPages/FAQ"));
const ErrorPage = lazy(() => import("./pages/primaryPages/ErrorPage"));

const Blogs = lazy(() => import("./pages/blogsPages/Blogs"));
const BlogDetails = lazy(() => import("./pages/blogsPages/BlogDetails"));
const BlogListingByTag = lazy(() => import("./pages/blogsPages/BlogListingByTag"));
const BlogListingByCategory = lazy(() => import("./pages/blogsPages/BlogListingByCategory"));

const Courses = lazy(() => import("./pages/coursesPages/Courses.jsx"));
const CourseDetails = lazy(() => import("./pages/coursesPages/CourseDetails.jsx"));
const CoursesByCategory = lazy(() => import("./pages/coursesPages/CoursesByCategory.jsx"));

const BundleCourses = lazy(() => import("./pages/bundleCoursePages/BundleCourses.jsx"));
const BundleDetails = lazy(() => import("./pages/bundleCoursePages/BundleDetails.jsx"));

const Products = lazy(() => import("./pages/productsPages/Products.jsx"));
const ProductDetails = lazy(() => import("./pages/productsPages/ProductDetails.jsx"));

const HelpListing = lazy(() => import("./pages/HelpPages/HelpListing.jsx"));
const HelpDetails = lazy(() => import("./pages/HelpPages/HelpDetails.jsx"));

const UserProfile = lazy(() => import('./pages/userPages/UserProfile.jsx'))

const Cart = lazy(()=> import('./pages/inventoryPages/Cart.jsx'))
const MyCourses = lazy(()=> import('./pages/inventoryPages/MyCourses.jsx'))
const Checkout = lazy(()=> import('./pages/inventoryPages/Checkout.jsx'))

const App = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Routes>
            {/* Primary Routes */}
            <Route exact path="/" element={<Home />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/frequently-asked-questions" element={<FAQ />} />

            {/* Blog Routes */}
            <Route exact path="/blogs" element={<Blogs />}></Route>
            <Route exact path="/blog/:slug" element={<BlogDetails />}></Route>
            <Route exact path="/blogs/tag/:slug" element={<BlogListingByTag />} ></Route>
            <Route exact path="/blog/category/:slug" element={<BlogListingByCategory />} ></Route>

            {/* Course Routes */}
            <Route exact path="/courses" element={<Courses />}></Route>
            <Route exact path="/course/:slug" element={<CourseDetails />} ></Route>
            <Route exact path="/courses/category/:slug" element={<CoursesByCategory />} ></Route>

            {/* Bundle Course Routes */}
            <Route exact path="/bundle-courses" element={<BundleCourses />}></Route>
            <Route exact path="/bundle/:slug" element={<BundleDetails />} ></Route>

            {/* Products Routes */}
            <Route exact path="/products" element={<Products />}></Route>
            <Route exact path="/product/:slug" element={<ProductDetails />} ></Route>

            {/* Help Routes */}
            <Route exact path="/help" element={<HelpListing />}></Route>
            <Route exact path="/help/:slug" element={<HelpDetails />}></Route>

            {/* <Route exact path='/my-courses' element={<ProtectedRoute><MyLearning /></ProtectedRoute>}></Route> */}

            {/* Auth Routes */}
            {/* <Route exact path="/user-dashboard" element={<ProtectedRoute><UserDashboard/></ProtectedRoute>}></Route>
            <Route exact path='/my-courses' element={<ProtectedRoute><MyLearning /></ProtectedRoute>}></Route>
            <Route exact path="/notifications" element={<UserNotification/>}></Route>
            <Route exact path="/my-purchase" element={<ProtectedRoute><MyPurchase/></ProtectedRoute>}></Route> */}
            <Route exact path="/user-profile" element={<ProtectedRoute><UserProfile/></ProtectedRoute>}></Route>

            {/* Inventory Routes */}
            <Route exact path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>}></Route>
            <Route exact path='/my-courses' element={<ProtectedRoute><MyCourses /></ProtectedRoute>}></Route>
            <Route exact path='/checkout' element={<ProtectedRoute><Checkout /></ProtectedRoute>}></Route>

            <Route exact path="*" element={<ErrorPage />}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
