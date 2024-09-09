// src/main.tsx (or index.tsx depending on your structure)
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App";
import PostDetail from "./pages/Post/Home";
import CreatePost from "./pages/Post/components/CreatePost";
import PageLayout from "./components/PageLayout";
import LoginForm from "./components/users/LoginForm";
import { LoginProvider } from "./context/LoginContext";

const queryClient = new QueryClient();

const AppProvider = () => {
  return (
    <StrictMode>
      <LoginProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <PageLayout>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/post/:id" element={<PostDetail />} />
                <Route path="/createPost" element={<CreatePost />} />
                <Route path="/login" element={<LoginForm />} />
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
