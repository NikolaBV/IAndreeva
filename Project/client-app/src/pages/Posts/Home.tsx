import { useQuery } from "@tanstack/react-query";
import { Col } from "antd";
import axios from "axios";
import { PostModel } from "../../api/models";
import Post from "./components/PostCard";
import agent from "../../api/agent";

export default function Posts() {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: async () => agent.Posts.list(),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error("Error fetching posts:", error);
    },
  });
  if (postsQuery.isLoading) {
    return <div>Loading...</div>;
  }
  if (postsQuery.isError) {
    return <div>Error...</div>;
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
          {postsQuery.data.map((post: PostModel) => (
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
