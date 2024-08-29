import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import JoditEditor from "jodit-react";
import { useMemo, useRef, useState } from "react";
import { CreatePostModel } from "../../../api/models";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../styles/index.css";

export default function CreatePost() {
  const editor = useRef<any>(null);
  const [content, setContent] = useState("");
  const navigate = useNavigate();

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

  type FormValues = Omit<CreatePostModel, "htmlContent"> & {
    htmlContent: string;
  };

  const onFinish = (values: FormValues) => {
    createPost.mutate({
      title: values.title,
      description: values.description,
      htmlContent: values.htmlContent,
    });
    message.success("Post created successfully");
  };

  const createPost = useMutation({
    mutationKey: ["createPost"],
    mutationFn: (model: CreatePostModel) => {
      return axios.post("http://localhost:5000/api/posts", model);
    },
    onSuccess: (response) => {
      navigate(`/post/${response?.data}`);
    },
  });

  return (
    <div className="create-post-container">
      <Form<FormValues> onFinish={onFinish} autoComplete="off">
        <Form.Item
          name="title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input.TextArea
            placeholder="Give it a title"
            style={{
              fontSize: "20px",
              width: "100%",
              marginBottom: "0.5rem",
            }}
          />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[{ required: true, message: "Description is required" }]}
        >
          <Input.TextArea
            placeholder="Describe it"
            style={{
              fontSize: "20px",
              width: "100%",
              marginBottom: "0.5rem",
            }}
          />
        </Form.Item>
        <Form.Item name="htmlContent" initialValue={content}>
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            onBlur={(newContent) => setContent(newContent)}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Create post
        </Button>
      </Form>
    </div>
  );
}
