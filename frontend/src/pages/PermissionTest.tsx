import React from 'react';
import { Card, Typography, Tag, Button, Space, message } from 'antd';
import { Helmet } from 'umi';

const PermissionTest: React.FC = () => {
  // 模拟权限加载状态
  const isLoading = true;
  
  return (
    <div style={{ padding: 24 }}>
      <Helmet>
        <title>权限测试</title>
      </Helmet>
      <Typography.Title level={3}>权限测试页面</Typography.Title>
      
      <Card title="您的权限">
        <Space wrap>
          {isLoading ? (
            <Tag color="blue">加载中...</Tag>
          ) : (
            <Tag color="red">暂无权限信息</Tag>
          )}
        </Space>
      </Card>

      <Card title="权限控制示例" style={{ marginTop: 24 }}>
        <Space>
          <Button type="primary" disabled>管理员专用按钮</Button>
          <Button type="primary" danger disabled>用户管理按钮</Button>
          <Button type="dashed" disabled>查看报表按钮</Button>
        </Space>
      </Card>

      <Card title="权限检查" style={{ marginTop: 24 }}>
        <Space>
          <Button 
            onClick={() => message.info('权限检查功能需要集成权限系统后才能使用')}
          >
            检查管理员权限
          </Button>
          
          <Button 
            onClick={() => message.info('权限检查功能需要集成权限系统后才能使用')}
          >
            检查用户管理权限
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default PermissionTest;