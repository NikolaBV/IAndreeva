import { Button, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLoginContext } from "../hooks/useLoginContext";

export default function Navbar() {
  const [current, setCurrent] = useState("");
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useLoginContext();

  useEffect(() => {
    console.log("Logged in status: ", loggedIn);
  }, [loggedIn]);

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/");
  };

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
          onClick={() => {
            setCurrent("");
            navigate("/createPost");
          }}
        >
          Create post
        </Button>

        {!loggedIn ? (
          <Button
            type="primary"
            style={{ marginLeft: "1rem" }}
            onClick={() => {
              setCurrent("");
              navigate("/login");
            }}
          >
            Login
          </Button>
        ) : (
          <Button
            type="primary"
            style={{ marginLeft: "1rem" }}
            onClick={handleLogout}
          >
            Log out
          </Button>
        )}
      </Header>
    </>
  );
}
