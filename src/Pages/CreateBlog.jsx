import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../Services/api";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await createBlog({ title, content }, token);
      console.log("Blog created:", response.data);
      navigate("/"); // or navigate("/blogs") if you want
    } catch (err) {
      console.error("Error creating blog:", err.response?.data || err.message);
      alert("Failed to create blog. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Create New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label><br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label><br />
          <textarea
            rows="6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Publish</button>
      </form>
    </div>
  );
};

export default CreateBlog;
