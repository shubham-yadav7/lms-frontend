import React, { useEffect, useState } from "react";
import PageHeader from "../../components/commonComponents/PageHeader";
import { Link, useParams } from "react-router-dom";
import notification from "../../helpers/notification";
import BlogServices from "../../auth/services/BlogServices";
import { AiOutlineDownload } from "react-icons/ai";
import { FaFacebookF, FaTwitter } from "react-icons/fa";

const BlogDetails = () => {
  const [blog, setBlog] = useState();
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [courseCategories, setCourseCategories] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    // Function write inside useEffect for missing dependency warning
    const getBlogDetails = async () => {
      try {
        const { blog, categories, courseCategories, tags } =
          await BlogServices.getBlogDetails(slug);
        setBlog(blog);
        setTags(tags);
        setCategories(categories);
        setCourseCategories(courseCategories);
      } catch (error) {
        console.log(error);
        notification(
          "error",
          error.response ? error.response.data.message : "Something went wrong."
        );
      }
    };

    if (slug) {
      getBlogDetails();
    }
  }, [slug]);

  return (
    <>
      <PageHeader type="details" />
      <section className="py-5 blog-details">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="blog-content">
                <div className="blog-mainImg">
                  <figure className="mb-0">
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}/uploads/blog/thumbnail/${blog?.thumbImg}`}
                      alt=""
                    />
                  </figure>
                  <span>{blog?.category?.title}</span>
                </div>
                <div className="blog-quote">
                  <div className="quote-icon">
                    <span></span>
                    <span></span>
                  </div>
                  {<h4>{blog?.quote}</h4>}
                </div>
                <div
                  className="blog-info-wrap"
                  dangerouslySetInnerHTML={{ __html: blog?.descp }}
                ></div>
                <div className="download-links-container">
                  {blog?.documents?.map((d, i) => (
                    <li className="download-doc" key={i}>
                      <a
                        className="custom-btn filled"
                        href={`${process.env.REACT_APP_BACKEND_URL}/uploads/blog/documents/${d.documentFile}`}
                        download
                        target="_blank"
                        rel="noreferrer"
                      >
                        {d.name} <AiOutlineDownload />
                      </a>
                    </li>
                  ))}
                </div>
                <div className="social-links-wrap">
                  <div className="content-tag-wrap">
                    <p>Tags:</p>
                    {blog?.tags?.map((tag, i) => (
                      <Link to={`/blogs/tag/${tag.slug}`} key={i}>
                        {tag.title}
                      </Link>
                    ))}
                  </div>
                  <div className="social-links">
                    <a
                      className="fb"
                      href={`https://www.facebook.com/sharer/sharer.php?u=${process.env.REACT_APP_BACKEND_URL}/blog/${blog?.slug}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {" "}
                      <FaFacebookF />{" "}
                    </a>
                    <a
                      className="twitter"
                      href={`https://twitter.com/intent/tweet?text=${process.env.REACT_APP_BACKEND_URL}/blog/${blog?.slug}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {" "}
                      <FaTwitter />{" "}
                    </a>
                    {/* <a className='quora' href={'FIXME:'}> <FaPinterestP/> </a> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mt-5 mt-lg-0">
              <div className="blog-sidebar">
                <div className="popular-post">
                  <h4 className="sidebar-title">Course Categories</h4>
                  <div className="p-post-card-wrap">
                    <div className="b-categories-wrap">
                      <ul>
                        {courseCategories?.map((item, i) => (
                          <li key={i}>
                            <Link to={`/courses/category/${item?.slug}`}>
                              {item?.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="blog-categories">
                  <h4 className="sidebar-title">Blogs Categories</h4>
                  <div className="b-categories-wrap">
                    <ul>
                      {categories?.map((cat, i) => (
                        <li key={i}>
                          <Link to={`/blog/category/${cat.slug}`}>
                            {cat.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="blog-tags">
                  <h4 className="sidebar-title">Tags</h4>
                  <div className="blog-tags-wrap">
                    {tags.map((tag, i) => (
                      <Link to={`/blogs/tag/${tag.slug}`} key={i}>
                        {tag.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetails;
