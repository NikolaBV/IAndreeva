import { Button, Col, Row, Image } from "antd";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const handleGoToPosts = () => {
    navigate("/posts");
  };

  return (
    <div className="container">
      <div
        id="call-to-action"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Row>
            <Col style={{ width: "50%" }}>
              <div
                style={{
                  margin: "5rem 3rem 1rem 3rem",
                  padding: "2rem",
                }}
              >
                <h1 className="text-important" style={{ marginBottom: "2rem" }}>
                  All of my work in one place
                </h1>
                <Button type="primary" onClick={handleGoToPosts}>
                  Go to posts
                </Button>
              </div>
            </Col>
            <Col style={{ width: "50%" }}>
              <div style={{ margin: "3rem" }}>
                <Image
                  src="/newpaper.webp"
                  preview={false}
                  loading="lazy"
                  style={{
                    aspectRatio: "4 / 3",
                    width: "100%",
                    maxWidth: "480px",
                    height: "auto",
                    minHeight: "360px",
                    borderRadius: "8px",
                  }}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
