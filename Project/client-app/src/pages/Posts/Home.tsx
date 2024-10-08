import { Col, Spin } from "antd";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import agent from "../../api/agent";
import Post from "./components/PostCard";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function Posts() {
  const { ref, inView } = useInView();
  const [allPosts, setAllPosts] = useState([]);

  const infiniteQuery = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) => agent.Posts.list(pageParam, 2),
    getNextPageParam: (lastPage, allPages) => {
      const maxPages = lastPage.pagination.totalPages;
      const nextPage = lastPage.pagination.currentPage + 1;
      return nextPage <= maxPages ? nextPage : undefined;
    },
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    if (infiniteQuery.isSuccess) {
      const allFetchedPosts = infiniteQuery.data.pages.flatMap(
        (page) => page.data
      );
      setAllPosts(allFetchedPosts);
    }
  }, [infiniteQuery.data]);

  useEffect(() => {
    if (
      inView &&
      infiniteQuery.hasNextPage &&
      !infiniteQuery.isFetchingNextPage
    ) {
      infiniteQuery.fetchNextPage();
    }
  }, [inView, infiniteQuery.hasNextPage, infiniteQuery.isFetchingNextPage]);

  if (infiniteQuery.isLoading) {
    return <Spin spinning={infiniteQuery.isLoading} fullscreen></Spin>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "row", padding: "1rem" }}>
      <Col style={{ flex: 1, marginRight: "1rem" }}>
        {allPosts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            description={post.description}
            updatedAt={new Date(post.updatedAt)}
          />
        ))}
        <div
          ref={ref}
          style={{ marginTop: "1rem", width: "100%", textAlign: "center" }}
        >
          {infiniteQuery.isFetchingNextPage && <Spin />}
        </div>
      </Col>
      <Col style={{ width: "30%" }}></Col>
    </div>
  );
}
