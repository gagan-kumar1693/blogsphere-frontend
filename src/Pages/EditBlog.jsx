import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../Services/api";

const EditBlog = () => {
  const { id } = useParams(); // blog ID from URL
  const navigate = useNavigate();

  const [blog, setBlog] = useState({ title: "", content: "" });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/blogs/${id}`);
        setBlog({
          title: res.data.title,
          content: res.data.content,
        });
      } catch (err) {
        console.error("Error fetching blog", err);
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/blogs/${id}`, blog);
      navigate("/"); // go back to blog list or detail
    } catch (err) {
      console.error("Error updating blog", err);
    }
  };

  return (
    <div>
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={blog.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <br />
        <textarea
          name="content"
          value={blog.content}
          onChange={handleChange}
          placeholder="Content"
          rows="8"
          required
        />
        <br />
        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
};

export default EditBlog;
