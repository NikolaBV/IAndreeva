import { useQuery } from "@tanstack/react-query";
import { Col, Spin } from "antd";
import { AxiosError } from "axios";
import { PostModel, User } from "../../api/models";
import Post from "./components/PostCard";
import agent from "../../api/agent";
import { useEffect } from "react";

export default function Posts() {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: async () => agent.Posts.list(),
    onError: (error: AxiosError) => {
      console.error("Error fetching posts:", error);
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
  const currentUser = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => agent.Account.current(),
    onSuccess: (data: User[]) => {
      console.log(data);
    },
    onError: (error: AxiosError) => {
      console.error("Error fetching posts:", error);
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
  if (postsQuery.isLoading) {
    return <Spin spinning={postsQuery.isLoading} fullscreen></Spin>;
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
