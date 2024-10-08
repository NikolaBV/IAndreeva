import { ConfigProvider, Menu, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [current, setCurrent] = useState("");
  const navigate = useNavigate();
  type MenuItem = Required<MenuProps>["items"][number];

  const menuItems: MenuItem[] = [
    {
      key: "1",
      label: "Home",
    },
    {
      key: "2",
      label: "About me",
    },
    {
      key: "3",
      label: "My Work",
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            darkItemBg: "black",
            darkItemSelectedBg: "black",
            darkItemSelectedColor: "white",
          },
        },
      }}
    >
      <div className="navbar-container">
        <Menu
          mode="horizontal"
          theme="dark"
          items={menuItems}
          selectedKeys={[current]}
          className="menu-items"
          onClick={(item) => {
            setCurrent(item.key);
            switch (item.key) {
              case "1":
                navigate("/");
                break;
              case "2":
                navigate("/about-me");
                break;
              case "3":
                navigate("/posts");
                break;
              default:
                break;
            }
          }}
        />
      </div>
    </ConfigProvider>
  );
}
