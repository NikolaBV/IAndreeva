import { useQuery } from "@tanstack/react-query";
import { Col } from "antd";
import axios from "axios";
import { PostModel } from "../../api/models";
import Post from "./components/PostCard";

export default function Posts() {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: async () => axios.get("http://localhost:5000/api/posts/"),
  });

  if (postsQuery.isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Col
          style={{
            height: "100vh",
            width: "70%",
            marginRight: "0.5rem",
          }}
        >
          {postsQuery.data?.data?.map((post: PostModel) => (
            <Post
              id={post.id}
              title={post.title}
              description={post.description}
              createdAt={new Date(post.createdAt)}
            ></Post>
          ))}
        </Col>
        <Col style={{ width: "30%", height: "100vh" }}></Col>
      </div>
    </>
  );
}
