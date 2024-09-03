import { Skeleton } from "antd";

export default function PostDetailLoading() {
  return (
    <div
      className="post-detail-loading"
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        padding: "2rem",
        backgroundColor: "#f0f2f5",
      }}
    >
      <div
        className="post-detail-header"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "1rem 0",
        }}
      >
        <Skeleton.Button active style={{ width: 100, height: 30 }} />
      </div>
      <div
        className="post-detail-body"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          overflow: "auto",
        }}
      >
        <Skeleton
          active
          title={{ width: "80%" }}
          paragraph={{ rows: 1 }}
          style={{ width: "100%", maxWidth: "800px" }}
        />
        <Skeleton
          active
          paragraph={{ rows: 2 }}
          style={{ width: "100%", maxWidth: "800px", margin: "1rem 0" }}
        />
        <Skeleton
          active
          paragraph={{ rows: 5 }}
          style={{ width: "100%", maxWidth: "800px" }}
        />
      </div>
    </div>
  );
}
