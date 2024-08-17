import axios from "axios";
import { useEffect, useState } from "react";
import { List, Typography } from "antd";

export default function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/posts/").then((response) => {
      setPosts(response.data);
    });
  }, []);
  return (
    <>
      <List
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        dataSource={posts}
        renderItem={(post: any) => (
          <List.Item>
            <Typography.Text>{post.title}</Typography.Text>
          </List.Item>
        )}
      />
    </>
  );
}
