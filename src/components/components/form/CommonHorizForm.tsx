/**
 * @description: 公共的表单，
 * @author: cy
 * @createTime: 2020/7/28 14:20
 **/
import { Col, DatePicker, Form, Input, InputNumber, Select, TreeSelect, Radio, Cascader, Row, Button } from 'antd';
import React from 'react';
import { Rule } from 'antd/lib/form';
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const { RangePicker } = DatePicker;
declare type FormItemType = 'text' | 'textArea' | 'inputNumber' | 'password' | 'select' | 'treeSelect' | 'date' | 'rangeDate'| 'dateNoTime' | 'radio' | 'switch' | 'cascader' | 'hidden';
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
  placeholder?: string
}

/**
 * @description 公共表单的参数
 * @property formItemLayout label和item的显示布局
 * @property submitLoading 提交时确定按钮添加loading状态
 * @property formColumns 表单项
 * @property footerBtn 是否显示底部按钮
 * @event cancel 取消按钮的操作
 * @event OK 确定按钮的操作
 * @property notReset 点击确定后是否清空表单
 */
interface IProps {
  formColumns: IFormColumns[],
  submitLoading?: boolean,
  formItemLayout?: any,
  inlineSpan?: number
  footerBtn?: boolean,
  cancel?: () => void,
  OK?: (data: any) => void,
  notReset?: boolean
}
class CommonHorizForm extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
    this.formRef = React.createRef();
  }
  private readonly formRef: React.RefObject<any>;
  handleCancel = () => {
    this.formRef.current.resetFields();
    if (this.props.cancel) this.props.cancel();
  };
  handleOK = () => {
    this.formRef.current.validateFields().then((value : any) => {
      if (this.props.notReset && this.props.OK) {
        this.props.OK(value);
      } else {
        this.formRef.current.resetFields();
        if (this.props.OK) {
          this.props.OK(value);
        }
      }
    });
  };
  render(): React.ReactNode {
    const { formItemLayout, inlineSpan, formColumns, footerBtn } = this.props;
    const itemLayOut = formItemLayout ? formItemLayout : {
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
        case 'dateNoTime': return (<DatePicker disabled={item.disabled} style={{ width: '100%' }} />);
        case 'rangeDate': return (<RangePicker showTime={{ format: 'HH:mm:ss' }} format="YYYY-MM-DD HH:mm:ss" disabled={item.disabled} style={{ width: '100%' }} />);
        case 'radio': return (
          <RadioGroup disabled={item.disabled} buttonStyle="solid" onChange={(e) => {
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
    let columns = formColumns.map((item: IFormColumns, index: number) => (
      <Col span={inlineSpan || 24} key={index}>
        <Form.Item label={item.label} name={item.name} rules={item.rules} hidden={item.type === 'hidden'} initialValue={item.initialValue}>
          {formItems(item)}
        </Form.Item>
      </Col>
    ));
    return (
      <Form {...itemLayOut} ref={this.formRef}>
        <Row>
          {columns}
        </Row>
        {footerBtn ? <Row justify="end">
          <Button onClick={this.handleCancel}>取消</Button>
          <Button type="primary" loading={this.props.submitLoading} style={{ marginLeft: 8 }} onClick={this.handleOK} >确定</Button>
        </Row> : ''}
      </Form>
    );
  }
}

export { CommonHorizForm, IFormColumns };
