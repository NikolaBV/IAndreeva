import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState, useMemo, useRef, useEffect } from "react";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { Form, Input, Tooltip, Button, Skeleton } from "antd";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import parse from "html-react-parser";
import "../../styles/index.css";
import agent from "../../api/agent";
import PostNotFound from "./components/PostNotFound";
import HtmlEditor from "./HtmlEditor";
import PostDetailLoading from "./components/PostLoading";

export default function PostDetail() {
  const params = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState<string>("");

  const postQuery = useQuery({
    queryKey: ["post", params.id],
    queryFn: () => agent.Posts.details(params.id as string),
    onSuccess: (data: PostModel) => {
      setContent(data.htmlContent);
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  const editPost = useMutation({
    mutationKey: ["editPost"],
    mutationFn: async (model: EditPostModel) => {
      await agent.Posts.edit(model.id, model);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });

  const editor = useRef<any>(null);

  const config = useMemo(
    () => ({
      readonly: false,
      toolbarSticky: false,
      toolbarAdaptive: false,
      showPlaceholder: false,
      toolbarButtonSize: "middle" as const,
      buttons: [
        "bold",
        "|",
        "italic",
        "|",
        "underline",
        "|",
        "font",
        "|",
        "fontsize",
        "|",
        "ul",
        "|",
        "ol",
        "|",
        "align",
        "|",
        "link",
        "|",
        "image",
        "|",
      ],
    }),
    []
  );

  useEffect(() => {
    if (postQuery.data) {
      setContent(postQuery.data.htmlContent);
    }
  }, [postQuery.data]);

  const handleSaveChanges = (values: any) => {
    editPost.mutate({
      id: postQuery.data?.id,
      title: values.title,
      description: values.description,
      htmlContent: content,
    });

    setEditing(false);
  };

  if (postQuery.isError) {
    console.log(postQuery.error.response.status);
    if (
      postQuery.error.response.status === 404 ||
      postQuery.error.response.status === 400
    ) {
      return (
        <div>
          <PostNotFound />
        </div>
      );
    }
  }

  return (
    <div className="post-detail-container">
      {postQuery.isLoading ? (
        <PostDetailLoading></PostDetailLoading>
      ) : postQuery.data ? (
        <div className="post-detail-content">
          <div className="post-detail-header">
            <span className="edit-icon">
              {editing ? (
                <Tooltip title="Stop editing">
                  <CloseOutlined
                    style={{ cursor: "pointer", fontSize: "1.5rem" }}
                    onClick={() => setEditing(false)}
                  />
                </Tooltip>
              ) : (
                <Tooltip title="Edit">
                  <EditOutlined
                    style={{ cursor: "pointer", fontSize: "1.5rem" }}
                    onClick={() => setEditing(true)}
                  />
                </Tooltip>
              )}
            </span>
          </div>
          <div className="post-detail-body">
            {editing ? (
              <Form style={{ width: "100%" }} onFinish={handleSaveChanges}>
                <Form.Item
                  name="title"
                  initialValue={postQuery.data.title}
                  rules={[{ required: true, message: "Title is required" }]}
                >
                  <Input.TextArea
                    autoSize={{ minRows: 1, maxRows: 5 }}
                    style={{
                      fontSize: "32px",
                      width: "100%",
                      marginBottom: "0.5rem",
                      fontWeight: "bold",
                      lineHeight: 1.3,
                      textAlign: "center",
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="description"
                  initialValue={postQuery.data.description}
                  rules={[
                    { required: true, message: "Description is required" },
                  ]}
                >
                  <Input.TextArea
                    autoSize={{ minRows: 3, maxRows: 7 }}
                    style={{
                      fontSize: "20px",
                      width: "100%",
                      marginBottom: "0.5rem",
                      textAlign: "center",
                    }}
                  />
                </Form.Item>

                <Form.Item name="htmlContent">
                  <HtmlEditor
                    editor={editor}
                    config={config}
                    content={postQuery.data.htmlContent || ""}
                    setContent={setContent}
                  />
                </Form.Item>

                <Button type="primary" htmlType="submit">
                  Save Changes
                </Button>
              </Form>
            ) : (
              <>
                <Title level={1} className="post-title">
                  {postQuery.data.title}
                </Title>
                <Paragraph className="post-description">
                  {postQuery.data.description}
                </Paragraph>
                <div className="post-content">
                  {parse(postQuery.data.htmlContent)}
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div>Post not found.</div>
      )}
    </div>
  );
}
