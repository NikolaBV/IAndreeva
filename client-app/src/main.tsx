// src/main.tsx (or index.tsx depending on your structure)
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PostDetail from "./pages/Post/Home";
import CreatePost from "./pages/Post/components/CreatePost";
import PageLayout from "./components/PageLayout";
import LoginForm from "./components/users/LoginForm";
import { LoginProvider } from "./context/LoginContext";
import RegisterForm from "./components/users/RegisterForm";
import HomePage from "./pages/landing-page/HomePage";
import Posts from "./pages/Posts/Home";

const queryClient = new QueryClient();

const AppProvider = () => {
  return (
    <StrictMode>
      <LoginProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <PageLayout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/post/:id" element={<PostDetail />} />
                <Route path="/createPost" element={<CreatePost />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
              </Routes>
            </PageLayout>
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </LoginProvider>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(<AppProvider />);
