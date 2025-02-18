import type React from "react"
import { Layout, Menu, theme } from "antd"
import {
  BarChartOutlined,
  BookOutlined,
  SettingOutlined,
  ToolOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import styles from "./MainLayout.module.css"
import { useState } from "react"

const { Header, Content, Sider } = Layout

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const menuItems = [
    {
      key: "statistics",
      icon: <BarChartOutlined />,
      label: "Statistics",
    },
    {
      key: "education",
      icon: <BookOutlined />,
      label: "Education",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
    {
      key: "hardskill",
      icon: <ToolOutlined />,
      label: "Hard skill",
    },
    {
      key: "conditions",
      icon: <UnorderedListOutlined />,
      label: "Conditions",
    },
  ]

  const handleLogout = () => {
    // Clear authentication
    localStorage.removeItem("auth_user")
    navigate("/")
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        theme="light"
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          setCollapsed(broken)
        }}
        onCollapse={(collapsed, type) => {
          setCollapsed(collapsed)
        }}
        className={styles.sidebar}
        width={250}
        collapsed={collapsed}
      >
        <div style={{ fontSize: '20px', height: '80px', padding: '20px' }}>
          Pages
        </div>
        <Menu className={styles.menu} mode="inline" defaultSelectedKeys={["statistics"]} items={menuItems} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingRight: 24,
            borderBottom: '2px solid rgb(227, 227, 227)'
          }}
        >
          <Menu mode="horizontal" selectedKeys={[]}>
            <Menu.SubMenu
              key="user"
              title={
                <span>
                  <UserOutlined />
                  User
                </span>
              }
            >
              <Menu.Item key="logout" onClick={handleLogout}>
                Logout
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout

