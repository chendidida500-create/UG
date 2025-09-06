import { uploadRequest } from '@/utils/request';
import {
  CalendarOutlined,
  CameraOutlined,
  HistoryOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Form,
  Input,
  List,
  message,
  Modal,
  Row,
  Space,
  Tabs,
  Tag,
  Upload
} from 'antd';
import React, { useEffect, useState } from 'react';
// 修复UMI 4.x导入方式
// import { useModel } from 'umi';
import { useModel } from '../../utils/umiMock';
import styles from './index.module.less';

const { TabPane } = Tabs;
const { TextArea } = Input;

interface ProfileForm {
  username: string;
  email: string;
  phone?: string;
  realName?: string;
  department?: string;
  position?: string;
  bio?: string;
}

interface PasswordForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Profile: React.FC = () => {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);

  const authModel = useModel('auth');
  const { currentUser, checkAuth, changePassword } = authModel || {};

  // 初始化表单数据
  useEffect(() => {
    if (currentUser) {
      form.setFieldsValue({
        username: currentUser.username,
        email: currentUser.email,
        phone: (currentUser as any).phone || '', // 使用空字符串作为默认值
        // 其他字段根据实际数据结构设置
      });
    }
  }, [currentUser, form]);

  // 更新个人信息
  const handleUpdateProfile = async (values: ProfileForm) => {
    setLoading(true);
    try {
      // 调用更新接口
      // await updateProfile(values);
      message.success('个人信息更新成功');
      if (checkAuth) {
        checkAuth(); // 刷新用户信息
      }
    } catch (error: any) {
      message.error(error.message || '更新失败');
    } finally {
      setLoading(false);
    }
  };

  // 修改密码
  const handleChangePassword = async (values: PasswordForm) => {
    setPasswordLoading(true);
    try {
      await changePassword?.(values.oldPassword, values.newPassword);
      setPasswordModalVisible(false);
      passwordForm.resetFields();
    } catch (error: any) {
      message.error(error.message || '密码修改失败');
    } finally {
      setPasswordLoading(false);
    }
  };

  // 头像上传
  const handleAvatarUpload = async (file: File) => {
    setUploadLoading(true);
    try {
      const response: any = await uploadRequest('/api/upload/avatar', file);
      if (response && response.success) {
        message.success('头像上传成功');
        if (checkAuth) {
          checkAuth(); // 刷新用户信息
        }
      } else {
        throw new Error(response?.message || '上传失败');
      }
    } catch (error: any) {
      message.error(error.message || '头像上传失败');
    } finally {
      setUploadLoading(false);
    }
  };

  // 密码验证
  const validateConfirmPassword = (_: any, value: string) => {
    if (!value) {
      return Promise.reject('请确认新密码');
    }
    if (value !== passwordForm.getFieldValue('newPassword')) {
      return Promise.reject('两次密码输入不一致');
    }
    return Promise.resolve();
  };

  // 登录历史模拟数据
  const loginHistory = [
    {
      id: '1',
      time: '2024-09-06 14:30:25',
      ip: '192.168.1.100',
      location: '北京市',
      device: 'Chrome 浏览器',
      status: 'success',
    },
    {
      id: '2',
      time: '2024-09-06 09:15:10',
      ip: '192.168.1.100',
      location: '北京市',
      device: 'Chrome 浏览器',
      status: 'success',
    },
    {
      id: '3',
      time: '2024-09-05 18:45:33',
      ip: '192.168.1.100',
      location: '北京市',
      device: 'Chrome 浏览器',
      status: 'success',
    },
  ];

  return (
    <div className={styles.container}>
      <Row gutter={24}>
        {/* 左侧个人信息卡片 */}
        <Col xs={24} lg={8}>
          <Card className={styles.profileCard}>
            <div className={styles.avatarSection}>
              <Upload
                showUploadList={false}
                beforeUpload={(file: any) => {
                  handleAvatarUpload(file);
                  return false;
                }}
                accept="image/*"
              >
                <div className={styles.avatarWrapper}>
                  <Avatar
                    size={120}
                    src={currentUser?.avatar}
                    icon={<UserOutlined />}
                    className={styles.avatar}
                  />
                  <div className={styles.avatarOverlay}>
                    <CameraOutlined />
                  </div>
                </div>
              </Upload>
              <h3 className={styles.username}>{currentUser?.username}</h3>
              <p className={styles.email}>{currentUser?.email}</p>
            </div>

            <Divider />

            <Descriptions column={1} size="small">
              <Descriptions.Item
                label={<><PhoneOutlined /> 手机号</>}
              >
                {(currentUser as any)?.phone || '未设置'}
              </Descriptions.Item>
              <Descriptions.Item
                label={<><MailOutlined /> 邮箱</>}
              >
                {currentUser?.email}
              </Descriptions.Item>
              <Descriptions.Item
                label={<><CalendarOutlined /> 注册时间</>}
              >
                {currentUser?.created_at ? new Date(currentUser.created_at).toLocaleDateString() : '-'}
              </Descriptions.Item>
              <Descriptions.Item
                label={<><HistoryOutlined /> 最后登录</>}
              >
                {currentUser && 'lastLoginTime' in currentUser && (currentUser as any).lastLoginTime ?
                  new Date((currentUser as any).lastLoginTime).toLocaleString() : '-'}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <div className={styles.roleSection}>
              <h4>用户角色</h4>
              <Space size={[0, 8]} wrap>
                {currentUser?.roles?.map((role: any) => (
                  <Tag key={role} color="blue">{role}</Tag>
                ))}
              </Space>
            </div>
          </Card>
        </Col>

        {/* 右侧内容区域 */}
        <Col xs={24} lg={16}>
          <Card>
            <Tabs defaultActiveKey="profile">
              <TabPane
                tab={<><UserOutlined /> 基本信息</>}
                key="profile"
              >
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleUpdateProfile}
                  className={styles.form}
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="username"
                        label="用户名"
                        rules={[
                          { required: true, message: '请输入用户名' },
                          { min: 3, max: 20, message: '用户名长度为3-20个字符' },
                        ]}
                      >
                        <Input placeholder="请输入用户名" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="email"
                        label="邮箱"
                        rules={[
                          { required: true, message: '请输入邮箱' },
                          { type: 'email', message: '请输入有效的邮箱地址' },
                        ]}
                      >
                        <Input placeholder="请输入邮箱地址" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item name="phone" label="手机号">
                        <Input placeholder="请输入手机号" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="realName" label="真实姓名">
                        <Input placeholder="请输入真实姓名" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item name="department" label="所属部门">
                        <Input placeholder="请输入所属部门" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="position" label="职位">
                        <Input placeholder="请输入职位" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item name="bio" label="个人简介">
                    <TextArea
                      rows={4}
                      placeholder="请输入个人简介"
                      maxLength={200}
                      showCount
                    />
                  </Form.Item>

                  <Form.Item>
                    <Space>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                      >
                        保存更改
                      </Button>
                      <Button
                        icon={<LockOutlined />}
                        onClick={() => setPasswordModalVisible(true)}
                      >
                        修改密码
                      </Button>
                    </Space>
                  </Form.Item>
                </Form>
              </TabPane>

              <TabPane
                tab={<><HistoryOutlined /> 登录历史</>}
                key="history"
              >
                <List
                  dataSource={loginHistory}
                  renderItem={(item: any) => (
                    <List.Item>
                      <List.Item.Meta
                        title={
                          <Space>
                            <span>{item.time}</span>
                            <Tag color={item.status === 'success' ? 'success' : 'error'}>
                              {item.status === 'success' ? '成功' : '失败'}
                            </Tag>
                          </Space>
                        }
                        description={
                          <Space>
                            <span>IP: {item.ip}</span>
                            <span>地点: {item.location}</span>
                            <span>设备: {item.device}</span>
                          </Space>
                        }
                      />
                    </List.Item>
                  )}
                />
              </TabPane>

              <TabPane
                tab={<><SettingOutlined /> 安全设置</>}
                key="security"
              >
                <div className={styles.securitySettings}>
                  <div className={styles.securityItem}>
                    <div className={styles.securityInfo}>
                      <h4>登录密码</h4>
                      <p>定期更换密码可以提高账户安全性</p>
                    </div>
                    <Button
                      type="primary"
                      onClick={() => setPasswordModalVisible(true)}
                    >
                      修改密码
                    </Button>
                  </div>

                  <div className={styles.securityItem}>
                    <div className={styles.securityInfo}>
                      <h4>双因素认证</h4>
                      <p>开启双因素认证，保护账户安全</p>
                    </div>
                    <Button>开启</Button>
                  </div>

                  <div className={styles.securityItem}>
                    <div className={styles.securityInfo}>
                      <h4>邮箱验证</h4>
                      <p>绑定邮箱用于找回密码和安全通知</p>
                    </div>
                    <Tag color="success">已验证</Tag>
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>

      {/* 修改密码模态框 */}
      <Modal
        title="修改密码"
        open={passwordModalVisible}
        onCancel={() => {
          setPasswordModalVisible(false);
          passwordForm.resetFields();
        }}
        footer={null}
        destroyOnClose
      >
        <Form
          form={passwordForm}
          layout="vertical"
          onFinish={handleChangePassword}
        >
          <Form.Item
            name="oldPassword"
            label="当前密码"
            rules={[{ required: true, message: '请输入当前密码' }]}
          >
            <Input.Password placeholder="请输入当前密码" />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="新密码"
            rules={[
              { required: true, message: '请输入新密码' },
              { min: 6, message: '密码长度至少6位' },
            ]}
          >
            <Input.Password placeholder="请输入新密码" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="确认新密码"
            rules={[{ validator: validateConfirmPassword }]}
          >
            <Input.Password placeholder="请再次输入新密码" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                loading={passwordLoading}
              >
                确认修改
              </Button>
              <Button
                onClick={() => {
                  setPasswordModalVisible(false);
                  passwordForm.resetFields();
                }}
              >
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Profile;