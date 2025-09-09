// 修复UMI 4.x导入方式
import { Button, Result } from 'antd';
// 从umi导入路由相关hook而不是react-router-dom
import { useNavigate } from 'umi';

const NotFoundPage: React.FC = () =>
{
  const navigate = useNavigate();

  const handleBackHome = () =>
  {
    navigate( '/' );
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，您访问的页面不存在。"
      extra={
        <Button type="primary" onClick={ handleBackHome }>
          返回首页
        </Button>
      }
    />
  );
};

export default NotFoundPage;
