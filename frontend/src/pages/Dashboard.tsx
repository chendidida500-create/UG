import React from 'react';
import { Card, Space, Typography } from 'antd';
import styles from './Dashboard.module.css';

const { Title, Paragraph } = Typography;

const Dashboard: React.FC = () => {
  return (
    <div className={styles.container}>
      <Card>
        <Space direction="vertical" size="large" className={styles.content}>
          <Title level={2}>欢迎使用UG管理系统</Title>
          <Paragraph>
            这是一个基于UMI + Egg.js的全栈管理系统。
          </Paragraph>
          <Paragraph>
            前端技术栈：
            <ul>
              <li>UMI 4.x</li>
              <li>React 18</li>
              <li>Ant Design 5.x</li>
              <li>TypeScript</li>
            </ul>
          </Paragraph>
          <Paragraph>
            后端技术栈：
            <ul>
              <li>Egg.js 3.x</li>
              <li>MySQL 8.0</li>
              <li>Sequelize 6.x</li>
              <li>JWT认证</li>
            </ul>
          </Paragraph>
        </Space>
      </Card>
    </div>
  );
};

export default Dashboard;