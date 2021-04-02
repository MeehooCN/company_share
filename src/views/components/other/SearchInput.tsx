/**
 * @description: 搜索后将获取的数据以下拉框形式展示
 * @author: sml
 * @createTime: 2021/2/22 10:21
 **/
import React, { useRef } from 'react';
import { Row } from 'antd';
import { API, CodeExample, SearchInput, TitleWithDescription } from '@components/index';
const SearchInputView = () => {
  const selectRef: any = useRef();
  const code: string = '   // 从子组件中获取用户选择的code, 并将用户选择的结果返显在页面上\n' +
    '  const getResult = (value: string) => {\n' +
    '    selectRef.current.setSelectValue(value);\n' +
    '  };\n   ' +
    '<SearchInput\n' +
    '          placeholder={placeholder}\n' +
    '          style={style}\n' +
    '          getResult={getResult}\n' +
    '          ref={selectRef}\n' +
    '        />';
  const paramList = [{
    name: 'placeholder',
    description: '选择框默认文本',
    type: 'string',
    defaultValue: ''
  }, {
    name: 'style',
    description: '选择框样式',
    type: 'object',
    defaultValue: ''
  }, {
    name: 'getResult',
    description: '从子组件中获取用户的选择值, 并将用户的选择值返显在页面上',
    type: 'function',
    defaultValue: ''
  }, {
    name: 'ref',
    description: '获取组件实例对象',
    type: 'any',
    defaultValue: ''
  }];
  // 从子组件中获取用户选择的code, 并将用户选择的结果返显在页面上
  const getResult = (value: string) => {
    selectRef.current.setSelectValue(value);
  };
  const getViewComponents = () => {
    return (
      <Row style={{ width: '100%' }}>
        <SearchInput
          placeholder="请输入搜索值"
          style={{ width: 250 }}
          getResult={getResult}
          ref={selectRef}
        />
      </Row>
    );
  };
  return (
    <Row>
      <TitleWithDescription title="SearchInput" content="实时搜索下拉框" />
      <TitleWithDescription title="示例" titleSize={24} content="" style={{ marginTop: 50, marginBottom: 10 }} />
      <CodeExample viewComponents={getViewComponents()} code={code} />
      <API dataList={paramList} />
    </Row>
  );
};
export default SearchInputView;
