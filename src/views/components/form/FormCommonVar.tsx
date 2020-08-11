import React from 'react';

const residences = [
  {
    value: '浙江',
    label: '浙江',
    children: [
      {
        value: '杭州',
        label: '杭州',
        children: [
          {
            value: '西湖',
            label: '西湖',
          },
        ],
      },
    ],
  },
  {
    value: '江苏',
    label: '江苏',
    children: [
      {
        value: '南京',
        label: '南京',
        children: [
          {
            value: '中华门',
            label: '中华门',
          },
        ],
      },
    ],
  },
];
const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-1',
      },
      {
        title: 'Child Node2',
        value: '0-0-2',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
  },
];
const selectOption = [
  { key: 'jack', value: 'jack' },
  { key: 'rose', value: 'rose' },
  { key: 'tom', value: 'tom' },
];
const spanList = [
  { key: '8', value: '8' },
  { key: '12', value: '12' },
  { key: '24', value: '24' },
];
const apiList = [
  {
    name: 'formColumns',
    description: '必填，表单项',
    type: 'IFormColumns[]',
    defaultValue: ''
  }, {
    name: 'submitLoading',
    description: '确定按钮的loading状态',
    type: 'boolean',
    defaultValue: ''
  }, {
    name: 'formItemLayout',
    description: 'label和控件布局',
    type: <a href="https://ant.design/components/grid-cn/#Col" target="_blank">object</a>,
    defaultValue: ''
  }, {
    name: 'inlineSpan',
    description: '一行每列占宽, 和col的span一样',
    type: 'number',
    defaultValue: '24'
  }, {
    name: 'footerBtn',
    description: '是否显示底部的确定和取消按钮',
    type: 'boolean',
    defaultValue: ''
  }, {
    name: 'OK',
    description: '确定按钮的点击事件',
    type: '(data: any) => void',
    defaultValue: ''
  }, {
    name: 'cancel',
    description: '取消按钮的点击事件',
    type: '() => void',
    defaultValue: ''
  }, {
    name: 'notReset',
    description: '点击确定按钮之后，不清除表单数据',
    type: 'boolean',
    defaultValue: ''
  },
];
const iFormColumnsAPIList = [
  {
    name: 'label',
    description: '必填，标签名',
    type: 'string',
    defaultValue: ''
  }, {
    name: 'name',
    description: '必填，属性名',
    type: 'string',
    defaultValue: ''
  }, {
    name: 'type',
    description: '必填，表单项的类型',
    type: '\'text\' | \'textArea\' | \'inputNumber\' | \'password\' | \'select\' | \'treeSelect\' | \'date\' | \'rangeDate\'| \'dateNoTime\' | \'radio\' | \'switch\' | \'cascader\' | \'hidden\'',
    defaultValue: ''
  }, {
    name: 'rules',
    description: '必填，表单项的校验规则',
    type: <div><a href="https://ant.design/components/form-cn/#Rule" target="_blank">Rule</a>[]</div>,
    defaultValue: ''
  }, {
    name: 'disabled',
    description: '是否禁用',
    type: 'boolean',
    defaultValue: ''
  }, {
    name: 'style',
    description: '表单项控件样式',
    type: 'any',
    defaultValue: ''
  }, {
    name: 'onChange',
    description: '控件的chang事件',
    type: 'Function',
    defaultValue: ''
  }, {
    name: 'mode',
    description: 'select的模式',
    type: 'multiple | tags',
    defaultValue: ''
  }, {
    name: 'option',
    description: 'select的option、 树形选择、联级选择、单选框的data',
    type: 'any',
    defaultValue: ''
  }, {
    name: 'readOnly',
    description: '是否只读',
    type: 'boolean',
    defaultValue: ''
  }, {
    name: 'rows',
    description: '文本域textArea的文本框的行数',
    type: 'number',
    defaultValue: ''
  }, {
    name: 'minNumber',
    description: 'inputNumber 输入的最小数',
    type: 'number',
    defaultValue: ''
  }, {
    name: 'maxNumber',
    description: 'inputNumber 输入的最大数',
    type: 'number',
    defaultValue: ''
  }, {
    name: 'step',
    description: 'inputNumber 小数点后几位数',
    type: 'number',
    defaultValue: ''
  }, {
    name: 'formatter',
    description: 'inputNumber 输入格式化',
    type: 'any',
    defaultValue: ''
  }, {
    name: 'multiple',
    description: '树选择的模式 为true是多选',
    type: 'boolean',
    defaultValue: ''
  }, {
    name: 'initialValue',
    description: '表单项的初始值',
    type: 'any',
    defaultValue: ''
  }, {
    name: 'placeholder',
    description: '输入框的提示信息',
    type: 'string',
    defaultValue: ''
  },
];
const sexOption = [{ key: '男', value: '男' }, { key: '女', value: '女' }]
const searchFormAPIList = [
  {
    name: 'formColumns',
    description: '必填，表单项',
    type: 'ISearchFormColumns[]',
    defaultValue: ''
  }, {
    name: 'submitLoading',
    description: '确定按钮的loading状态',
    type: 'boolean',
    defaultValue: ''
  }, {
    name: 'search',
    description: '必填，搜索方法',
    type: '(data: any) => void',
    defaultValue: ''
  }, {
    name: 'showBtn',
    description: '显示搜索和重置按钮',
    type: 'boolean',
    defaultValue: ''
  },
]
const ISearchFormColumnsAPIList = [
  {
    name: 'label',
    description: '必填，标签名',
    type: 'string',
    defaultValue: ''
  }, {
    name: 'name',
    description: '必填，属性名',
    type: 'string',
    defaultValue: ''
  }, {
    name: 'type',
    description: '必填，表单项的类型',
    type: '\'text\' | \'textArea\' | \'inputNumber\' | \'password\' | \'select\' | \'treeSelect\' | \'date\' | \'rangeDate\'| \'rangeDateNoTime\'| \'dateNoTime\' | \'radio\' | \'cascader\'',
    defaultValue: ''
  }, {
    name: 'disabled',
    description: '是否禁用',
    type: 'boolean',
    defaultValue: ''
  }, {
    name: 'style',
    description: '表单项控件样式',
    type: 'any',
    defaultValue: ''
  }, {
    name: 'onChange',
    description: '控件的chang事件',
    type: 'Function',
    defaultValue: ''
  }, {
    name: 'mode',
    description: 'select的模式',
    type: 'multiple | tags',
    defaultValue: ''
  }, {
    name: 'option',
    description: 'select的option、 树形选择、联级选择、单选框的data',
    type: 'any',
    defaultValue: ''
  }, {
    name: 'readOnly',
    description: '是否只读',
    type: 'boolean',
    defaultValue: ''
  }, {
    name: 'rows',
    description: '文本域textArea的文本框的行数',
    type: 'number',
    defaultValue: ''
  }, {
    name: 'minNumber',
    description: 'inputNumber 输入的最小数',
    type: 'number',
    defaultValue: ''
  }, {
    name: 'maxNumber',
    description: 'inputNumber 输入的最大数',
    type: 'number',
    defaultValue: ''
  }, {
    name: 'step',
    description: 'inputNumber 小数点后几位数',
    type: 'number',
    defaultValue: ''
  }, {
    name: 'formatter',
    description: 'inputNumber 输入格式化',
    type: 'any',
    defaultValue: ''
  }, {
    name: 'multiple',
    description: '树选择的模式 为true是多选',
    type: 'boolean',
    defaultValue: ''
  }, {
    name: 'initialValue',
    description: '表单项的初始值',
    type: 'any',
    defaultValue: ''
  }, {
    name: 'placeholder',
    description: '输入框的提示信息',
    type: 'string',
    defaultValue: ''
  },
]
export { residences, treeData, selectOption, spanList, apiList, iFormColumnsAPIList, sexOption, searchFormAPIList, ISearchFormColumnsAPIList };
