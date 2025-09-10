import React from 'react';
import { Card, Space, Typography } from 'antd';

const { Title } = Typography;

const Permission: React.FC = () => {
  return (
    <Card>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>权限管理</Title>
        <p>权限管理页面</p>
      </Space>
    </Card>
  );
};

export default Permission;
