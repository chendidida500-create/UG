import { Button, Card, Cascader, Checkbox, Col, DatePicker, Form, Input, InputNumber, Radio, Rate, Row, Select, Slider, Space, Switch, TreeSelect, Upload } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import type { FormConfig } from '../../types';

// 导出类型供其他组件使用
export type { FormConfig } from '../../types';

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Dragger } = Upload;

interface DynamicFormProps {
  // 表单配置
  config: FormConfig;

  // 表单初始值
  initialValues?: Record<string, any>;

  // 表单模式
  mode?: 'create' | 'edit' | 'view';

  // 表单提交
  onSubmit?: (values: Record<string, any>) => Promise<void> | void;
  onCancel?: () => void;

  // 自定义渲染
  customRender?: Record<
    string,
    (field: any, form: FormInstance) => React.ReactNode
  >;

  // 字段联动
  onFieldChange?: (
    field: string,
    value: any,
    allValues: Record<string, any>
  ) => void;

  // 表单验证
  onValuesChange?: (changedValues: any, allValues: any) => void;

  // 权限检查
  hasPermission?: (permission: string) => boolean;
}

export interface DynamicFormRef {
  form: FormInstance;
  submit: () => Promise<any>;
  reset: () => void;
  getFieldsValue: () => any;
  setFieldsValue: (values: any) => void;
  validateFields: () => Promise<any>;
}

const DynamicForm = forwardRef<DynamicFormRef, DynamicFormProps>(
  (
    {
      config,
      initialValues,
      mode = 'create',
      onSubmit,
      onCancel,
      customRender = {},
      onFieldChange,
      onValuesChange,
      hasPermission = () => true,
    },
    ref
  ) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState<Record<string, any[]>>({});

    const isReadonly = mode === 'view';

    // 暴露方法给父组件
    useImperativeHandle(ref, () => ({
      form,
      submit: handleSubmit,
      reset: () => form.resetFields(),
      getFieldsValue: () => form.getFieldsValue(),
      setFieldsValue: (values: any) => form.setFieldsValue(values),
      validateFields: () => form.validateFields(),
    }));

    // 初始化表单值
    useEffect(() => {
      if (initialValues) {
        form.setFieldsValue(initialValues);
      }
    }, [initialValues, form]);

    // 处理表单提交
    const handleSubmit = async () => {
      try {
        const values = await form.validateFields();
        setLoading(true);
        await onSubmit?.(values);
        message.success(`${mode === 'create' ? '创建' : '更新'}成功`);
      } catch (error: any) {
        console.error('Form validation failed:', error);
        if (error.message) {
          message.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    // 处理字段变化
    const handleValuesChange = (changedValues: any, allValues: any) => {
      onValuesChange?.(changedValues, allValues);

      // 处理字段联动
      Object.keys(changedValues).forEach(fieldKey => {
        onFieldChange?.(fieldKey, changedValues[fieldKey], allValues);
      });
    };

    // 获取字段验证规则
    const getFieldRules = (field: any) => {
      const rules: any[] = [];

      if (field.required) {
        rules.push({
          required: true,
          message: `请${getFieldInputText(field.type)}${field.label}`,
        });
      }

      if (field.rules) {
        rules.push(...field.rules);
      }

      return rules;
    };

    // 获取输入提示文本
    const getFieldInputText = (type: string) => {
      const inputTexts: Record<string, string> = {
        input: '输入',
        textarea: '输入',
        password: '输入',
        number: '输入',
        select: '选择',
        radio: '选择',
        checkbox: '选择',
        date: '选择',
        upload: '上传',
      };

      return inputTexts[type] || '输入';
    };

    // 渲染表单字段
    const renderFormField = (field: any): React.ReactNode => {
      const { key, type, label, placeholder, options = [], props = {} } = field;

      // 检查字段权限
      if (field.permission && !hasPermission(field.permission)) {
        return null;
      }

      // 自定义渲染
      if (customRender[key]) {
        return customRender[key](field, form);
      }

      const commonProps = {
        placeholder: placeholder || `请${getFieldInputText(type)}${label}`,
        disabled: isReadonly,
        ...props,
      };

      switch (type) {
        case 'input':
          return <Input {...commonProps} />;

        case 'password':
          return <Input.Password {...commonProps} />;

        case 'textarea':
          return (
            <TextArea
              {...commonProps}
              rows={4}
              showCount
              maxLength={props.maxLength || 500}
            />
          );

        case 'number':
          return (
            <InputNumber
              {...commonProps}
              style={{ width: '100%' }}
              min={props.min}
              max={props.max}
              precision={props.precision}
            />
          );

        case 'select':
          return (
            <Select
              {...commonProps}
              mode={props.mode}
              allowClear={props.allowClear !== false}
              showSearch={props.showSearch}
            >
              {options.map((option: any) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          );

        case 'radio':
          return (
            <Radio.Group {...commonProps}>
              {options.map((option: any) => (
                <Radio key={option.value} value={option.value}>
                  {option.label}
                </Radio>
              ))}
            </Radio.Group>
          );

        case 'checkbox':
          if (props.mode === 'group') {
            return (
              <Checkbox.Group {...commonProps}>
                {options.map((option: any) => (
                  <Checkbox key={option.value} value={option.value}>
                    {option.label}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            );
          }
          return <Checkbox {...commonProps}>{props.text || label}</Checkbox>;

        case 'date':
          if (props.mode === 'range') {
            return <RangePicker {...commonProps} />;
          }
          return <DatePicker {...commonProps} style={{ width: '100%' }} />;

        case 'time':
          return <TimePicker {...commonProps} style={{ width: '100%' }} />;

        case 'switch':
          return (
            <Switch
              {...commonProps}
              checkedChildren={props.checkedChildren}
              unCheckedChildren={props.unCheckedChildren}
            />
          );

        case 'rate':
          return (
            <Rate
              {...commonProps}
              allowHalf={props.allowHalf}
              count={props.count || 5}
            />
          );

        case 'slider':
          return (
            <Slider
              {...commonProps}
              range={props.range}
              min={props.min || 0}
              max={props.max || 100}
              step={props.step || 1}
            />
          );

        case 'upload':
          const uploadProps = {
            ...commonProps,
            fileList: fileList[key] || [],
            onChange: (info: any) => {
              setFileList(prev => ({ ...prev, [key]: info.fileList }));
            },
            beforeUpload: () => false, // 阻止自动上传
          };

          if (props.dragger) {
            return (
              <Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
                <p className="ant-upload-hint">{props.hint}</p>
              </Dragger>
            );
          }

          return (
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>
                {props.buttonText || '选择文件'}
              </Button>
            </Upload>
          );

        case 'cascader':
          return (
            <Cascader
              {...commonProps}
              options={options}
              showSearch={props.showSearch}
              changeOnSelect={props.changeOnSelect}
            />
          );

        case 'tree-select':
          return (
            <TreeSelect
              {...commonProps}
              treeData={options}
              showSearch={props.showSearch}
              treeCheckable={props.treeCheckable}
              multiple={props.multiple}
            />
          );

        default:
          return <Input {...commonProps} />;
      }
    };

    // 渲染表单项
    const renderFormItem = (field: any) => {
      const rules = getFieldRules(field);

      return (
        <Form.Item
          key={field.key}
          name={field.key}
          label={field.label}
          rules={rules}
          tooltip={field.tooltip}
          extra={field.extra}
          hidden={field.hidden}
          valuePropName={
            field.type === 'checkbox' && !field.props?.mode
              ? 'checked'
              : 'value'
          }
        >
          {renderFormField(field)}
        </Form.Item>
      );
    };

    // 分组渲染字段
    const renderFieldsByGroup = () => {
      if (!config.fieldGroups) {
        // 没有分组，直接渲染所有字段
        return config.fields.map(field => (
          <Col span={field.span || 24} key={field.key}>
            {renderFormItem(field)}
          </Col>
        ));
      }

      // 按分组渲染
      return config.fieldGroups.map((group, index) => (
        <div key={group.key || index}>
          {group.title && <Divider orientation="left">{group.title}</Divider>}
          <Row gutter={16}>
            {group.fields.map(fieldKey => {
              const field = config.fields.find(f => f.key === fieldKey);
              if (!field) return null;

              return (
                <Col span={field.span || 24} key={field.key}>
                  {renderFormItem(field)}
                </Col>
              );
            })}
          </Row>
        </div>
      ));
    };

    return (
      <Card>
        <Form
          form={form}
          layout={config.layout || 'vertical'}
          labelCol={config.labelCol}
          wrapperCol={config.wrapperCol}
          onValuesChange={handleValuesChange}
          disabled={isReadonly}
        >
          <Row gutter={16}>{renderFieldsByGroup()}</Row>

          {!isReadonly && (
            <Form.Item>
              <Space className="w-full justify-center">
                <Button type="primary" loading={loading} onClick={handleSubmit}>
                  {mode === 'create' ? '创建' : '保存'}
                </Button>
                {onCancel && <Button onClick={onCancel}>取消</Button>}
              </Space>
            </Form.Item>
          )}
        </Form>
      </Card>
    );
  }
);

export default DynamicForm;

// 为组件添加displayName
(DynamicForm as any).displayName = 'DynamicForm';
