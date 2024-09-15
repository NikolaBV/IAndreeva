import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { RegisterModel, User } from "../../api/models";
import agent from "../../api/agent";
import { getRoles, setToken } from "../../utils/tokenUtils";
import { useLoginContext } from "../../hooks/useLoginContext";

export default function RegisterForm() {
  const navigate = useNavigate();
  const { setLoggedIn } = useLoginContext();
  const registerMutation = useMutation({
    mutationKey: ["register"],
    mutationFn: async (values: RegisterModel) => {
      return agent.Account.register(values);
    },
    onSuccess: (data: User) => {
      setLoggedIn(true);
      setToken(data.token);
      navigate("/");
    },
    onError: (error: any) => {
      message.error(error);
    },
  });
  const handleSubmit = (values: RegisterModel) => {
    console.log(values);
    registerMutation.mutate(values);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Form
        onFinish={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Form.Item name="email" rules={[{ required: true, type: "email" }]}>
          <Input id="email" placeholder="Email" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true }]}>
          <Input.Password id="password" placeholder="Password" />
        </Form.Item>
        <Form.Item name="displayName" rules={[{ required: true }]}>
          <Input id="displayName" placeholder="Display Name" />
        </Form.Item>
        <Form.Item name="username" rules={[{ required: true }]}>
          <Input id="username" placeholder="Username" />
        </Form.Item>
        <Button htmlType="submit">Sign Up</Button>
      </Form>
    </div>
  );
}
