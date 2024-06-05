import React, { useState } from "react";
import Modal from "react-modal";
import { FaTrash } from "react-icons/fa";
import AddContentModal from "./AddContentModal";
import "./homepage.css";

Modal.setAppElement("#root");

const Homepage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [submittedContents, setSubmittedContents] = useState([]);
  const [submittedContentsPdf, setSubmittedContentsPdf] = useState([]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleContentSubmit = (content) => {
    if (typeof content === "string") {
      setSubmittedContents([
        ...submittedContents,
        { contentType: "text", content },
      ]);
    } else if (
      Array.isArray(content) &&
      content.length > 0 &&
      content[0].type === "application/pdf"
    ) {
      setSubmittedContentsPdf([...submittedContentsPdf, ...content]);
    }
    closeModal();
  };

  const handleDeleteContent = (index) => {
    const updatedContents = [...submittedContents];
    updatedContents.splice(index, 1);
    setSubmittedContents(updatedContents);
  };

  const handleDeleteContentPdf = (index) => {
    const updatedContents = [...submittedContentsPdf];
    updatedContents.splice(index, 1);
    setSubmittedContentsPdf(updatedContents);
  };

  const contentAdded =
    submittedContents.length > 0 || submittedContentsPdf.length > 0;

  return (
    <div className="homepageContainer">
      <div>
        <h1> &lt; Chapter Name</h1>
        <div className="imgContainer">
          <img src="public/Homepage Assets/Simulations.png" alt="" />
          <img src="public/Homepage Assets/Your Videos.png" alt="" />
        </div>
        <div className="submittedContentsPdf">
          {submittedContentsPdf.map((content, index) => (
            <div key={index} className="submittedContentPdf">
              {content instanceof File && (
                <div className="pdfContainer" key={index}>
                  <a
                    href={URL.createObjectURL(content)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="public\Homepage Assets\pdf Icon.png" alt="" />
                    <h4>{content.name}</h4>
                  </a>
                  <FaTrash
                    className="deleteIcon"
                    onClick={() => handleDeleteContentPdf(index)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="addContentContainer">
          <div
            className={` ${
              contentAdded
                ? "addContentSubContainer-hide"
                : "addContentSubContainer"
            }`}
          >
            <img src="public/Homepage Assets/add content.png" alt="" />
            <p>Content not added yet!</p>
          </div>
          <div className="addContentButtonContainer">
            <button className="addContentBtn" onClick={openModal}>
              Add Content
            </button>
          </div>
        </div>

        <div className="submittedContents">
          {submittedContents.map((content, index) => (
            <div key={index} className="submittedContent">
              {content.contentType === "text" && (
                <div className="textContainer">
                  <div className="addContentHeader">
                    <h4>Doc {index + 1}:</h4>
                    <FaTrash
                      className="deleteIcon"
                      onClick={() => handleDeleteContent(index)}
                    />
                  </div>
                  <div>{content.content}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <AddContentModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          onSubmit={handleContentSubmit}
        />
      </div>
    </div>
  );
};

export default Homepage;
