import { Button, Form, Input, message } from "antd";
import { LoginModel, User } from "../../api/models";
import { useMutation } from "@tanstack/react-query";
import agent from "../../api/agent";
import { setToken, getRoles } from "../../utils/tokenUtils";
import { Link, useNavigate } from "react-router-dom";
import { useLoginContext } from "../../hooks/useLoginContext";
import { useEffect } from "react";

export default function LoginForm() {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useLoginContext();

  useEffect(() => {
    console.log("Logged in status: ", loggedIn);
  }, [loggedIn]);

  const handleSubmit = (values: LoginModel) => {
    loginMutation.mutate(values);
  };

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (values: LoginModel) => {
      return agent.Account.login(values);
    },
    onSuccess: (data: User) => {
      setToken(data.token);
      setLoggedIn(true);

      const roles = getRoles();
      console.log("User roles after login: ", roles);

      navigate("/");
    },
    onError: (error) => {
      message.error("Login failed. Please try again.");
    },
  });

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
        <Link style={{ margin: "0 0 1rem 0" }} to={"/register"}>
          Sign Up
        </Link>
        <Button htmlType="submit">Sign in</Button>
      </Form>
    </div>
  );
}
