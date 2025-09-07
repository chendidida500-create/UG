import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Form, Input, message, Row } from 'antd';
import React, { useState } from 'react';
import { history, useModel } from 'umi';
import styles from './index.module.less';

// Steps组件在antd中是存在的，但可能在global.d.ts中没有声明
// 我们直接使用Steps，但需要在global.d.ts中添加声明
const Steps: any = require('antd').Steps;
const { Step } = Steps;

interface RegisterForm {
  username: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  verifyCode?: string;
}

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [sendingCode, setSendingCode] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const authModel = useModel('auth');
  const { register, sendVerifyCode } = authModel || {};

  // 发送验证码
  const handleSendCode = async () => {
    try {
      const email = form.getFieldValue('email');
      if (!email) {
        message.error('请先填写邮箱地址');
        return;
      }

      setSendingCode(true);
      await sendVerifyCode?.(email, 'register');
      message.success('验证码已发送到您的邮箱');

      // 开始倒计时
      let count = 60;
      setCountdown(count);
      const timer = setInterval(() => {
        count--;
        setCountdown(count);
        if (count <= 0) {
          clearInterval(timer);
        }
      }, 1000);
    } catch (error: any) {
      message.error(error.message || '发送验证码失败');
    } finally {
      setSendingCode(false);
    }
  };

  // 注册提交
  const onFinish = async (values: RegisterForm) => {
    setLoading(true);
    try {
      await register?.(values);
      message.success('注册成功！请登录您的账户');
      history.push('/auth/login');
    } catch (error: any) {
      message.error(error.message || '注册失败');
    } finally {
      setLoading(false);
    }
  };

  // 密码强度检查
  const validatePassword = (_: any, value: string) => {
    if (!value) {
      return Promise.reject('请输入密码');
    }
    if (value.length < 6) {
      return Promise.reject('密码长度至少6位');
    }
    if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(value)) {
      return Promise.reject('密码必须包含字母和数字');
    }
    return Promise.resolve();
  };

  // 确认密码验证
  const validateConfirmPassword = (_: any, value: string) => {
    if (!value) {
      return Promise.reject('请确认密码');
    }
    if (value !== form.getFieldValue('password')) {
      return Promise.reject('两次密码输入不一致');
    }
    return Promise.resolve();
  };

  const steps = [
    {
      title: '基本信息',
      content: (
        <>
          <Form.Item
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { min: 3, max: 20, message: '用户名长度为3-20个字符' },
              {
                pattern: /^[a-zA-Z0-9_]+$/,
                message: '用户名只能包含字母、数字和下划线',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名"
              size="large"
              autoComplete="username"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="邮箱地址"
              size="large"
              autoComplete="email"
            />
          </Form.Item>
          <Form.Item name="phone">
            <Input
              prefix={<PhoneOutlined />}
              placeholder="手机号码（可选）"
              size="large"
              autoComplete="tel"
            />
          </Form.Item>
        </>
      ),
    },
    {
      title: '密码设置',
      content: (
        <>
          <Form.Item
            name="password"
            rules={[{ validator: validatePassword }]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
              size="large"
              autoComplete="new-password"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[{ validator: validateConfirmPassword }]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="确认密码"
              size="large"
              autoComplete="new-password"
            />
          </Form.Item>
        </>
      ),
    },
    {
      title: '邮箱验证',
      content: (
        <Form.Item
          name="verifyCode"
          rules={[{ required: true, message: '请输入验证码' }]}
        >
          <Row gutter={8}>
            <Col span={16}>
              <Input placeholder="邮箱验证码" size="large" autoComplete="off" />
            </Col>
            <Col span={8}>
              <Button
                size="large"
                loading={sendingCode}
                disabled={countdown > 0}
                onClick={handleSendCode}
                style={{ width: '100%' }}
              >
                {countdown > 0 ? `${countdown}s` : '发送验证码'}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      ),
    },
  ];

  const next = () => {
    form
      .validateFields()
      .then(() => {
        setCurrentStep(currentStep + 1);
      })
      .catch(() => {
        message.error('请完善表单信息');
      });
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className={styles.container}>
      <Card className={styles.registerCard}>
        <div className={styles.header}>
          <h1>用户注册</h1>
          <p>创建您的账户</p>
        </div>

        <Steps current={currentStep} className={styles.steps}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>

        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          size="large"
          className={styles.form}
        >
          <div className={styles.stepContent}>{steps[currentStep].content}</div>

          <div className={styles.actions}>
            {currentStep > 0 && (
              <Button onClick={prev} className={styles.prevButton}>
                上一步
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={next}>
                下一步
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className={styles.submitButton}
              >
                完成注册
              </Button>
            )}
          </div>
        </Form>

        <div className={styles.footer}>
          <span>已有账户？</span>
          <Button type="link" onClick={() => history.push('/auth/login')}>
            立即登录
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Register;
