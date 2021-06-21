/**
 * @description: ~~
 * @author: cy
 * @createTime: 2020/8/11 15:16
 **/
import React, { useState } from 'react';
import { Row, Table } from 'antd';
import {ISearchFormColumns, ISearchFormItemType, SearchInlineForm} from '@components/components/form/SearchInlineForm';
import { sexOption, searchFormAPIList, ISearchFormColumnsAPIList } from '@views/components/form/FormCommonVar';
import TitleWithDescription from '@components/components/TitleWithDescription';
import CodeExample from '@components/components/CodeExample';
import API from '@components/components/API';

const initList = [
  { id: '1', name: 'jack', sex: '男', age: 18 },
  { id: '2', name: 'rose', sex: '女', age: 16 },
  { id: '3', name: 'tom', sex: '男', age: 21 },
];
const InlineSearchFormDemo = () => {
  const [userList, setUserList] = useState<any[]>(initList);
  const search = (content: any) => {
    let newList = initList;
    if (content.name) {
      newList = newList.filter(item => item.name.indexOf(content.name) > -1);
    }
    if (content.age) {
      newList = newList.filter(item => item.age > content.age);
    }
    if (content.sex) {
      newList = newList.filter(item => item.sex === content.sex);
    }
    setUserList(newList);
  };
  const searchColumns: Array<ISearchFormColumns> = [
    { label: '姓名', type: ISearchFormItemType.Text, name: 'name' },
    { label: '年龄', type: ISearchFormItemType.InputBumber, name: 'age' },
    { label: '性别', type: ISearchFormItemType.Radio, name: 'sex', option: sexOption },
  ];
  const columns = [
    { title: '序号', dataIndex: 'id' },
    { title: '姓名', dataIndex: 'name' },
    { title: '性别', dataIndex: 'sex' },
    { title: '年龄', dataIndex: 'age' },
  ];
  const viewComponents = (
    <Row style={{ width: '100%' }}>
      <Row>
        <SearchInlineForm formColumns={searchColumns} showBtn={true} search={search} />
      </Row>
      <Table<any>
        dataSource={userList}
        columns={columns}
        rowKey={(r: any) => r.id}
        bordered={true}
        style={{ width: '100%' }}
      />
    </Row>
  );
  const code = '\n' +
    'const initList = [\n' +
    '  { id: \'1\', name: \'jack\', sex: \'男\', age: 18 },\n' +
    '  { id: \'2\', name: \'rose\', sex: \'女\', age: 16 },\n' +
    '  { id: \'3\', name: \'tom\', sex: \'男\', age: 21 },\n' +
    '];\n' +
    'const InlineSearchFormDemo = () => {\n' +
    '  const [userList, setUserList] = useState<any[]>(initList);\n' +
    '  const search = (content: any) => {\n' +
    '    let newList = initList;\n' +
    '    if (content.name) {\n' +
    '      newList = newList.filter(item => item.name.indexOf(content.name) > -1);\n' +
    '    }\n' +
    '    if (content.age) {\n' +
    '      newList = newList.filter(item => item.age > content.age);\n' +
    '    }\n' +
    '    if (content.sex) {\n' +
    '      newList = newList.filter(item => item.sex === content.sex);\n' +
    '    }\n' +
    '    setUserList(newList);\n' +
    '  };\n' +
    '  const searchColumns: Array<ISearchFormColumns> = [\n' +
    '    { label: \'姓名\', type: \'text\', name: \'name\' },\n' +
    '    { label: \'年龄\', type: \'inputNumber\', name: \'age\' },\n' +
    '    { label: \'性别\', type: \'radio\', name: \'sex\', option: sexOption },\n' +
    '  ];\n' +
    '  const columns = [\n' +
    '    { title: \'序号\', dataIndex: \'id\' },\n' +
    '    { title: \'姓名\', dataIndex: \'name\' },\n' +
    '    { title: \'性别\', dataIndex: \'sex\' },\n' +
    '    { title: \'年龄\', dataIndex: \'age\' },\n' +
    '  ];\n' +
    '  return (\n' +
    '    <Row>\n' +
    '      <Row>\n' +
    '        <SearchInlineForm formColumns={searchColumns} showBtn={true} search={search} />\n' +
    '      </Row>\n' +
    '      <Table<any>\n' +
    '        dataSource={userList}\n' +
    '        columns={columns}\n' +
    '        rowKey={(r: any) => r.id}\n' +
    '        bordered={true}\n' +
    '        style={{ width: \'100%\' }}\n' +
    '      />\n' +
    '    </Row>\n' +
    '  );\n' +
    '}';
  return (
    <Row>
      <TitleWithDescription title="搜索表单" content="" style={{ marginBottom: 50 }} />
      <CodeExample viewComponents={viewComponents} code={code} />
      <API title="SearchInlineForm" description="" dataList={searchFormAPIList} />
      <API title="ISearchFormColumns" description="每一个表单项的属性" dataList={ISearchFormColumnsAPIList} />
    </Row>
  );
};
export default InlineSearchFormDemo;
