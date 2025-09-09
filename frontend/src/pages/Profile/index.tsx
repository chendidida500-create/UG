import { useModel } from '@/utils/umiMock.ts';
import { CameraOutlined, UserOutlined } from '@ant-design/icons';
import
{
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Space,
  Tabs,
  Upload,
} from 'antd';
import { useState } from 'react';

import styles from './index.module.less';

const { TextArea } = Input;

interface ProfileFormData
{
  nickname?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  description?: string;
}

interface PasswordFormData
{
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ProfilePage: React.FC = () =>
{
  const [ activeTab, setActiveTab ] = useState( '1' );
  const [ avatarLoading, setAvatarLoading ] = useState( false );

  const authModel = useModel( 'auth' );
  const { currentUser, updateProfile, updatePassword } = authModel;
  const [ form ] = Form.useForm();

  // 头像上传处理，模拟上传过程
  const handleAvatarUpload = async ( _file: any ) =>
  {
    setAvatarLoading( true );
    try
    {
      // 这里应该调用实际的上传API
      // 模拟上传过程
      await new Promise( resolve => setTimeout( resolve, 1000 ) );

      // 模拟上传成功，更新用户头像
      message.success( '头像上传成功' );
    } catch ( error: any )
    {
      message.error( error.message || '头像上传失败' );
    } finally
    {
      setAvatarLoading( false );
    }
  };

  // 更新个人信息
  const handleUpdateProfile = async ( values: ProfileFormData ) =>
  {
    try
    {
      const result = await updateProfile?.( values );
      if ( result?.success )
      {
        message.success( '个人信息更新成功' );
      } else
      {
        message.error( result?.message || '更新失败' );
      }
    } catch ( error: any )
    {
      message.error( error.message || '更新失败' );
    }
  };

  // 更新密码
  const handleUpdatePassword = async ( values: PasswordFormData ) =>
  {
    if ( values.newPassword !== values.confirmPassword )
    {
      message.error( '两次输入的密码不一致' );
      return;
    }

    try
    {
      const result = await updatePassword?.( {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      } );
      if ( result?.success )
      {
        message.success( '密码更新成功' );
        form.resetFields( [ 'oldPassword', 'newPassword', 'confirmPassword' ] );
      } else
      {
        message.error( result?.message || '密码更新失败' );
      }
    } catch ( error: any )
    {
      message.error( error.message || '密码更新失败' );
    }
  };

  return (
    <div className={ styles.profile }>
      <Row gutter={ 24 }>
        <Col span={ 8 }>
          <Card title="个人信息" className={ styles.infoCard }>
            <div className={ styles.avatarSection }>
              <Upload
                name="avatar"
                showUploadList={ false }
                beforeUpload={ handleAvatarUpload }
                disabled={ avatarLoading }
              >
                <div className={ styles.avatarWrapper }>
                  <img
                    src={ currentUser?.avatar || '/default-avatar.png' }
                    alt="avatar"
                    className={ styles.avatar }
                  />
                  <div className={ styles.avatarOverlay }>
                    <CameraOutlined />
                    <div>更换头像</div>
                  </div>
                </div>
              </Upload>
            </div>
            <div className={ styles.userInfo }>
              <p>
                <UserOutlined /> 用户名: { currentUser?.username }
              </p>
              <p>
                <UserOutlined /> 昵称: { currentUser?.nickname || '未设置' }
              </p>
              <p>
                <UserOutlined /> 邮箱: { currentUser?.email || '未设置' }
              </p>
              <p>
                <UserOutlined /> 手机号: { currentUser?.phone || '未设置' }
              </p>
            </div>
          </Card>
        </Col>

        <Col span={ 16 }>
          <Card className={ styles.formCard }>
            <Tabs
              activeKey={ activeTab }
              onChange={ setActiveTab }
              items={ [
                {
                  key: '1',
                  label: '基本信息',
                },
                {
                  key: '2',
                  label: '安全设置',
                },
              ] }
            ></Tabs>

            { activeTab === '1' && (
              <Form
                form={ form }
                layout="vertical"
                initialValues={ {
                  nickname: currentUser?.nickname,
                  email: currentUser?.email,
                  phone: currentUser?.phone,
                } }
                onFinish={ handleUpdateProfile }
              >
                <Form.Item label="昵称" name="nickname">
                  <Input placeholder="请输入昵称" />
                </Form.Item>

                <Form.Item
                  label="邮箱"
                  name="email"
                  rules={ [ { type: 'email', message: '请输入有效的邮箱地址' } ] }
                >
                  <Input placeholder="请输入邮箱" />
                </Form.Item>

                <Form.Item label="手机号" name="phone">
                  <Input placeholder="请输入手机号" />
                </Form.Item>

                <Form.Item label="个人简介" name="description">
                  <TextArea placeholder="请输入个人简介" rows={ 4 } />
                </Form.Item>

                <Form.Item>
                  <Space>
                    <Button type="primary" htmlType="submit">
                      保存
                    </Button>
                    <Button
                      htmlType="button"
                      onClick={ () => form.resetFields() }
                    >
                      重置
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            ) }

            { activeTab === '2' && (
              <Form
                form={ form }
                layout="vertical"
                onFinish={ handleUpdatePassword }
              >
                <Form.Item
                  label="原密码"
                  name="oldPassword"
                  rules={ [ { required: true, message: '请输入原密码' } ] }
                >
                  <Input.Password placeholder="请输入原密码" />
                </Form.Item>

                <Form.Item
                  label="新密码"
                  name="newPassword"
                  rules={ [ { required: true, message: '请输入新密码' } ] }
                >
                  <Input.Password placeholder="请输入新密码" />
                </Form.Item>

                <Form.Item
                  label="确认密码"
                  name="confirmPassword"
                  rules={ [ { required: true, message: '请确认新密码' } ] }
                >
                  <Input.Password placeholder="请再次输入新密码" />
                </Form.Item>

                <Form.Item>
                  <Space>
                    <Button type="primary" htmlType="submit">
                      修改密码
                    </Button>
                    <Button
                      htmlType="button"
                      onClick={ () => form.resetFields() }
                    >
                      重置
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            ) }
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
