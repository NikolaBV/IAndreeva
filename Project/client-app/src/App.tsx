import { Layout } from "antd";
import Posts from "./pages/Posts/Home";
import Navbar from "./components/Navbar";
import "./styles/index.css"

export default function App() {
  return (
    <>
      <Layout>
        <Navbar></Navbar>
        <Posts></Posts>
      </Layout>
    </>
  );
}
