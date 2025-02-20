import { useState, useEffect } from "react";
import  PostType  from "../types/Post"; // Ensure correct import
import "./PostForm.css";

const PostComponent = () => {
  const [post, setPost] = useState<PostType | null>(null);
  const [postId, setPostId] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [newPostId, setNewPostId] = useState<number | null>(null);

  const [newPost, setNewPost] = useState<PostType>({
    id: 0,
    userId: 0,
    title: "",
    body: "",
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchPost();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [postId]);

  const fetchPost = async () => {
    if (!postId) return;
    setLoading(true);
    setError("");
    setPost(null);
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${postId}`);
      if (!res.ok) throw new Error("Post not found");
      const data = await res.json();
      setPost(data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleNewPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!newPost.userId || !newPost.title || !newPost.body) {
      alert("All fields are required.");
      return;
    }
  
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: { "Content-Type": "application/json" },
      });
  
      if (!res.ok) throw new Error("There was some error");
  
      const data = await res.json();
      setNewPostId(data.id);
      console.log("New Post Added:", data);
  
      const handleNewPost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        if (!newPost.userId || !newPost.title || !newPost.body) {
          alert("All fields are required.");
          return;
        }
      
        try {
          const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: JSON.stringify(newPost),
            headers: { "Content-Type": "application/json" },
          });
      
          if (!res.ok) throw new Error("There was some error");
      
          const data = await res.json();
          setNewPostId(data.id);
      
          setNewPost({
            id: 0,
            userId: 0,
            title: "",
            body: "",
          });
        } catch (err) {
          console.log("Error in POST request:", err);
        }
      };
      
    } catch (err) {
      console.log("Error in POST request:", err);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  return (
    <>
    <div className="container">
      <h2>Enter the ID number:</h2>
      <input
        type="text"
        placeholder="Enter the id"
        value={postId}
        onChange={(e) => {
          setPostId(e.target.value);
          setPost(null);
        }}
      />
      <br />
      <button onClick={fetchPost}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {post && postId && (
        <div className='post-box'>
          <p>Id- {post.id}</p>
          <p>Title- {post.title}</p>
        </div>
      )}
      <br />
      <br />

      <form className="form" onSubmit={handleNewPost}>
        <h2>Add a new Post</h2>
        <input
          type="number"
          name="userId"
          placeholder="User ID"
          value={newPost.userId || ""}
          onChange={handleChange}
        />
        <input type="text" name="title" placeholder="Title" value={newPost.title} onChange={handleChange} />
        <textarea name="body" placeholder="Body" value={newPost.body} onChange={handleChange} rows={3} />
        <button type="submit">Add Post</button>
      </form>

      {newPostId && (
        <div className="post-box">
          <h3>Post Added</h3>
          <p>
            <strong>Title:</strong> {newPost.title}
          </p>
          <p>
            <strong>User ID:</strong> {newPost.userId}
          </p>
          <p>
            <strong>Post ID:</strong> {newPostId}
          </p>
          <p>
            <strong>Body:</strong> {newPost.body}
          </p>
        </div>
      )}
      </div>
    </>
  );
};

export default PostComponent;
