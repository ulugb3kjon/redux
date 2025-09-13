import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Outlet, Link, useLocation } from "react-router-dom";

const linkdata = [
  {
    path: "/categories",
    title: "Categories",
    icon: AlignLeftOutlined,
  },
  {
    path: "/categoryDetails",
    title: "Category Details",
    icon: AlignRightOutlined,
  },
];

const menuItems = linkdata.map((el) => ({
  key: el.path,
  label: <Link to={el.path}>{el.title}</Link>,
  icon: React.createElement(el.icon),
}));

const { Header, Sider, Content } = Layout;

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation();

  return (
    <Layout style={{ height: "100vh", fontFamily: "Raleway, sans-serif" }}>
      {/* Sidebar */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={190}
        collapsedWidth={70}
        style={{
          background: "white",
          borderRight: "1px solid #f0f0f0",
        }}
      >
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{
            background: "white",
            color: "black",
            fontWeight: 500,
            marginTop: 10,
          }}
          theme="light"
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
            margin: 0,
            background: "#001529", 
            borderBottom: "1px solid #f0f0f0",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            paddingLeft: "16px",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              color: "#fff",
            }}
          />
          <h2 style={{ color: "white", margin: 0 }}>Hello , Welcome to Redux and Ant design</h2>
        </Header>

        <Content
          style={{
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            height: "100%",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
