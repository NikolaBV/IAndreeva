import { useQuery } from "@tanstack/react-query";
import { Col, Spin } from "antd";
import agent from "../../api/agent";
import Post from "./components/PostCard";
import { useEffect } from "react";
import { getRoles } from "../../utils/tokenUtils";

export default function Posts() {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: async () => agent.Posts.list(),
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    console.log("Roles: " + getRoles());
  }, []);

  if (postsQuery.isLoading) {
    return <Spin spinning={postsQuery.isLoading} fullscreen></Spin>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "row", padding: "1rem" }}>
      <Col style={{ flex: 1, marginRight: "1rem" }}>
        {postsQuery?.data?.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            description={post.description}
            createdAt={new Date(post.createdAt)}
          />
        ))}
      </Col>
      <Col style={{ width: "30%" }}></Col>
    </div>
  );
}
