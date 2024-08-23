import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { EditPostModel, PostModel } from "../../api/models";
import { useEffect, useState } from "react";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { Form, Input, Tooltip } from "antd";

export default function PostDetail() {
  const params = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);

  const postQuery = useQuery({
    queryKey: ["post", params.id],
    queryFn: () => axios.get(`http://localhost:5000/api/posts/${params.id}`),
  });

  const editPost = useMutation({
    mutationKey: ["editPost"],
    mutationFn: async (model: EditPostModel) => {
      await axios.put(`http://localhost:5000/api/posts/${params.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });

  return (
    <>
      <div>
        {postQuery.isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <div
              style={{
                width: "70%",
                height: "100vh",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                marginTop: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "2rem",
                }}
              >
                <span style={{ marginLeft: "auto" }}>
                  {editing ? (
                    <Tooltip title="Stop editing">
                      <CloseOutlined
                        style={{ cursor: "pointer", fontSize: "1.5rem" }}
                        onClick={() => {
                          console.log(
                            "Edit post with id" + postQuery.data?.data.id
                          );
                          setEditing(false);
                          console.log("Editing: " + editing);
                        }}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Edit">
                      <EditOutlined
                        style={{ cursor: "pointer", fontSize: "1.5rem" }}
                        onClick={() => {
                          console.log(
                            "Edit post with id" + postQuery.data?.data.id
                          );
                          setEditing(true);
                          console.log("Editing: " + editing);
                        }}
                      />
                    </Tooltip>
                  )}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                {editing ? (
                  <>
                    <Form style={{ width: "100%" }}>
                      <Form.Item
                        name="title"
                        rules={[
                          { required: true, message: "Title is required" },
                        ]}
                      >
                        <Input.TextArea
                          defaultValue={
                            (postQuery.data?.data as PostModel).title
                          }
                          style={{
                            fontSize: "20px",
                            width: "100%",
                            marginBottom: "0.5rem",
                          }}
                        />
                      </Form.Item>
                    </Form>
                    <Title level={1}></Title>
                    <Paragraph>
                      {(postQuery.data?.data as PostModel).description}
                    </Paragraph>
                    <div style={{ padding: "2rem" }}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: (postQuery.data?.data as PostModel)
                            .htmlContent,
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <Title level={1}>
                      {(postQuery.data?.data as PostModel).title}
                    </Title>
                    <Paragraph>
                      {(postQuery.data?.data as PostModel).description}
                    </Paragraph>
                    <div style={{ padding: "2rem" }}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: (postQuery.data?.data as PostModel)
                            .htmlContent,
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
