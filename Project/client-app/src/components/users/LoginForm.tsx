import { Button, Form, Input } from "antd";

export default function LoginForm() {
  const handleSubmit = (values: any) => {
    console.log(values.email, values.password);
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name="email" rules={[{ required: true, type: "email" }]}>
        <Input id="email" placeholder="Email" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true }]}>
        <Input.Password id="password" placeholder="Password" />
      </Form.Item>
      <Button htmlType="submit">Sign in</Button>
    </Form>
  );
}
