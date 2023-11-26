import { useState } from "react";

const Post = () => {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");

  function handleSubmit(e : React.FormEvent) {
    e.preventDefault();
    const postData = async () => {
      const data = {
        title: title,
        post: post,
      };

      const response = await fetch("/api/storeData", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return await response.json();
    };
    postData().then((data) => {
      alert(data.message);
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="Title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          className="text-black"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="post">Post</label>
        <input
          id="post"
          type="text"
          value={post}
          className="text-black"
          onChange={(e) => setPost(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Post;