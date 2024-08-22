import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { PostModel } from "../../api/models";
import { useEffect } from "react";

export default function PostDetail() {
  const params = useParams<{ id: string }>();
  const postQuery = useQuery({
    queryKey: ["post", params.id],
    queryFn: () => axios.get(`http://localhost:5000/api/posts/${params.id}`),
  });

  useEffect(() => {
    console.log(postQuery.data);
  }, [postQuery.data]);

  return (
    <>
      <div>
        {postQuery.isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <h1>{(postQuery.data?.data as PostModel).title}</h1>
            <p>{(postQuery.data?.data as PostModel).description}</p>
            <div
              dangerouslySetInnerHTML={{
                __html: (postQuery.data?.data as PostModel).htmlContent,
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
