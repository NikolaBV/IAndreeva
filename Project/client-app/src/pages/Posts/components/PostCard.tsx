import { Popconfirm, Row, Tooltip } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import agent from "../../../api/agent";

interface Props {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
}

export default function Post({ id, title, description, createdAt }: Props) {
  const queryClient = useQueryClient();

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
      style={{
        width: "100%",
        height: "auto",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        margin: "1rem",
        position: "relative",
        padding: "1rem",
      }}
    >
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
            }}
          />
        </Popconfirm>
      </Tooltip>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Link to={`/post/${id}`}>
          <Title style={{ color: "black" }} level={2}>
            {title}
          </Title>
        </Link>
        <Paragraph style={{ color: "black" }}>{description}</Paragraph>
        <Paragraph style={{ color: "black" }}>
          {createdAt.toLocaleString()}
        </Paragraph>
      </div>
    </Row>
  );
}
