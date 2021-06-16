/**
 * @description: 公共的表单，
 * @author: cy
 * @createTime: 2020/7/28 14:20
 **/
import { DatePicker, Form, Input, InputNumber, Select, TreeSelect, Radio, Cascader, Button } from 'antd';
import React, { useEffect } from 'react';
const { TextArea, Search } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const { RangePicker } = DatePicker;
export enum ISearchFormItemType {
  Text = 'text',
  TextArea = 'textArea',
  InputBumber = 'inputNumber',
  Password = 'password',
  Select = 'select',
  TreeSelect = 'treeSelect',
  Date = 'date',
  RangeDate = 'rangeDate',
  DateNoTime = 'dateNoTime',
  Radio = 'radio',
  Cascader = 'cascader',
}
declare type FormItemType = ISearchFormItemType;
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
interface ISearchFormColumns {
  label: string,
  name: string,
  type: FormItemType,
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
}

/**
 * @description 公共表单的参数
 * @property formColumns 表单项
 * @property showBtn 是否显示按钮
 * @event search 搜索操作
 * @property submitLoading 搜索时确定按钮添加loading状态
 */
interface IProps {
  formColumns: ISearchFormColumns[],
  search: (data: any) => void,
  submitLoading?: boolean,
  showBtn?: boolean,
  formValue?: any
}
const SearchInlineForm = (props: IProps) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(props.formValue);
  }, [props.formValue]);
  const handleSearch = () => {
    let value = form.getFieldsValue();
    props.search(value);
  };
  const handleReset = () => {
    form.resetFields();
    let value = form.getFieldsValue();
    let values: any = {};
    // eslint-disable-next-line guard-for-in
    for (let objName in value) {
      values[objName] = undefined;
    }
    form.setFieldsValue(values);
    props.search(values);
  };
  const onChangeSearch = (v: any, option: any) => {
    let value = form.getFieldsValue();
    value[option.ref] = v;
    props.search(value);
  };
  const formItems = (item: ISearchFormColumns) => {
    switch (item.type) {
      case 'text': return (<Search onSearch={(value) => onChangeSearch(value, { ref: item.name })} disabled={item.disabled} readOnly={item.readOnly} placeholder={item.placeholder} style={item.style} />);
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
          } else {
            onChangeSearch(value, { ref: item.name });
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
            } else {
              onChangeSearch(value, { ref: item.name });
            }
          }}
          treeData={item.option}
          style={item.style}
        />
      );
      // onChange={(date: any) => onChangeSearch(date ? Dayjs(date).format('YYYY-MM-DD HH:mm:ss') : '', { ref: item.name })}
      case 'date': return (<DatePicker showTime disabled={item.disabled} style={{ width: '100%' }} />);
      case 'dateNoTime': return (
        <DatePicker
          disabled={item.disabled}
          style={{ width: '100%' }}
          onChange={(date: any) => {
            if (item.onChange) {
              item.onChange(date);
            } else {
              onChangeSearch(date, { ref: item.name });
            }
          }}
        />);
      case 'rangeDateNoTime': return (
        <RangePicker
          format="YYYY-MM-DD"
          disabled={item.disabled}
          style={{ width: '100%' }}
          onChange={(date: any) => {
            if (item.onChange) {
              item.onChange(date);
            }
          }}
        />);
      case 'rangeDate': return (<RangePicker showTime={{ format: 'HH:mm:ss' }} format="YYYY-MM-DD HH:mm:ss" disabled={item.disabled} style={{ width: '100%' }} />);
      case 'radio': return (
        <RadioGroup disabled={item.disabled} buttonStyle="solid" onChange={(e: any) => {
          if (item.onChange) {
            item.onChange(e);
          } else {
            onChangeSearch(e.target.value, { ref: item.name });
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
            } else {
              onChangeSearch(value, { ref: item.name });
            }
          }}
        />
      );
    }
  };
  let columns = props.formColumns.map((item: ISearchFormColumns, index: number) => (
    <Form.Item key={index} label={item.label} name={item.name} initialValue={item.initialValue} style={{ marginBottom: 5 }}>
      {formItems(item)}
    </Form.Item>
  ));
  return (
    <Form layout="inline" form={form}>
      {columns}
      {props.showBtn ? <>
        <Form.Item style={{ marginBottom: 5 }}>
          <Button onClick={handleReset}>重置</Button>
        </Form.Item>
        <Form.Item style={{ marginBottom: 5 }}>
          <Button type="primary" onClick={handleSearch} loading={props.submitLoading}>搜索</Button>
        </Form.Item>
      </> : ''}
    </Form>
  );
};

export { SearchInlineForm, ISearchFormColumns };
