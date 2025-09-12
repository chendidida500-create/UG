import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Switch,
  Select,
  message,
  Space,
  Typography,
  Divider,
} from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import styles from './SystemSettings.module.css';

const { Title, Text } = Typography;
const { Option } = Select;

const SystemSettings: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // 模拟保存设置
      console.log('保存设置:', values);
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('设置保存成功');
    } catch (error) {
      message.error('保存设置失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card>
        <Title level={3}>系统设置</Title>
        <Divider />

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
            autoBackup: false,
            backupFrequency: 'daily',
          }}
        >
          <Title level={4}>基本信息</Title>
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

          <Divider />

          <Title level={4}>界面设置</Title>
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

          <Divider />

          <Title level={4}>功能设置</Title>
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
            shouldUpdate={(prevValues, currentValues) =>
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

          <Divider />

          <Form.Item>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<SaveOutlined />}
              >
                保存设置
              </Button>
              <Button onClick={() => form.resetFields()}>重置</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SystemSettings;
