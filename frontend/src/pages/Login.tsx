import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Checkbox,
  Space,
  Typography,
  message,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Helmet, history, useModel } from 'umi';
import styles from './Login.module.css';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { initialState, setInitialState } = useModel('@@initialState');

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // 调用登录API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (result.success) {
        message.success('登录成功');
        
        // 保存token
        localStorage.setItem('token', result.data.token);
        
        // 更新全局状态
        setInitialState({
          ...initialState,
          currentUser: result.data.user,
        });
        
        // 跳转到仪表盘
        history.push('/dashboard');
      } else {
        message.error(result.message || '登录失败，请检查用户名和密码');
      }
    } catch (error) {
      message.error('登录失败，请检查网络连接');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Helmet>
        <title>登录</title>
      </Helmet>
      <Card className={styles.card}>
        <Space direction="vertical" size="large" className={styles.content}>
          <div className={styles.header}>
            <Typography.Title level={2}>UG管理系统</Typography.Title>
            <p>请登录您的账户</p>
          </div>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名!' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="用户名"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="密码"
                size="large"
              />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>记住我</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                block
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </div>
  );
};

export default Login;