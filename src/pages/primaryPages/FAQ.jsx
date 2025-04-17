import React, { lazy, useEffect, useState } from "react";
import notification from "../../helpers/notification";
import PrimaryService from "../../auth/services/PrimaryServices";
import Select from "react-select";

const PageHeader = lazy(() =>
  import("../../components/commonComponents/PageHeader")
);
const FaqCollapseItem = lazy(() =>
  import("../../components/helpComponents/FaqCollapseItem.jsx")
);

export const StyleOptions = {
  multiValue: (styles) => {
    return {
      ...styles,
      backgroundColor: "#0a9de2",
      color: "#fff",
    };
  },
  multiValueLabel: (styles) => ({
    ...styles,
    color: "#fff",
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: "#fff",
    ":hover": {
      backgroundColor: "#81d7ff",
      color: "#0a9de2",
    },
  }),
};

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [faqsLanguage, setFaqsLanguage] = useState([]);
  const [categoryOption, setCategoryOption] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  const toggleTabNav = (e) => {
    let currentTab = e.target.classList;
    let id = e.target.getAttribute("data-id");

    document.querySelectorAll(".tab-pane").forEach((tab) => {
      tab.classList.remove("active");
    });
    document.querySelectorAll(".tab").forEach((tab) => {
      tab.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");
    currentTab.add("active");
  };

  const handleCategoryChange = (selectedOption) => {
    if (selectedOption) {
      setSelectedCategory(selectedOption.value);
    } else {
      setSelectedCategory();
    }
  };

  useEffect(() => {
    // function added in useEffect because of "Missing Dependency Array" Warning
    const getAllFaqs = async () => {
      try {
        const { faqs, languages, categories } = await PrimaryService.getAllFaqs(
          selectedCategory ? selectedCategory : ""
        );
        setFaqs(faqs);
        setFaqsLanguage(languages);
        if (categories.length > 0) {
          let optionArr = [];
          categories.map((cat) =>
            optionArr.push({ value: cat?._id, label: cat?.title })
          );
          setCategoryOption(optionArr);
        }
      } catch (error) {
        console.log(error);
        notification(
          "error",
          error.response
            ? error.response.data.message.split(":")[0]
            : "Something went wrong."
        );
      }
    };

    getAllFaqs();
  }, [selectedCategory]);

  return (
    <>
      <PageHeader type="frequently asked questions" />
      <section className="faq">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="heading center">
                <span className="tag">FAQ QUESTIONS</span>
                <h2>Get Every General Answers From Here</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-end mt-5">
            <div className="col-lg-3 col-md-4 col-sm-6">
              <Select
                options={categoryOption}
                styles={StyleOptions}
                onChange={handleCategoryChange}
                isClearable
                placeholder="Select Category"
              />
            </div>
          </div>
          <div className="faq-content-wrap mt-5">
            <div className="tab-menu">
              <ul>
                <li>
                  <button
                    className="tab active"
                    data-id="tab-1"
                    onClick={toggleTabNav}
                  >
                    All
                  </button>
                </li>
                {faqsLanguage?.map((language, i) => (
                  <li key={i}>
                    <button
                      className="tab"
                      data-id={language._id}
                      // data-id="tab1"
                      onClick={toggleTabNav}
                    >
                      {language.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="tab-content">
              <div id="tab-1" className="tab-pane active">
                <div className="row">
                  {faqs?.map((faq, i) => (
                    <div key={i} className="col-lg-6 px-lg-3 px-2">
                      <FaqCollapseItem
                        question={faq.question}
                        answer={faq.answer}
                      />
                    </div>
                  ))}
                </div>
              </div>
              {faqsLanguage?.map((lang, i) => (
                <div id={lang?._id} key={i} className="tab-pane">
                  <div className="row">
                    {faqs
                      .filter(
                        (f) => f.language.toString() === lang._id.toString()
                      )
                      .map((faq, i) => (
                        <div className="col-lg-6 px-lg-3 px-2" key={i}>
                          <FaqCollapseItem
                            question={faq.question}
                            answer={faq.answer}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
