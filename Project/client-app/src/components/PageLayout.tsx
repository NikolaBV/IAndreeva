import { Content } from "antd/es/layout/layout";
import Navbar from "./Navbar";
import { Layout } from "antd";
import { ReactNode } from "react";
interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout(props: PageLayoutProps) {
  return (
    <>
      <Layout>
        <Navbar />
        <Layout>
          <Content>{props.children}</Content>
        </Layout>
      </Layout>
    </>
  );
}
