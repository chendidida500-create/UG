import React from 'react';
import { useAccess, Access } from 'umi';
import { Card, Typography, Tag, Button, Space, message } from 'antd';
import { Helmet } from 'umi';

const PermissionTest: React.FC = () => {
  const access = useAccess();

  const checkPermission = (permission: string) => {
    switch (permission) {
      case 'admin':
        return access.isAdmin;
      case 'userManage':
        return access.canUserManage;
      case 'roleManage':
        return access.canRoleManage;
      case 'permissionManage':
        return access.canPermissionManage;
      case 'systemMonitor':
        return access.canSystemMonitor;
      case 'viewReports':
        return access.canViewReports;
      default:
        return false;
    }
  };

  const permissions = [
    { key: 'admin', name: '管理员权限' },
    { key: 'userManage', name: '用户管理权限' },
    { key: 'roleManage', name: '角色管理权限' },
    { key: 'permissionManage', name: '权限管理权限' },
    { key: 'systemMonitor', name: '系统监控权限' },
    { key: 'viewReports', name: '查看报表权限' },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Helmet>
        <title>权限测试</title>
      </Helmet>
      <Typography.Title level={3}>权限测试页面</Typography.Title>
      
      <Card title="您的权限">
        <Space wrap>
          {permissions.map((permission) => (
            <Tag 
              key={permission.key} 
              color={checkPermission(permission.key) ? 'green' : 'red'}
            >
              {permission.name}
            </Tag>
          ))}
        </Space>
      </Card>

      <Card title="权限控制示例" style={{ marginTop: 24 }}>
        <Space>
          <Access accessible={access.isAdmin}>
            <Button type="primary">管理员专用按钮</Button>
          </Access>
          
          <Access accessible={access.canUserManage}>
            <Button type="primary" danger>用户管理按钮</Button>
          </Access>
          
          <Access 
            accessible={access.canViewReports}
            fallback={<Button disabled>您没有查看报表的权限</Button>}
          >
            <Button type="dashed">查看报表按钮</Button>
          </Access>
        </Space>
      </Card>

      <Card title="权限检查" style={{ marginTop: 24 }}>
        <Space>
          <Button 
            onClick={() => message.info(`管理员权限: ${access.isAdmin ? '有' : '无'}`)}
          >
            检查管理员权限
          </Button>
          
          <Button 
            onClick={() => message.info(`用户管理权限: ${access.canUserManage ? '有' : '无'}`)}
          >
            检查用户管理权限
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default PermissionTest;