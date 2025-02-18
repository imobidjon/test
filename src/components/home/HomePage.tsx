import React from "react"
import { Button, Layout, Typography } from "antd"
import { useNavigate } from "react-router-dom"
import { authService } from "../../services/auth.service"

const { Header, Content } = Layout
const { Title } = Typography

const HomePage: React.FC = () => {
    const navigate = useNavigate()
    const user = authService.getCurrentUser()

    React.useEffect(() => {
        // Redirect to login if not authenticated
        if (!authService.isAuthenticated()) {
            navigate("/")
        }
    }, [navigate])

    const handleLogout = () => {
        authService.logout()
        navigate("/")
    }

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 24px" }}>
                <Title level={4} style={{ color: "white", margin: 0 }}>
                    Welcome, {user?.username}!
                </Title>
                <Button type="primary" onClick={handleLogout}>
                    Logout
                </Button>
            </Header>
            <Content style={{ padding: "24px" }}>
                <Title level={2}>Home Page</Title>
                <p>You have successfully logged in!</p>
            </Content>
        </Layout>
    )
}

export default HomePage

