import React from "react";
import { BiPlus, BiMinus } from "react-icons/bi";
import { RiLock2Line, RiYoutubeLine } from "react-icons/ri";
import { BsFiletypePdf, BsFileText } from "react-icons/bs";

const CourseContentList = ({ content, id, selected, setSelected }) => {
  const toggle = (id) => {
    if (selected === id) {
      return setSelected(null);
    }
    setSelected(id);
  };

  return (
    <>
      <li className="content-toggle collapse">
        <button className="collapse-btn" onClick={() => toggle(id)}>
          <span> {selected === id ? <BiMinus /> : <BiPlus />} </span>
          {content?.title}
        </button>
        <div className={`collapse-content ${selected === id ? "active" : ""}`}>
          <ol>
            {content?.lessons?.map((lesson, i) => (
              <li key={i}>
                <div className="content-title d-flex align-content-center">
                  {lesson.contentType === "Text" ? (
                    <>
                      {lesson.freeLesion ? (
                        <>
                          {/* TODO: lesson text content in modal */}
                          <BsFileText color="#1ebb76" className="m-0 mr-1" />
                          <span className="mt-1">{lesson?.title}</span>
                        </>
                      ) : (
                        <>
                          <RiLock2Line />
                          <span className="mt-1">{lesson?.title}</span>
                        </>
                      )}
                    </>
                  ) : lesson.contentType === "Video" ? (
                    <>
                      {lesson.platform === "Youtube" ? (
                        <>
                          {lesson.freeLesion ? (
                            <>
                              <a
                                href={`https://www.youtube.com/embed/${lesson?.link}`}
                                data-fancybox={lesson?.platform}
                              >
                                <RiYoutubeLine
                                  color="#1ebb76"
                                  className="m-0 mr-1"
                                />
                                <span className="mt-1">{lesson?.title}</span>
                              </a>
                            </>
                          ) : (
                            <>
                              <RiLock2Line />
                              <span className="mt-1">{lesson?.title}</span>
                            </>
                          )}
                        </>
                      ) : lesson.platform === "Vimeo" ? (
                        <>
                          {lesson.freeLesion ? (
                            <>
                              <a
                                href={`https://vimeo.com/${lesson?.link}`}
                                data-fancybox={lesson?.platform}
                              >
                                <RiYoutubeLine
                                  color="#1ebb76"
                                  className="m-0 mr-1"
                                />
                                <span className="mt-1">{lesson?.title}</span>
                              </a>
                            </>
                          ) : (
                            <>
                              <RiLock2Line />
                              <span className="mt-1">{lesson?.title}</span>
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          {lesson.freeLesion ? (
                            <>
                              <a
                                href={`${process.env.REACT_APP_BACKEND_URL}/uploads/topics/topic-assets/${lesson?.customVideo}`}
                                data-fancybox={lesson?.platform}
                              >
                                <RiYoutubeLine
                                  color="#1ebb76"
                                  className="m-0 mr-1"
                                />
                                <span className="mt-1">{lesson?.title}</span>
                              </a>
                            </>
                          ) : (
                            <>paid</>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {lesson.freeLesion ? (
                        <>
                          {
                            <a
                              target="_blank"
                              rel="noreferrer"
                              href={`${process.env.REACT_APP_BACKEND_URL}/uploads/topics/topic-assets/${lesson?.pdfFile}`}
                            >
                              <BsFiletypePdf
                                color="#1ebb76"
                                className="m-0 mr-1"
                              />
                              <span className="mt-1">{lesson?.title}</span>
                            </a>
                          }
                        </>
                      ) : (
                        <>
                          <RiLock2Line />
                          <span className="mt-1">{lesson?.title}</span>
                        </>
                      )}
                    </>
                  )}
                </div>
                <div className="content-preview">
                  <span className="duration ml-md-2 mr-2 mr-md-0">
                    {lesson?.duration?.inWords}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </li>
    </>
  );
};

export default CourseContentList;
