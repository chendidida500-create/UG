import React from 'react';
import { Card, Form, Input, Button, Checkbox, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './Login.module.css';

interface LoginFormValues {
  username: string;
  password: string;
  remember: boolean;
}

const Login: React.FC = () => {
  const onFinish = (values: LoginFormValues) => {
    // 在实际应用中，这里应该调用登录API
    // 临时使用console.log来显示表单值
    /* eslint-disable no-console */
    console.log('Received values of form: ', values);
    /* eslint-enable no-console */
  };

  return (
    <Card title="用户登录" className={styles.loginCard}>
      <Form
        name="normal_login"
        className={styles.loginForm}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="用户名"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <a className={styles.loginFormForgot} href="">
            忘记密码
          </a>
        </Form.Item>

        <Form.Item>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.loginFormButton}
            >
              登录
            </Button>
            或 <a href="/auth/register">立即注册!</a>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;
