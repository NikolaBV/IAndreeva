import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd/es";
import JoditEditor from "jodit-react";
import { useMemo, useRef, useState } from "react";
import { CreatePostModel } from "../../../api/models";
import { useNavigate } from "react-router-dom";
import "../../../styles/index.css";
import agent from "../../../api/agent";

export default function CreatePost() {
  const editor = useRef<any>(null);
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const config = useMemo(
    () => ({
      readonly: false,
      toolbarSticky: false,
      toolbarButtonSize: "middle",
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
      ],
    }),
    []
  );

  const createPost = useMutation({
    mutationFn: (model: CreatePostModel) => agent.Posts.create(model),
    onSuccess: (response) => {
      navigate(`/post/${response}`);
      message.success("Post created successfully");
    },
  });

  const onFinish = (values: CreatePostModel) => {
    createPost.mutate({
      ...values,
      htmlContent: content,
    });
  };

  return (
    <div className="create-post-container">
      <Form onFinish={onFinish} autoComplete="off">
        <Form.Item
          name="title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input.TextArea
            placeholder="Give it a title"
            style={{
              fontSize: "20px",
              color: "#f0f0f0",
              backgroundColor: "#232323",
            }}
          />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[{ required: true, message: "Description is required" }]}
        >
          <Input.TextArea
            placeholder="Describe it"
            style={{ fontSize: "20px", marginBottom: "0.5rem" }}
          />
        </Form.Item>
        <Form.Item name="htmlContent">
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            onBlur={setContent}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Create post
        </Button>
      </Form>
    </div>
  );
}
