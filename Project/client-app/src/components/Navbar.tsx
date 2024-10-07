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
      <div>
        <Menu
          mode="horizontal"
          theme="dark"
          items={menuItems}
          selectedKeys={[current]}
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            minWidth: 0,
            padding: "0.5rem 0 0.5rem 0",
          }}
          onClick={(item) => {
            switch (item.key) {
              case "1":
                setCurrent(item.key);
                navigate("/");
                break;
              case "2":
                setCurrent(item.key);
                navigate("/about-me");
                break;
              case "3":
                setCurrent(item.key);
                navigate("/posts");
                break;
            }
          }}
        />
      </div>
    </ConfigProvider>
  );
}
