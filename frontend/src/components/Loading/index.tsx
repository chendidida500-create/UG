import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';
import styles from './index.module.less';

// 自定义加载图标
const antIcon = <LoadingOutlined className={styles.loadingIcon} spin />;

interface LoadingProps {
  tip?: string;
  size?: 'small' | 'default' | 'large';
  spinning?: boolean;
  children?: React.ReactNode;
  className?: string;
}

// 通用加载组件，用于路由懒加载和数据加载
const Loading: React.FC<LoadingProps> = ({
  tip = '加载中...',
  size = 'default',
  spinning = true,
  children,
  className,
}) => {
  if (children) {
    return (
      <Spin indicator={antIcon} spinning={spinning} tip={tip} size={size}>
        {children}
      </Spin>
    );
  }

  const containerClass = className
    ? `${styles.loadingContainer} ${className}`
    : styles.loadingContainer;

  return (
    <div className={containerClass}>
      <Spin indicator={antIcon} spinning={spinning} tip={tip} size={size} />
    </div>
  );
};

export default Loading;
