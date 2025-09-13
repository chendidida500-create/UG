import React, { useState, useEffect } from 'react';
import {
  Button,
  Space,
  Tag,
  Modal,
  Form,
  Input,
  message,
  Card,
  Typography,
  Select,
  Popconfirm,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './Dictionary.module.css';

const { Option } = Select;

// 字典类型数据类型
interface DictionaryType {
  id: number;
  name: string;
  code: string;
  description: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

// 字典项数据类型
interface DictionaryItem {
  id: number;
  typeId: number;
  typeName: string;
  label: string;
  value: string;
  sort: number;
  status: 'active' | 'inactive';
  remark: string;
  createdAt: string;
}

const Dictionary: React.FC = () => {
  const [dictTypes, setDictTypes] = useState<DictionaryType[]>([]);
  const [dictItems, setDictItems] = useState<DictionaryItem[]>([]);
  // 移除未使用的loading状态
  const [typeModalVisible, setTypeModalVisible] = useState<boolean>(false);
  const [itemModalVisible, setItemModalVisible] = useState<boolean>(false);
  const [editingType, setEditingType] = useState<DictionaryType | null>(null);
  const [editingItem, setEditingItem] = useState<DictionaryItem | null>(null);
  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);
  const [typeForm] = Form.useForm();
  const [itemForm] = Form.useForm();

  // 模拟获取字典类型数据
  useEffect(() => {
    fetchDictTypes();
  }, []);

  const fetchDictTypes = async () => {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500));

      // 模拟数据
      const mockTypes: DictionaryType[] = [
        {
          id: 1,
          name: '用户状态',
          code: 'user_status',
          description: '用户状态字典',
          status: 'active',
          createdAt: '2023-01-15',
        },
        {
          id: 2,
          name: '任务优先级',
          code: 'task_priority',
          description: '任务优先级字典',
          status: 'active',
          createdAt: '2023-01-16',
        },
        {
          id: 3,
          name: '性别',
          code: 'gender',
          description: '性别字典',
          status: 'active',
          createdAt: '2023-01-17',
        },
      ];

      setDictTypes(mockTypes);
    } catch (error) {
      message.error('获取字典类型数据失败');
    }
  };

  const fetchDictItems = async (typeId: number) => {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500));

      // 模拟数据
      const mockItems: DictionaryItem[] = [
        {
          id: 1,
          typeId: 1,
          typeName: '用户状态',
          label: '活跃',
          value: 'active',
          sort: 1,
          status: 'active',
          remark: '用户账户正常',
          createdAt: '2023-01-15',
        },
        {
          id: 2,
          typeId: 1,
          typeName: '用户状态',
          label: '非活跃',
          value: 'inactive',
          sort: 2,
          status: 'active',
          remark: '用户账户被禁用',
          createdAt: '2023-01-15',
        },
        {
          id: 3,
          typeId: 2,
          typeName: '任务优先级',
          label: '低',
          value: 'low',
          sort: 1,
          status: 'active',
          remark: '低优先级任务',
          createdAt: '2023-01-16',
        },
        {
          id: 4,
          typeId: 2,
          typeName: '任务优先级',
          label: '中',
          value: 'medium',
          sort: 2,
          status: 'active',
          remark: '中优先级任务',
          createdAt: '2023-01-16',
        },
        {
          id: 5,
          typeId: 2,
          typeName: '任务优先级',
          label: '高',
          value: 'high',
          sort: 3,
          status: 'active',
          remark: '高优先级任务',
          createdAt: '2023-01-16',
        },
      ];

      const filteredItems = mockItems.filter(item => item.typeId === typeId);
      setDictItems(filteredItems);
      setSelectedTypeId(typeId);
    } catch (error) {
      message.error('获取字典项数据失败');
    }
  };

  const handleAddType = () => {
    setEditingType(null);
    typeForm.resetFields();
    setTypeModalVisible(true);
  };

  const handleEditType = (type: DictionaryType) => {
    setEditingType(type);
    typeForm.setFieldsValue(type);
    setTypeModalVisible(true);
  };

  const handleDeleteType = async (typeId: number) => {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 300));
      setDictTypes(
        dictTypes.filter((type: DictionaryType) => type.id !== typeId)
      );
      message.success('字典类型删除成功');
    } catch (error) {
      message.error('删除字典类型失败');
    }
  };

  const handleAddItem = () => {
    if (!selectedTypeId) {
      message.warning('请先选择字典类型');
      return;
    }
    setEditingItem(null);
    itemForm.resetFields();
    setItemModalVisible(true);
  };

  const handleEditItem = (item: DictionaryItem) => {
    setEditingItem(item);
    itemForm.setFieldsValue(item);
    setItemModalVisible(true);
  };

  const handleDeleteItem = async (itemId: number) => {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 300));
      setDictItems(
        dictItems.filter((item: DictionaryItem) => item.id !== itemId)
      );
      message.success('字典项删除成功');
    } catch (error) {
      message.error('删除字典项失败');
    }
  };

  const handleTypeModalOk = async () => {
    try {
      const values = await typeForm.validateFields();

      if (editingType) {
        // 更新字典类型
        const updatedTypes = dictTypes.map((type: DictionaryType) =>
          type.id === editingType.id ? { ...type, ...values } : type
        );
        setDictTypes(updatedTypes);
        message.success('字典类型更新成功');
      } else {
        // 添加新字典类型
        const newType = {
          id: dictTypes.length + 1,
          ...values,
          createdAt: new Date().toISOString().split('T')[0],
        };
        setDictTypes([...dictTypes, newType]);
        message.success('字典类型添加成功');
      }

      setTypeModalVisible(false);
      typeForm.resetFields();
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  const handleItemModalOk = async () => {
    try {
      const values = await itemForm.validateFields();

      if (editingItem) {
        // 更新字典项
        const updatedItems = dictItems.map((item: DictionaryItem) =>
          item.id === editingItem.id ? { ...item, ...values } : item
        );
        setDictItems(updatedItems);
        message.success('字典项更新成功');
      } else {
        // 添加新字典项
        const selectedType = dictTypes.find(
          (type: DictionaryType) => type.id === selectedTypeId
        );
        const newItem = {
          id: dictItems.length + 1,
          typeId: selectedTypeId || 0,
          typeName: selectedType?.name || '',
          ...values,
          createdAt: new Date().toISOString().split('T')[0],
        };
        setDictItems([...dictItems, newItem]);
        message.success('字典项添加成功');
      }

      setItemModalVisible(false);
      itemForm.resetFields();
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  const handleTypeModalCancel = () => {
    setTypeModalVisible(false);
    typeForm.resetFields();
  };

  const handleItemModalCancel = () => {
    setItemModalVisible(false);
    itemForm.resetFields();
  };

  const getStatusTag = (status: string) => {
    switch (status) {
      case 'active':
        return <Tag color="green">启用</Tag>;
      case 'inactive':
        return <Tag color="red">禁用</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  const typeColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '编码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => getStatusTag(status),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: unknown, record: DictionaryType) => (
        <Space size="middle">
          <Button type="link" onClick={() => fetchDictItems(record.id)}>
            查看字典项
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditType(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确认删除"
            description="确定要删除这个字典类型吗？"
            onConfirm={() => handleDeleteType(record.id)}
            okText="确认"
            cancelText="取消"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const itemColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '标签',
      dataIndex: 'label',
      key: 'label',
    },
    {
      title: '值',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => getStatusTag(status),
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: unknown, record: DictionaryItem) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditItem(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确认删除"
            description="确定要删除这个字典项吗？"
            onConfirm={() => handleDeleteItem(record.id)}
            okText="确认"
            cancelText="取消"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Typography.Title level={3} style={{ marginBottom: 24 }}>
        字典管理
      </Typography.Title>

      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <Card
            title={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography.Title level={5} style={{ margin: 0 }}>
                  字典类型
                </Typography.Title>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleAddType}
                >
                  添加类型
                </Button>
              </div>
            }
          >
            <div style={{ height: 400, overflow: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {typeColumns.map(column => (
                      <th
                        key={column.key}
                        style={{
                          padding: '16px 8px',
                          textAlign: 'left',
                          borderBottom: '1px solid #f0f0f0',
                        }}
                      >
                        {column.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dictTypes.map((type: DictionaryType) => (
                    <tr key={type.id}>
                      {typeColumns.map(column => (
                        <td
                          key={column.key}
                          style={{
                            padding: '16px 8px',
                            borderBottom: '1px solid #f0f0f0',
                          }}
                        >
                          {column.render
                            ? column.render(
                                type[column.dataIndex as keyof DictionaryType],
                                type
                              )
                            : type[column.dataIndex as keyof DictionaryType]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
        <div style={{ flex: 1 }}>
          <Card
            title={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography.Title level={5} style={{ margin: 0 }}>
                  字典项
                </Typography.Title>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleAddItem}
                  disabled={!selectedTypeId}
                >
                  添加字典项
                </Button>
              </div>
            }
          >
            <div style={{ height: 400, overflow: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {itemColumns.map(column => (
                      <th
                        key={column.key}
                        style={{
                          padding: '16px 8px',
                          textAlign: 'left',
                          borderBottom: '1px solid #f0f0f0',
                        }}
                      >
                        {column.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dictItems.map((item: DictionaryItem) => (
                    <tr key={item.id}>
                      {itemColumns.map(column => (
                        <td
                          key={column.key}
                          style={{
                            padding: '16px 8px',
                            borderBottom: '1px solid #f0f0f0',
                          }}
                        >
                          {column.render
                            ? column.render(
                                item[column.dataIndex as keyof DictionaryItem],
                                item
                              )
                            : item[column.dataIndex as keyof DictionaryItem]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      {/* 字典类型模态框 */}
      <Modal
        title={editingType ? '编辑字典类型' : '添加字典类型'}
        open={typeModalVisible}
        onOk={handleTypeModalOk}
        onCancel={handleTypeModalCancel}
        okText="确认"
        cancelText="取消"
      >
        <Form form={typeForm} layout="vertical">
          <Form.Item
            name="name"
            label="名称"
            rules={[{ required: true, message: '请输入名称!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="code"
            label="编码"
            rules={[{ required: true, message: '请输入编码!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="描述"
            rules={[{ required: true, message: '请输入描述!' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态!' }]}
          >
            <Select>
              <Option value="active">启用</Option>
              <Option value="inactive">禁用</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* 字典项模态框 */}
      <Modal
        title={editingItem ? '编辑字典项' : '添加字典项'}
        open={itemModalVisible}
        onOk={handleItemModalOk}
        onCancel={handleItemModalCancel}
        okText="确认"
        cancelText="取消"
      >
        <Form form={itemForm} layout="vertical">
          <Form.Item
            name="label"
            label="标签"
            rules={[{ required: true, message: '请输入标签!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="value"
            label="值"
            rules={[{ required: true, message: '请输入值!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="sort"
            label="排序"
            rules={[{ required: true, message: '请输入排序!' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态!' }]}
          >
            <Select>
              <Option value="active">启用</Option>
              <Option value="inactive">禁用</Option>
            </Select>
          </Form.Item>

          <Form.Item name="remark" label="备注">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Dictionary;
