import { Button } from 'antd';
import Result from 'antd/es/result';
import React from 'react';
// 修复UMI 4.x导入方式
import { history } from 'umi';
// import { history } from '../../utils/umiMock';
import styles from './index.module.less';

const NotFound: React.FC = () => {
  return (
    <div className={styles.container}>
      <Result
        status="404"
        title="404"
        subTitle="抱歉，您访问的页面不存在。"
        extra={
          <Button type="primary" onClick={() => history.push('/dashboard')}>
            返回首页
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;
