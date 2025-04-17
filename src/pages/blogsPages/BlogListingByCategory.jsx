import React, { lazy, useEffect, useState } from "react";
import notification from "../../helpers/notification";
import BlogServices from "../../auth/services/BlogServices";
import ReactPaginate from "react-paginate";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { useParams } from "react-router-dom";

const PageHeader = lazy(() =>
  import("../../components/commonComponents/PageHeader")
);
const BlogsCardItem = lazy(() =>
  import("../../components/blogComponents/BlogsCardItem.jsx")
);

const BlogListingByCategory = () => {
  const { slug } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState(null);
  const [query, setQuery] = useState({
    page: 1,
    perPage: 0,
    total: 0,
  });

  const handlePageClick = ({ selected }) => {
    setQuery((prev) => ({
      ...prev,
      page: Number(selected) + 1,
    }));
  };

  useEffect(() => {
    // Adding 👇 here for missing dependency warning
    const getAllBlogs = async () => {
      try {
        const { blogs, page, perPage, total } = await BlogServices.getAllBlogs({
          page: query.page,
          tag: "",
          category: slug,
        });
        setBlogs(blogs);
        setQuery((prev) => ({
          ...prev,
          page,
          perPage,
          total,
        }));
      } catch (error) {
        console.log(error);
        notification(
          "error",
          error.response ? error.response.data.message : "Something went wrong."
        );
      }
    };

    const getCategory = async () => {
      try {
        const { category } = await BlogServices.getCategory(slug);
        setCategory(category);
      } catch (error) {
        console.log(error);
        notification(
          "error",
          error.response ? error.response.data.message : "Something went wrong."
        );
      }
    };

    getAllBlogs();
    getCategory();
  }, [query.page, slug]);

  return (
    <>
      <PageHeader type={`Blogs with category ${category?.title}`} />
      <section className="py-5">
        <div className="container">
          {blogs?.length > 0 ? (
            <div className="row">
              {blogs?.map((blog, i) => (
                <div className="col-lg-4 col-md-6 my-3" key={i}>
                  <BlogsCardItem blogDetails={blog} />
                </div>
              ))}
            </div>
          ) : (
            <p className="no-item _center">No Blogs found</p>
          )}
          {query.total > 1 && (
            <div className="d-flex justify-content-center align-items-center mt-5">
              <ReactPaginate
                breakLabel="..."
                nextLabel={<AiOutlineRight />}
                onPageChange={handlePageClick}
                pageRangeDisplayed={query.perPage}
                pageCount={query?.total}
                previousLabel={<AiOutlineLeft />}
                className="pagination"
                renderOnZeroPageCount={null}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogListingByCategory;
