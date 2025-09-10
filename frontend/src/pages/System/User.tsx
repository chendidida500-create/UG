import React from 'react';
import { Card, Space, Typography } from 'antd';

const { Title } = Typography;

const User: React.FC = () => {
  return (
    <Card>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>用户管理</Title>
        <p>用户管理页面</p>
      </Space>
    </Card>
  );
};

export default User;
