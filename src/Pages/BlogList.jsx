import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/blogs");
        setBlogs(res.data);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="container">
      <h2>All Blogs</h2>
      {blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog._id} className="blog-card">
            <h3>
              <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
            </h3>
            <p>
              by {blog.author?.username || "Unknown"} on{" "}
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default BlogList;
