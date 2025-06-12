import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const userId = JSON.parse(localStorage.getItem("user"))?.id;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error("❌ Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/blogs");
    } catch (err) {
      console.error("❌ Error deleting blog:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!blog) return <p>⚠️ Blog not found or has been removed.</p>;

  return (
    <div className="container">
      <h2>{blog.title}</h2>
      <p style={{ fontStyle: "italic", color: "#555" }}>
        by {blog.author.username} on{" "}
        {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <hr />
      <div style={{ margin: "20px 0" }}>{blog.content}</div>

      {userId === blog.author._id && (
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to={`/blogs/edit/${blog._id}`}>
            <button>Edit</button>
          </Link>
          <button onClick={handleDelete} style={{ color: "red" }}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
