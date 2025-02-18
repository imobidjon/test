import React from "react"
import { Form, Input, Button, Card, message } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import type { LoginFormData } from "../../types/auth"
import { authService } from "../../services/auth.service"
import styles from "./LoginForm.module.css"
import { useNavigate } from "react-router-dom"

const LoginForm: React.FC = () => {
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate()

  React.useEffect(() => {
    // Check if user is already logged in
    if (authService.isAuthenticated()) {
      navigate("/home")
    }
  }, [navigate])

  const onFinish = async (values: LoginFormData) => {
    try {
      setLoading(true)
      await authService.login(values)
      message.success("Login successful!")
      navigate("/home") 
    } catch (error) {
      message.error("Invalid credentials")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}></div>
      <Card className={styles.formCard}>
        <div className={styles.form}>
          <h1 className={styles.title}>Sign in</h1>
          <Form name="login" onFinish={onFinish} layout="vertical" size="large">
            <Form.Item label="Email" name="login"  rules={[{ message: "Please input your login!", type: 'email', required: true }]}>
              <Input suffix={<UserOutlined />} placeholder="Please write login" />
            </Form.Item>

            <Form.Item label="Password" name="password" rules={[{ message: "Please input your password!" , required: true}]}>
              <Input.Password placeholder="Please write password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className={styles.submitButton} loading={loading} block>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  )
}

export default LoginForm

