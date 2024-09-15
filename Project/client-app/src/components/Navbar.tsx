import { Button, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLoginContext } from "../hooks/useLoginContext";
import { isAdmin, clearToken } from "../utils/tokenUtils";

export default function Navbar() {
  const [current, setCurrent] = useState("");
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useLoginContext();
  const [isAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      setIsAdminUser(isAdmin());
    }
    console.log("Logged in status: ", loggedIn);
  }, [loggedIn]);

  const handleLogout = () => {
    setLoggedIn(false);
    clearToken();
    navigate("/");
  };

  const menuItems = [
    {
      key: "1",
      label: "Home",
    },
  ];

  return (
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
      {isAdminUser && loggedIn ? (
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
      ) : null}

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
  );
}
