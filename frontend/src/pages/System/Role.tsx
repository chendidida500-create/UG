import React from 'react';
import { Card, Space, Typography } from 'antd';

const { Title } = Typography;

const Role: React.FC = () => {
  return (
    <Card>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>角色管理</Title>
        <p>角色管理页面</p>
      </Space>
    </Card>
  );
};

export default Role;
