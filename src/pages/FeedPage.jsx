import { useState, useEffect } from "react";
import { backendClient } from "../client/backendClient";

function FeedPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await backendClient.get("/posts", {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("social-app-token")
            )}`,
          },
        });

        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await backendClient.post(
        "/posts",
        {
          title,
          body,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("social-app-token")
            )}`,
          },
        }
      );

      console.log(res);

      setTitle("");
      setBody("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <h1>Feed Page</h1>

      <form
        className="flex flex-col my-3 gap-2 items-center"
        onSubmit={handleSubmit}
      >
        <h2>What's On Your Mind</h2>
        <label htmlFor="title" />
        <input
          type="text"
          title={title}
          name="title"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="body" />
        <input
          type="text"
          name="body"
          value={body}
          placeholder="Body"
          onChange={(e) => setBody(e.target.value)}
        />

        <input type="submit" value="Post" />
      </form>

      <div className="displayed-post">
        {posts.length > 0 && (
          <>
            <h2>Posts</h2>
            {posts.map((post) => (
              <div key={post.id}>
                <h4>{post.title}</h4>
                <p>{post.body}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </main>
  );
}

export default FeedPage;
