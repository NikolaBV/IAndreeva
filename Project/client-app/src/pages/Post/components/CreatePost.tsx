import { useMutation } from "@tanstack/react-query";
import { Button, Form, FormProps, Input, message } from "antd";
import JoditEditor from "jodit-react";
import { useMemo, useRef, useState } from "react";
import { CreatePostModel } from "../../../api/models";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  // Define form values type
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
    //navigate(`/post/${id}`);
  };

  const onFinishFailed: FormProps<FormValues>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const createPost = useMutation({
    mutationKey: ["createPost"],
    mutationFn: (model: CreatePostModel) => {
      return axios.post("http://localhost:5000/api/posts", model);
    },
    onSuccess: (response) => {
      console.log(response);
      navigate(`/post/${response?.data}`);
    },
  });

  return (
    <>
      <div style={{ marginTop: "2rem " }}>
        <Form<FormValues>
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item name="title">
            <Input.TextArea
              required={true}
              placeholder="Give it a title"
              style={{
                fontSize: "20px",
                width: "100%",
                marginBottom: "0.5rem",
              }}
            />
          </Form.Item>
          <Form.Item name="description">
            <Input.TextArea
              placeholder="Describe it"
              required={true}
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
    </>
  );
}
