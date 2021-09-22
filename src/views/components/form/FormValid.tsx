/**
 * @description: 表单校验
 * @author: cnn
 * @createTime: 2021/6/11 9:55
 **/
import React from 'react';
import { IFormColumns } from '@components/components/form/CommonHorizForm';
import { getRules } from '@utils/CommonFunc';
import { CommonHorizFormHook, IFormItemType } from '@components/components/form/CommonHorizFormHook';
import { CodeExample, TitleWithDescription } from '@components/index';
import API from '@components/components/API';
import { Row } from 'antd';

const FormValid = () => {
  const code = '/**\n' +
    ' * 校验类型\n' +
    ' * required: 必填，可空格，空白字符等\n' +
    ' * inputNotSpace: 不能包含空格，其他空白字符\n' +
    ' * email: 验证邮箱\n' +
    ' * phone: 验证手机\n' +
    ' * idNumber: 身份证号\n' +
    ' * url: url\n' +
    ' * password: 密码，仅由英文字母，数字以及下划线组成\n' +
    ' **/\n' +
    'export type RuleType = \'required\' | \'inputNotSpace\' | \'email\' | \'phone\' | \'idNumber\' | \'url\' | \'password\';' +
    '/**\n' +
    ' * 获取常用校验\n' +
    ' * @param ruleType: required | inputNotSpace | email | phone | idNumber | url | password\n' +
    ' * @param required（可选）: 是否必填（如果单独需要必填，ruleType 设置为 required 即可，如果要满足其他校验且必填，该值才设为 true）\n' +
    ' **/\n' +
    'export const getRules = (ruleType: RuleType, required?: boolean) => {\n' +
    '  const commonRules: Map<string, Array<Rule>> = new Map([\n' +
    '    [\'required\', [{\n' +
    '      required: true,\n' +
    '      message: \'请输入\'\n' +
    '    }]],\n' +
    '    [\'inputNotSpace\', [{\n' +
    '      whitespace: true,\n' +
    '      message: \'不能只有空格\'\n' +
    '    }, {\n' +
    '      pattern: /^[^\\s]*$/,\n' +
    '      message: \'不能包含空格及其他空白字符\'\n' +
    '    }]],\n' +
    '    [\'email\', [{\n' +
    '      pattern: /^([a-zA-Z0-9]+[-_\\.]?)+@[a-zA-Z0-9]+\\.[a-z]+$/,\n' +
    '      message: \'请输入正确邮箱格式\'\n' +
    '    }]],\n' +
    '    [\'phone\', [{\n' +
    '      pattern: /^1(3|4|5|6|7|8|9)\\d{9}$/,\n' +
    '      message: \'请输入正确手机号格式\'\n' +
    '    }]],\n' +
    '    [\'idNumber\', [{\n' +
    '      pattern: /(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)/,\n' +
    '      message: \'请输入正确身份证号格式\'\n' +
    '    }]],\n' +
    '    [\'url\', [{\n' +
    '      pattern: /^(https?|ftp):\\/\\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\\.)*[a-zA-Z0-9-]+\\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\\/($|[a-zA-Z0-9.,?\'\\\\+&%$#=~_-]+))*$/,\n' +
    '      message: \'请输入合法 url\'\n' +
    '    }]],\n' +
    '    [\'password\', [{\n' +
    '      pattern: /^[_a-zA-Z0-9]+$/,\n' +
    '      message: \'仅由英文字母，数字以及下划线组成\'\n' +
    '    }]]\n' +
    '  ]);\n' +
    '  const returnRules: Array<Rule> = commonRules.get(ruleType) || [];\n' +
    '  if (required) {\n' +
    '    // @ts-ignore\n' +
    '    returnRules.unshift(commonRules.get(\'required\')[0]);\n' +
    '  }\n' +
    '  return returnRules;\n' +
    '};';
  const paramList = [{
    name: 'ruleType',
    description: '验证类型，该参数必填。',
    type: '\'required\' | \'inputNotSpace\' | \'email\' | \'phone\' | \'idNumber\' | \'url\' | \'password\'',
    defaultValue: '无'
  }, {
    name: 'required',
    description: '字段是否必填。',
    type: 'boolean',
    defaultValue: '默认 false'
  }];
  const formColumns: Array<IFormColumns> = [{
    label: '非空校验',
    type: IFormItemType.Text,
    name: 'required',
    rules: getRules('required')
  }, {
    label: '空格，空白字符校验',
    type: IFormItemType.Text,
    name: 'inputNotSpace',
    rules: getRules('inputNotSpace')
  }, {
    label: '邮箱',
    type: IFormItemType.Text,
    name: 'email',
    rules: getRules('email')
  }, {
    label: '手机',
    type: IFormItemType.Text,
    name: 'phone',
    rules: getRules('phone')
  }, {
    label: '身份证号',
    type: IFormItemType.Text,
    name: 'idNumber',
    rules: getRules('idNumber', true)
  }, {
    label: 'url',
    type: IFormItemType.Text,
    name: 'url',
    rules: getRules('url')
  }, {
    label: '密码',
    type: IFormItemType.Text,
    name: 'password',
    rules: getRules('password')
  }, {
    label: '下拉框必填',
    type: IFormItemType.Text,
    name: 'select',
    option: [{
      key: 'test',
      value: 'test'
    }],
    rules: getRules('required')
  }, {
    label: '单选框空白校验',
    type: IFormItemType.Radio,
    name: 'radio',
    option: [{
      key: 'test1',
      value: 'test1'
    }, {
      key: 'test2',
      value: 'test2'
    }],
    rules: getRules('inputNotSpace', true)
  }];
  return (
    <Row>
      <TitleWithDescription title="getRules" content="通用表单验证公共方法。" style={{ marginBottom: 50 }} />
      <CodeExample
        viewComponents={(
          <CommonHorizFormHook
            formColumns={formColumns}
            footerBtn={true}
            formValue={{}}
          />
        )}
        code={code}
      />
      <API title="getRules" description="这是个公共函数，不是个组件，以下为函数参数。" dataList={paramList} />
    </Row>
  );
};
export default FormValid;
