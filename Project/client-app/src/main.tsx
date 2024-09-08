import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostDetail from "./pages/Post/Home.tsx";
import CreatePost from "./pages/Post/components/CreatePost.tsx";
import PageLayout from "./components/PageLayout.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LoginForm from "./components/users/LoginForm.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <PageLayout>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/post/:id" element={<PostDetail />} />{" "}
            <Route
              path="/createPost"
              element={<CreatePost></CreatePost>}
            ></Route>
            <Route path="/login" element={<LoginForm></LoginForm>} />
          </Routes>
        </PageLayout>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
