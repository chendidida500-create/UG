import type { LoginParams } from '@/types';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Form, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
// 修复UMI 4.x导入方式
import { history, useModel } from 'umi';
import styles from './index.less';

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { login, isLoggedIn } = useModel('auth');

  // 如果已登录，直接跳转
  useEffect(() => {
    if (isLoggedIn) {
      history.push('/dashboard');
    }
  }, [isLoggedIn]);

  const handleSubmit = async (values: LoginParams) => {
    setLoading(true);
    try {
      await login(values);
    } catch (error: any) {
      message.error(error.message || '登录失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <img alt="logo" className={styles.logo} src="/logo.png" />
            <span className={styles.title}>UG管理系统</span>
          </div>
          <div className={styles.desc}>基于 UMI + Egg.js 的现代化管理系统</div>
        </div>

        <div className={styles.main}>
          <Card className={styles.loginCard}>
            <Form
              form={form}
              name="login"
              size="large"
              onFinish={handleSubmit}
              autoComplete="off"
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: '请输入用户名!' },
                  { min: 3, message: '用户名至少3个字符' },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="用户名"
                  autoComplete="username"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: '请输入密码!' },
                  { min: 6, message: '密码至少6个字符' },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="密码"
                  autoComplete="current-password"
                />
              </Form.Item>

              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>记住我</Checkbox>
                </Form.Item>
                <a className={styles.forgot} href="/auth/forgot-password">
                  忘记密码
                </a>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles.submit}
                  loading={loading}
                  block
                >
                  登录
                </Button>
              </Form.Item>

              <div className={styles.other}>
                还没有账号？
                <a href="/auth/register">立即注册</a>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;