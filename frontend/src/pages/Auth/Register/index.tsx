import { useModel } from '@/utils/umiMock';
import {
  LockOutlined,
  MailOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, message, Tabs } from 'antd';
import { useState } from 'react';
// 修复UMI 4.x导入方式 - 从umi导入路由相关hook
import { useNavigate } from 'umi';
import styles from './index.module.less';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  nickname?: string;
}

const RegisterPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const authModel = useModel('auth');
  const { register } = authModel;
  const navigate = useNavigate();

  const handleRegister = async (values: RegisterFormData) => {
    if (values.password !== values.confirmPassword) {
      message.error('两次输入的密码不一致');
      return;
    }

    setLoading(true);
    try {
      const result = await register?.(values);
      if (result?.success) {
        message.success('注册成功');
        navigate('/auth/login');
      } else {
        message.error(result?.message || '注册失败');
      }
    } catch (error: any) {
      message.error(error.message || '注册失败');
    } finally {
      setLoading(false);
    }
  };

  const handleGetCaptcha = () => {
    if (countdown > 0) return;

    // 这里应该调用获取验证码的API
    message.success('验证码已发送');
    setCountdown(60);

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.registerForm}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="Logo" />
          <h1>UG管理系统</h1>
        </div>

        <Tabs
          items={[
            {
              key: 'register',
              label: '用户注册',
            },
          ]}
        >
          <Form name="register" onFinish={handleRegister}>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: '请输入用户名!' },
                { min: 3, message: '用户名至少3个字符' },
                { max: 20, message: '用户名最多20个字符' },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="用户名"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: '请输入邮箱!' },
                { type: 'email', message: '请输入有效的邮箱地址!' },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="邮箱"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: '请输入密码!' },
                { min: 6, message: '密码至少6个字符' },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="密码"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              rules={[
                { required: true, message: '请确认密码!' },
                { min: 6, message: '密码至少6个字符' },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="确认密码"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="captcha"
              rules={[{ required: true, message: '请输入验证码!' }]}
            >
              <div className={styles.captchaInput}>
                <Input
                  prefix={<SafetyCertificateOutlined />}
                  placeholder="验证码"
                  size="large"
                />
                <Button
                  onClick={handleGetCaptcha}
                  disabled={countdown > 0}
                  size="large"
                >
                  {countdown > 0 ? `${countdown}秒后重新获取` : '获取验证码'}
                </Button>
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                block
              >
                注册
              </Button>
            </Form.Item>
          </Form>
        </Tabs>
      </div>
    </div>
  );
};

export default RegisterPage;
