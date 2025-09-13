import React, { useState, useEffect } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Space,
  Typography,
  message,
  Select,
  Switch,
} from 'antd';
import { SaveOutlined, ReloadOutlined } from '@ant-design/icons';
import styles from './SystemConfig.module.css';

const { Option } = Select;

// 系统配置数据类型
interface SystemConfig {
  siteName: string;
  siteDescription: string;
  theme: 'light' | 'dark';
  language: 'zh-CN' | 'en-US';
  notifications: boolean;
  autoBackup: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
  maxLoginAttempts: number;
  sessionTimeout: number;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
}

const SystemConfig: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [initialConfig, setInitialConfig] = useState<SystemConfig | null>(null);

  // 模拟获取系统配置
  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    setLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500));

      // 模拟配置数据
      const mockConfig: SystemConfig = {
        siteName: 'UG管理系统',
        siteDescription: '基于UMI + Egg.js的全栈管理系统',
        theme: 'light',
        language: 'zh-CN',
        notifications: true,
        autoBackup: true,
        backupFrequency: 'daily',
        maxLoginAttempts: 5,
        sessionTimeout: 30,
        logLevel: 'info',
      };

      form.setFieldsValue(mockConfig);
      setInitialConfig(mockConfig);
    } catch (error) {
      message.error('获取系统配置失败');
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values: SystemConfig) => {
    setLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));

      message.success('配置保存成功');
      setInitialConfig(values);
    } catch (error) {
      message.error('保存配置失败');
    } finally {
      setLoading(false);
    }
  };

  const onReset = () => {
    if (initialConfig) {
      form.setFieldsValue(initialConfig);
      message.info('已重置为上次保存的配置');
    }
  };

  return (
    <div className={styles.container}>
      <Typography.Title level={3} style={{ marginBottom: 24 }}>
        系统配置
      </Typography.Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          siteName: 'UG管理系统',
          siteDescription: '基于UMI + Egg.js的全栈管理系统',
          theme: 'light',
          language: 'zh-CN',
          notifications: true,
          autoBackup: true,
          backupFrequency: 'daily',
          maxLoginAttempts: 5,
          sessionTimeout: 30,
          logLevel: 'info',
        }}
      >
        <div style={{ marginBottom: 24 }}>
          <Typography.Title level={5} style={{ marginBottom: 16 }}>
            基本信息
          </Typography.Title>
          <Form.Item
            name="siteName"
            label="系统名称"
            rules={[{ required: true, message: '请输入系统名称!' }]}
          >
            <Input placeholder="请输入系统名称" />
          </Form.Item>

          <Form.Item name="siteDescription" label="系统描述">
            <Input.TextArea placeholder="请输入系统描述" rows={3} />
          </Form.Item>
        </div>

        <div style={{ marginBottom: 24 }}>
          <Typography.Title level={5} style={{ marginBottom: 16 }}>
            界面设置
          </Typography.Title>
          <Form.Item name="theme" label="主题">
            <Select>
              <Option value="light">浅色主题</Option>
              <Option value="dark">深色主题</Option>
            </Select>
          </Form.Item>

          <Form.Item name="language" label="语言">
            <Select>
              <Option value="zh-CN">简体中文</Option>
              <Option value="en-US">English</Option>
            </Select>
          </Form.Item>
        </div>

        <div style={{ marginBottom: 24 }}>
          <Typography.Title level={5} style={{ marginBottom: 16 }}>
            功能设置
          </Typography.Title>
          <Form.Item
            name="notifications"
            label="消息通知"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item name="autoBackup" label="自动备份" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prevValues: any, currentValues: any) =>
              prevValues.autoBackup !== currentValues.autoBackup
            }
          >
            {({ getFieldValue }) =>
              getFieldValue('autoBackup') ? (
                <Form.Item name="backupFrequency" label="备份频率">
                  <Select>
                    <Option value="daily">每天</Option>
                    <Option value="weekly">每周</Option>
                    <Option value="monthly">每月</Option>
                  </Select>
                </Form.Item>
              ) : null
            }
          </Form.Item>
        </div>

        <div style={{ marginBottom: 24 }}>
          <Typography.Title level={5} style={{ marginBottom: 16 }}>
            安全设置
          </Typography.Title>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <Form.Item
                name="maxLoginAttempts"
                label="最大登录尝试次数"
                rules={[{ required: true, message: '请输入最大登录尝试次数!' }]}
              >
                <Input type="number" min={1} max={10} />
              </Form.Item>
            </div>
            <div style={{ flex: 1 }}>
              <Form.Item
                name="sessionTimeout"
                label="会话超时时间(分钟)"
                rules={[{ required: true, message: '请输入会话超时时间!' }]}
              >
                <Input type="number" min={1} max={1440} />
              </Form.Item>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <Typography.Title level={5} style={{ marginBottom: 16 }}>
            日志设置
          </Typography.Title>
          <Form.Item name="logLevel" label="日志级别">
            <Select>
              <Option value="debug">调试(Debug)</Option>
              <Option value="info">信息(Info)</Option>
              <Option value="warn">警告(Warn)</Option>
              <Option value="error">错误(Error)</Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<SaveOutlined />}
            >
              保存配置
            </Button>
            <Button
              onClick={onReset}
              loading={loading}
              icon={<ReloadOutlined />}
            >
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SystemConfig;
