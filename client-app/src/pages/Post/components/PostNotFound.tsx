import { Button } from "antd/es";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";

export default function PostNotFound() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "50%",
          padding: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Title level={2}>This post doesn't exist</Title>
        <Title level={5}>Go back to all posts</Title>
        <Button onClick={() => navigate("/")}>Go back</Button>
      </div>
    </div>
  );
}
