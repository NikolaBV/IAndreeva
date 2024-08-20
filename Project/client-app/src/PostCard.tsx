import { Row } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { Link } from "react-router-dom";

interface Props {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
}

export default function Post({ id, title, description, createdAt }: Props) {
  return (
    <Row
      style={{
        width: "100%",
        height: "30%",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        margin: "1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
        }}
      >
        <div>
          <Link to={`/post/${id}`}>
            <Title style={{ color: "black" }} level={2}>
              {title}
            </Title>
          </Link>
          <Paragraph style={{ color: "black" }}>{description}</Paragraph>
          <Paragraph style={{ color: "black" }}>
            {createdAt.toDateString()}
          </Paragraph>
        </div>
      </div>
    </Row>
  );
}
