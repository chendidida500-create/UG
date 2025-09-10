import React from 'react';
import { Card, Form, Input, Button, Space } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import styles from './Register.module.css';

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirm: string;
}

const Register: React.FC = () => {
  const onFinish = (values: RegisterFormValues) => {
    // 在实际应用中，这里应该调用注册API
    // 临时使用console.log来显示表单值
    /* eslint-disable no-console */
    console.log('Received values of form: ', values);
    /* eslint-enable no-console */
  };

  return (
    <Card title="用户注册" className={styles.registerCard}>
      <Form
        name="normal_register"
        className={styles.registerForm}
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
          name="email"
          rules={[{ required: true, message: '请输入邮箱地址!' }]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="邮箱地址"
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
        <Form.Item
          name="confirm"
          dependencies={['password']}
          rules={[
            { required: true, message: '请确认密码!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次输入的密码不一致!'));
              },
            }),
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="确认密码"
          />
        </Form.Item>

        <Form.Item>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.registerFormButton}
            >
              注册
            </Button>
            或 <a href="/auth/login">已有账户，立即登录!</a>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Register;
