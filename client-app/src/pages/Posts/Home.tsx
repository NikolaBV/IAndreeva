import { useEffect, useState, lazy, Suspense } from "react";
import { useInView } from "react-intersection-observer";
import agent from "../../api/agent";
import { useInfiniteQuery } from "@tanstack/react-query";
import Col from "antd/es/grid/col";
import Spin from "antd/es/spin";

const PostCard = lazy(() => import("./components/PostCard")); // Lazy-loaded

export default function Posts() {
  const { ref, inView } = useInView();
  const [allPosts, setAllPosts] = useState([]);

  const infiniteQuery = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) => agent.Posts.list(pageParam, 2),
    getNextPageParam: (lastPage) => {
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

  // Throttle fetch on scroll
  useEffect(() => {
    let throttleTimeout = null;

    const handleScroll = () => {
      if (!throttleTimeout) {
        throttleTimeout = setTimeout(() => {
          if (
            inView &&
            infiniteQuery.hasNextPage &&
            !infiniteQuery.isFetchingNextPage
          ) {
            infiniteQuery.fetchNextPage();
          }
          throttleTimeout = null;
        }, 300); // Throttling scroll to 300ms
      }
    };

    if (inView) {
      handleScroll();
    }

    return () => clearTimeout(throttleTimeout);
  }, [inView, infiniteQuery.hasNextPage, infiniteQuery.isFetchingNextPage]);

  if (infiniteQuery.isLoading) {
    return <Spin spinning={infiniteQuery.isLoading} fullscreen />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "row", padding: "1rem" }}>
      <Col style={{ flex: 1, marginRight: "1rem" }}>
        <Suspense fallback={<Spin />}>
          {allPosts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              description={post.description}
              updatedAt={new Date(post.updatedAt)}
            />
          ))}
        </Suspense>
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
