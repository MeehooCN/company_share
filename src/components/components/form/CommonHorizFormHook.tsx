/**
 * @description: 公共的表单，
 * @author: cy
 * @createTime: 2020/7/28 14:20
 **/
import { Col, DatePicker, Form, Input, InputNumber, Select, TreeSelect, Radio, Cascader, Row, Button, Space } from 'antd';
import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { Rule } from 'antd/lib/form';
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const { RangePicker } = DatePicker;
export enum IFormItemType {
  Text = 'text',
  TextArea = 'textArea',
  InputBumber = 'inputNumber',
  Password = 'password',
  Select = 'select',
  TreeSelect = 'treeSelect',
  Date = 'date',
  RangeDate = 'rangeDate',
  DateNoTime = 'dateNoTime',
  RangeDateNoTime = 'rangeDateNoTime',
  Radio = 'radio',
  Switch = 'switch',
  Slider = 'slider',
  Cascader = 'cascader',
  Checkbox = 'checkbox',
  Hidden = 'hidden',
  Button = 'button',
}
declare type FormItemType = IFormItemType;
/**
 * @description 表单项
 * @property label 标签名
 * @property name 属性名
 * @property type item输入框的类型
 * @property rules item的校验规则
 * @property disabled 是否禁用
 * @property style item样式
 * @property onChange 输入框的chang事件
 * @property mode select的模式
 * @property option select的option数据或 树形选择的data
 * @property readOnly 是否只读
 * @property rows 文本域textArea的文本框的行数
 * @property minNumber inputNumber 输入的最小数
 * @property maxNumber inputNumber 输入的最大数
 * @property step inputNumber 小数点的位数
 * @property formatter inputNumber 显示的格式化
 * @property multiple treeSelect的选择是否多选
 * @property placeholder 输入框的提示信息
 */
interface IFormColumns {
  label: string,
  name: string,
  type: FormItemType,
  rules: Rule[],
  disabled?: boolean,
  style?: any,
  onChange?: Function,
  mode?: 'multiple' | 'tags',
  option?: any,
  readOnly?: boolean,
  rows?: number,
  minNumber?: number,
  maxNumber?: number,
  step?: number,
  formatter?: any,
  multiple?: boolean,
  initialValue?: any,
  placeholder?: string,
  disabledDate?: any
}
/**
 * @description 公共表单的参数
 * @property formItemLayout label和item的显示布局
 * @property formValue 表单值
 * @property submitLoading 提交时确定按钮添加loading状态
 * @property formColumns 表单项
 * @property footerBtn 是否显示底部按钮
 * @event cancel 取消按钮的操作
 * @event OK 确定按钮的操作
 * @property notReset 点击确定后是否清空表单
 */
interface IProps {
  formColumns: IFormColumns[],
  formValue: any,
  name?: any,
  submitLoading?: boolean,
  formItemLayout?: any,
  inlineSpan?: number,
  footerBtn?: boolean,
  cancel?: () => void,
  OK?: (data: any) => void,
  notReset?: boolean
}
const CommonHorizFormHookItem = (props: IProps, ref?: any) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (props.formValue) {
      form.setFieldsValue(props.formValue);
    } else {
      form.resetFields();
    }
  }, [props.formValue]);
  useImperativeHandle(ref, () => ({
    form: () => form
  }));
  const handleCancel = () => {
    form.resetFields();
    if (props.cancel) props.cancel();

  };
  const onFinish = (values: any) => {
    if (props.notReset && props.OK) {
      props.OK(values);
    } else {
      form.resetFields();
      if (props.OK) {
        props.OK(values);
      }
    }
  };
  const itemLayOut = props.formItemLayout ? props.formItemLayout : {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
      span: 6
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
      span: 18
    },
  };

  const formItems = (item: IFormColumns) => {
    switch (item.type) {
      case 'text': return (<Input disabled={item.disabled} readOnly={item.readOnly} placeholder={item.placeholder} style={item.style} />);
      case 'textArea': return (<TextArea disabled={item.disabled} placeholder={item.placeholder} rows={item.rows} />);
      case 'inputNumber': return (<InputNumber
        placeholder={item.placeholder}
        min={item.minNumber}
        max={item.maxNumber}
        step={item.step}
        disabled={item.disabled}
        style={{ width: '100%' }}
        formatter={item.formatter}
      />);
      case 'password': return (<Input.Password />);
      case 'select': return (<Select
        disabled={item.disabled}
        showSearch={true}
        style={item.style}
        placeholder={item.placeholder}
        mode={item.mode}
        onChange={(value, option) => {
          if (item.onChange) {
            item.onChange(value, option);
          }
        }}
        filterOption={(input: string, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {
          item.option.map((optionItem: any) => (
            <Option key={optionItem.key} disabled={optionItem.disabled ? optionItem.disabled : false} value={optionItem.key}>{optionItem.value}</Option>
          ))
        }
      </Select>);
      case 'treeSelect': return (
        <TreeSelect
          disabled={item.disabled}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder={item.placeholder}
          allowClear
          multiple={item.multiple}
          treeDefaultExpandAll
          onChange={(value, label, extra) => {
            if (item.onChange) {
              item.onChange(value, label, extra);
            }
          }}
          treeData={item.option}
        />
      );
      case 'date': return (<DatePicker showTime disabled={item.disabled} style={{ width: '100%' }} />);
      case 'dateNoTime': return (<DatePicker disabled={item.disabled} disabledDate={item.disabledDate} style={{ width: '100%' }} />);
      case 'rangeDate': return (<RangePicker showTime={{ format: 'HH:mm:ss' }} format="YYYY-MM-DD HH:mm:ss" disabled={item.disabled} style={{ width: '100%' }} />);
      case 'rangeDateNoTime': return (<RangePicker format="YYYY-MM-DD" disabled={item.disabled} style={{ width: '100%' }} />);
      case 'radio': return (
        <RadioGroup disabled={item.disabled} onChange={(e) => {
          if (item.onChange) {
            item.onChange(e);
          }
        }}>
          {
            item.option.map((optionItem: any) => (
              <RadioButton key={optionItem.key} value={optionItem.key}>{optionItem.value}</RadioButton>
            ))
          }
        </RadioGroup>
      );
      case 'cascader': return (
        <Cascader
          options={item.option} placeholder={item.placeholder}
          showSearch={true}
          onChange={(value, selectedOptions) => {
            if (item.onChange) {
              item.onChange(value, selectedOptions);
            }
          }}
        />
      );
      case 'hidden': return (<Input />);
    }
  };
  let columns = props.formColumns.map((item: IFormColumns, index: number) => (
    <Col span={props.inlineSpan || 24} key={index}>
      <Form.Item label={item.label} name={item.name} rules={item.rules} hidden={item.type === 'hidden'} initialValue={item.initialValue}>
        {formItems(item)}
      </Form.Item>
    </Col>
  ));


  return (
    <div>
      <Form {...itemLayOut} form={form} name={props.name || 'hook-form'} onFinish={onFinish} autoComplete="off" >
        <Row>
          {columns}
        </Row>
        {props.footerBtn ? <>
          <div style={{ borderBottom: '1px solid #f0f0f0', margin: '16px -24px', height: 1 }}></div>
          <Row justify="end">
            <Space>
              <Button onClick={handleCancel}>取消</Button>
              <Button type="primary" loading={props.submitLoading} htmlType="submit" >确定</Button>
            </Space>
          </Row>
        </> : ''}
      </Form>
    </div>
  );
};
const CommonHorizFormHook = forwardRef(CommonHorizFormHookItem);
export { CommonHorizFormHook, IFormColumns };
