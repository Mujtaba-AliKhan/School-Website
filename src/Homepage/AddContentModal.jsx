import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import { FaTrash } from "react-icons/fa";
import "./addContentModal.css";

Modal.setAppElement("#root");

const AddContentModal = ({ isOpen, onRequestClose, onSubmit }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [typedContent, setTypedContent] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setSelectedOption("");
      setTypedContent("");
      setUploadedFiles([]);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (selectedOption === "type" && typedContent.trim() !== "") {
      onSubmit(typedContent);
    } else if (selectedOption === "upload" && uploadedFiles.length > 0) {
      onSubmit(uploadedFiles); // Pass File objects directly
    }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
    }
  };

  const handleFileDiscard = (index) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    fileInputRef.current.value = null;
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Content Modal"
      className="Modal"
      overlayClassName="Overlay"
    >
      <h2>Add Content</h2>
      <div className="modalOptions">
        <button onClick={() => setSelectedOption("type")}>
          <div>
            <img src="/Homepage Assets/addcontent Text.png" alt="" />
            <p>Type your own personalized content</p>
          </div>
        </button>
        <button
          onClick={() => {
            setSelectedOption("upload");
            fileInputRef.current.click();
          }}
        >
          <div>
            <img src="/Homepage Assets/addcontent pdf.png" alt="" />
            <p>Upload a PDF of your content</p>
          </div>
        </button>
        <input
          type="file"
          accept="application/pdf"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileUpload}
          multiple
        />
      </div>
      {selectedOption === "type" && (
        <textarea
          className="textAreaContent"
          placeholder="Type your content here..."
          value={typedContent}
          onChange={(e) => setTypedContent(e.target.value)}
        ></textarea>
      )}
      {selectedOption === "upload" && uploadedFiles.length > 0 && (
        <div className="fileInfoContainer">
          {uploadedFiles.map((file, index) => (
            <div key={index} className="fileInfo">
              <h5>Uploaded: {file.name}</h5>
              <button
                className="discardBtn"
                onClick={() => handleFileDiscard(index)}
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="uploadContent">
        <button className="submitBtn" onClick={handleSubmit}>
          Submit
        </button>
        <button className="cancelBtn" onClick={onRequestClose}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default AddContentModal;
