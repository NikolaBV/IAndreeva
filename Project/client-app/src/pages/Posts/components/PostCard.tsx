import { Popconfirm, Row, Tooltip } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import agent from "../../../api/agent";
import { isAdmin } from "../../../utils/tokenUtils";
import { useLoginContext } from "../../../hooks/useLoginContext";

interface Props {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function PostCard({ id, title, description, updatedAt }: Props) {
  const queryClient = useQueryClient();
  const { loggedIn, setLoggedIn } = useLoginContext();
  const [isAdminUser, setIsAdminUser] = useState(false);
  useEffect(() => {
    if (loggedIn) {
      setIsAdminUser(isAdmin());
    }
    console.log("Logged in status: ", loggedIn);
  }, [loggedIn]);

  const deletePost = useMutation({
    mutationKey: ["deletePost"],
    mutationFn: async (id: string) => {
      await agent.Posts.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleDelete = () => {
    deletePost.mutate(id);
  };

  return (
    <Row
      className="box"
      style={{
        width: "100%",
        height: "auto",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        margin: "1rem",
        position: "relative",
        padding: "1rem",
      }}
    >
      {isAdminUser && (
        <Tooltip title="Delete post">
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this post?"
            okText="Yes"
            cancelText="No"
            onConfirm={handleDelete}
          >
            <DeleteOutlined
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                cursor: "pointer",
                fontSize: "1.5rem",
                color: "#fff8f0",
              }}
            />
          </Popconfirm>
        </Tooltip>
      )}

      <div style={{ display: "flex", flexDirection: "column" }}>
        <Link to={`/post/${id}`}>
          <Title style={{ color: "#fff8f0" }} level={2}>
            {title}
          </Title>
        </Link>
        <Paragraph style={{ color: "#fff8f0" }}>{description}</Paragraph>
        <Paragraph style={{ color: "#fff8f0" }}>
          {updatedAt.toLocaleString()}
        </Paragraph>
      </div>
    </Row>
  );
}
