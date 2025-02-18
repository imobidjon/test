import type React from "react"
import { Table, Spin, Alert, Tooltip } from "antd"
import type { ColumnsType } from "antd/es/table"
import type { Post } from "../../types/post"
import { usePosts } from "../../hooks/usePosts"
import { useState } from "react"
import { TableRowSelection } from "antd/es/table/interface"

const PostsTable: React.FC = () => {
    const { data: posts, isLoading, isError } = usePosts()
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const columns: ColumnsType<Post> = [
        {
            title: "Date",
            key: "date",
            ellipsis: true,
            render: (_, record) =>
                record.date.toLocaleString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                }),
        },
        {
            title: "Matn",
            dataIndex: "title",
            key: "title",
            ellipsis: true,
            render: (text: string) => (
                <Tooltip title={text}>{text.length > 30 ? `${text.substring(0, 30)}...` : text}</Tooltip>
            ),
        },
        {
            title: "#id",
            dataIndex: "id",
            key: "body",
            ellipsis: true,
            width: 120
        },
        {
            title: "#UserId",
            dataIndex: "body",
            key: "body",
            ellipsis: true,
            render: (text: string) => (
                <Tooltip title={text}>{text.length > 50 ? `${text.substring(0, 50)}...` : text}</Tooltip>
            ),
        },
    ]

    if (isLoading) {
        return (
            <div style={{ textAlign: "center", padding: "50px" }}>
                <Spin size="large" />
            </div>
        )
    }

    if (isError) {
        return <Alert message="Error loading posts" type="error" />
    }

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys)
    }

    const rowSelection: TableRowSelection<Post> = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    return (
        <>
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={posts}
                rowKey="id"
                size="small"
                pagination={{
                    showSizeChanger: false,
                    showQuickJumper: false,
                    total: posts?.length,
                    itemRender: (page, type, originalElement) => {
                        if (type === "prev") return <a>Oldingi</a>;
                        if (type === "next") return <a>Keyingi</a>;
                        return originalElement;
                    },
                }}
                scroll={{x: true}}
            />


        </>
    )
}

export default PostsTable

