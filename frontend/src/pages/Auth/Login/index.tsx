import { useModel } from '@/utils/umiMock.ts';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message, Tabs } from 'antd';
import { useState } from 'react';
// 修复UMI 4.x导入方式 - 从umi导入路由相关hook而不是react-router-dom
import { useLocation, useNavigate } from 'umi';
import styles from './index.module.less';

interface LoginFormData
{
  username: string;
  password: string;
  remember: boolean;
}

const LoginPage: React.FC = () =>
{
  const [ loading, setLoading ] = useState( false );

  const authModel = useModel( 'auth' );
  const { login } = authModel;
  const navigate = useNavigate();
  const location = useLocation();

  // 获取重定向路径
  const redirectPath =
    new URLSearchParams( location.search ).get( 'redirect' ) || '/';

  const handleLogin = async ( values: LoginFormData ) =>
  {
    setLoading( true );
    try
    {
      const result = await login?.( values );
      if ( result?.success )
      {
        message.success( '登录成功' );
        // 跳转到重定向路径或首页
        navigate( redirectPath );
      } else
      {
        message.error( result?.message || '登录失败' );
      }
    } catch ( error: any )
    {
      message.error( error.message || '登录失败' );
    } finally
    {
      setLoading( false );
    }
  };

  return (
    <div className={ styles.container }>
      <div className={ styles.loginForm }>
        <div className={ styles.logo }>
          <img src="/logo.png" alt="Logo" />
          <h1>UG管理系统</h1>
        </div>

        <Tabs
          items={ [
            {
              key: 'account',
              label: '账户密码登录',
            },
          ] }
        >
          <Form
            name="login"
            onFinish={ handleLogin }
            initialValues={ {
              remember: true,
            } }
          >
            <Form.Item
              name="username"
              rules={ [ { required: true, message: '请输入用户名!' } ] }
            >
              <Input
                prefix={ <UserOutlined /> }
                placeholder="用户名"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={ [ { required: true, message: '请输入密码!' } ] }
            >
              <Input
                prefix={ <LockOutlined /> }
                type="password"
                placeholder="密码"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住我</Checkbox>
              </Form.Item>

              <a className={ styles.forgotPassword } href="">
                忘记密码
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={ loading }
                size="large"
                block
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginPage;
