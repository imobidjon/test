import React from "react"
import { Typography } from "antd"
import MainLayout from "../layouts/MainLayout"
import PostsTable from "../components/posts/PostsTable"

const { Title } = Typography

const HomePage: React.FC = () => {
    return (
        <MainLayout>
            <Title level={2}>Posts</Title>
            <PostsTable />
        </MainLayout>
    )
}

export default HomePage
