import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <Spin
          indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
          size="large"
        />
        <p className="loading-text">页面加载中，请稍候...</p>
      </div>
    </div>
  );
};

export default Loading;
