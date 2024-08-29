import { Button, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [current, setCurrent] = useState("");
  const navigate = useNavigate();
  const menuItems = [
    {
      key: "1",
      label: "Home",
    },
  ];

  return (
    <>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          items={menuItems}
          selectedKeys={[current]}
          style={{ flex: 1, minWidth: 0 }}
          onClick={(item) => {
            if (item.key === "1") {
              setCurrent(item.key);
              navigate("/");
            }
          }}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ marginLeft: "auto" }}
          onClick={() => {
            setCurrent("");
            navigate("/createPost");
          }}
        >
          Create post
        </Button>
      </Header>
    </>
  );
}
