/**
 * @description: 树形结构的表格
 * @author: cy
 * @createTime: 2021/9/18 14:09
 **/
import React, { useEffect, useState } from 'react';
import {Row, Table} from 'antd';
import { tableToTree } from '@views/components/table/tableToTree';
import {API, CodeExample, TitleWithDescription} from '@components/index';
export const getTreeExpandKeyAndChild = (array: Array<any>, customSet?: any) => {
  let keys: Array<string> = [];
  let total = 0;
  const setChildren = (array: Array<any>, customSet?: any) => {
    return array.map((v: any) => {
      const item = { ...v };
      if (customSet) customSet(item);
      if (v.children) item.children = setChildren(v.children, customSet);
      if (item.children.length === 0) {
        item.children = null;
      } else {
        keys.push(item.id);
      }
      if (item.type === 1) {
        total += item.score;
      }
      return item;
    });
  };
  return {
    tree: setChildren(array, customSet),
    key: keys,
    total: total.toFixed(2)
  };
};
const TreeTable = () => {
  const [dataList, setDataList] = useState<Array<any>>([]);
  const [treeTitle, setTreeTitle] = useState<Array<any>>([]);
  const contactTree = tableToTree();
  useEffect(() => {
    let list = [
      {
        id: '1', name: '指标一', children: [
          { id: '1-1', name: '指标一-01', children: [] },
          {
            id: '1-2', name: '指标一-02', children: [
              { id: '1-2-1', name: '指标一-02-001', children: [] },
              { id: '1-2-2', name: '指标一-02-002', children: [] }
            ]
          },
        ]
      },
      {
        id: '2', name: '指标二', children: []
      },
      {
        id: '3', name: '指标三', children: [
          {
            id: '3-1', name: '指标三-01', children: [
              { id: '3-1-1', name: '指标三-01-001', children: [] },
              {
                id: '3-1-2', name: '指标三-01-002', children: [
                  { id: '3-1-2-1', name: '指标三-02-002-1', children: [] },
                  { id: '3-1-2-2', name: '指标三-02-002-2', children: [] },
                ]
              },
            ]
          },
          {
            id: '3-2', name: '指标三-02', children: [
              { id: '3-2-1', name: '指标三-02-001', children: [] },
              { id: '3-2-2', name: '指标三-02-002', children: [] },
              { id: '3-2-3', name: '指标三-02-003', children: [] }
            ]
          },
        ]
      },
    ];
    const treeData = getTreeExpandKeyAndChild(list);
    let newArr = contactTree(treeData.tree);
    setDataList(newArr.treeDataList);
    setTreeTitle(newArr.treeTitle);
  }, []);
  let columns: Array<any> = [
    ...treeTitle,
    { title: '指标', dataIndex: 'name' }
  ];
  const apiList: Array<any> = [
    {
      name: 'textRender',
      description: '单元格内容render',
      type: 'Function',
      defaultValue: '(text: any) => text'
    },
    {
      name: 'columnWidth',
      description: '列宽',
      type: 'number | string',
      defaultValue: '100'
    },
    {
      name: 'titleSuffix',
      description: '表头的标题后缀， 若为“级”，则表头为：一级、二级、三级',
      type: 'string',
      defaultValue: '级'
    },
  ]
  const viewComponent = (
    <Table
      bordered={true}
      pagination={false}
      dataSource={dataList}
      columns={columns}
      rowKey="id"
    />
  );
  const code = '/**\n' +
    ' * @description: 将树形结构的数据，转换为平铺的数据结构\n' +
    ' * @author: cy\n' +
    ' * @createTime: 2021/9/18 15:44\n' +
    ' **/\n' +
    'import React from \'react\';\n' +
    'const convertToChinaNum = (num: number) => {\n' +
    '  let arr1: Array<string> = [\'零\', \'一\', \'二\', \'三\', \'四\', \'五\', \'六\', \'七\', \'八\', \'九\'];\n' +
    '  let arr2: Array<string> = [\'\', \'十\', \'百\', \'千\', \'万\', \'十\', \'百\', \'千\', \'亿\', \'十\', \'百\', \'千\', \'万\', \'十\', \'百\', \'千\', \'亿\']; // 可继续追加更高位转换值\n' +
    '  if (!num || isNaN(num)) {\n' +
    '    return \'零\';\n' +
    '  }\n' +
    '  let english = num.toString().split(\'\')\n' +
    '  let result = \'\';\n' +
    '  for (let i = 0; i < english.length; i++) {\n' +
    '    let des_i = english.length - 1 - i; // 倒序排列设值\n' +
    '    result = arr2[i] + result;\n' +
    '    let arr1_index: any = english[des_i];\n' +
    '    result = arr1[arr1_index] + result;\n' +
    '  }\n' +
    '  // 将【零千、零百】换成【零】 【十零】换成【十】\n' +
    '  result = result.replace(/零(千|百|十)/g, \'零\').replace(/十零/g, \'十\');\n' +
    '  // 合并中间多个零为一个零\n' +
    '  result = result.replace(/零+/g, \'零\');\n' +
    '  // 将【零亿】换成【亿】【零万】换成【万】\n' +
    '  result = result.replace(/零亿/g, \'亿\').replace(/零万/g, \'万\');\n' +
    '  // 将【亿万】换成【亿】\n' +
    '  result = result.replace(/亿万/g, \'亿\');\n' +
    '  // 移除末尾的零\n' +
    '  result = result.replace(/零+$/, \'\')\n' +
    '  // 将【零一十】换成【零十】\n' +
    '  // result = result.replace(/零一十/g, \'零十\');//貌似正规读法是零一十\n' +
    '  // 将【一十】换成【十】\n' +
    '  result = result.replace(/^一十/g, \'十\');\n' +
    '  return result;\n' +
    '};\n' +
    'interface IProps {\n' +
    '  textRender?: (text: any, row: any) => React.ReactNode; // 单元格内容render\n' +
    '  columnWidth?: number | string; // 列宽\n' +
    '  titleSuffix?: string; // 表头的标题后缀， 若为“级”，则表头为：一级、二级、三级\n' +
    '}\n' +
    'interface objProps {\n' +
    '  [propName: string]: any\n' +
    '}\n' +
    'export const tableToTree = (props: IProps = {}) => {\n' +
    '  const { textRender = (text: any) => text, columnWidth = 100, titleSuffix = \'级\' } = props;\n' +
    '  let mergeNum = 0; // 最大层级数，需要多少个title\n' +
    '  const contactTree = (list: Array<any>) => {\n' +
    '    let newArr: Array<any> = [];\n' +
    '    let maxLevel = 0; // 最大层级数\n' +
    '    const getChildren = (list: Array<any>, level: number) => {\n' +
    '      if (level > maxLevel) {\n' +
    '        maxLevel = level;\n' +
    '      }\n' +
    '      list.forEach((item: any) => {\n' +
    '        if (item.children) {\n' +
    '          let treeLength = getTreeLength(item);\n' +
    '          let newChild = item.children.map((subItem: any) => {\n' +
    '            return {\n' +
    '              ...item,\n' +
    '              ...subItem,\n' +
    '              [\'name_\' + level]: item.name, // 将上级的名称保存下来\n' +
    '              [\'rowSpan_\' + level]: treeLength, // 最底层的数据长度为多少则需向下合并相同的长度\n' +
    '            };\n' +
    '          });\n' +
    '          getChildren(newChild, level + 1);\n' +
    '        } else {\n' +
    '          let obj: objProps = { ...item };\n' +
    '          delete obj.children;\n' +
    '          newArr.push(obj);\n' +
    '        }\n' +
    '      });\n' +
    '    };\n' +
    '    getChildren(list, 1);\n' +
    '    mergeNum = maxLevel;\n' +
    '    newArr.forEach((item: any) => {\n' +
    '      for (let i = 1; i < mergeNum; i++) {\n' +
    '        if (!item[\'name_\' + i]) {\n' +
    '          item[\'name_\' + i] = \'\';\n' +
    '          item[\'rowSpan_\' + i] = 1;\n' +
    '        }\n' +
    '      }\n' +
    '    });\n' +
    '    let treeTitle = getMergeTitle();\n' +
    '    return { treeDataList: newArr, treeTitle };\n' +
    '  };\n' +
    '  const getTreeLength = (tree: any) => { // 获取树形结构中最底层的数据个数\n' +
    '    let childrenLength = 0;\n' +
    '    const getLength = (list: Array<any>) => {\n' +
    '      list.forEach((item: any, i: number) => {\n' +
    '        if (item.children) {\n' +
    '          getLength(item.children);\n' +
    '        } else {\n' +
    '          childrenLength += 1;\n' +
    '        }\n' +
    '      });\n' +
    '    };\n' +
    '    getLength(tree.children);\n' +
    '    return childrenLength;\n' +
    '  };\n' +
    '  const getMergeTitle = () => {\n' +
    '    let mergeTitle = [];\n' +
    '    for (let i = 1; i < mergeNum; i++) {\n' +
    '      let titleName = convertToChinaNum(i) + titleSuffix;\n' +
    '      let position = 0;\n' +
    '      mergeTitle.push({\n' +
    '        title: titleName, dataIndex: \'name_\' + i, width: columnWidth, ellipsis: { showTitle: false },\n' +
    '        render: (text: string, row: any, index: number) => {\n' +
    '          let currentSpan = row[\'rowSpan_\' + i];\n' +
    '          const obj = {\n' +
    '            children: text ? textRender(text, row) : \'\',\n' +
    '            props: { rowSpan: 0 }\n' +
    '          };\n' +
    '          if (index === 0) { // 当为列表第一个时，设置rowSpan，position为合并的长度\n' +
    '            obj.props.rowSpan = currentSpan;\n' +
    '            position = currentSpan;\n' +
    '          }\n' +
    '          if (index === position) { // 当到了上一个合并结束位置时，累加position，直到合并结束位置\n' +
    '            obj.props.rowSpan = currentSpan;\n' +
    '            position += currentSpan;\n' +
    '          }\n' +
    '          return obj;\n' +
    '        }\n' +
    '      });\n' +
    '    }\n' +
    '    return mergeTitle;\n' +
    '  };\n' +
    '  return contactTree;\n' +
    '};\n' +
    '' +
    '' +
    '' +
    '// 在TreeTable中使用\n' +
    'import React, { useEffect, useState } from \'react\';\n' +
    'import {Row, Table} from \'antd\';\n' +
    'import { tableToTree } from \'@views/components/table/tableToTree\';\n' +
    'import {CodeExample, TitleWithDescription} from \'@components/index\';\n' +
    'export const getTreeExpandKeyAndChild = (array: Array<any>, customSet?: any) => {\n' +
    '  let keys: Array<string> = [];\n' +
    '  let total = 0;\n' +
    '  const setChildren = (array: Array<any>, customSet?: any) => {\n' +
    '    return array.map((v: any) => {\n' +
    '      const item = { ...v };\n' +
    '      if (customSet) customSet(item);\n' +
    '      if (v.children) item.children = setChildren(v.children, customSet);\n' +
    '      if (item.children.length === 0) {\n' +
    '        item.children = null;\n' +
    '      } else {\n' +
    '        keys.push(item.id);\n' +
    '      }\n' +
    '      if (item.type === 1) {\n' +
    '        total += item.score;\n' +
    '      }\n' +
    '      return item;\n' +
    '    });\n' +
    '  };\n' +
    '  return {\n' +
    '    tree: setChildren(array, customSet),\n' +
    '    key: keys,\n' +
    '    total: total.toFixed(2)\n' +
    '  };\n' +
    '};\n' +
    'const TreeTable = () => {\n' +
    '  const [dataList, setDataList] = useState<Array<any>>([]);\n' +
    '  const [treeTitle, setTreeTitle] = useState<Array<any>>([]);\n' +
    '  const contactTree = tableToTree();\n' +
    '  useEffect(() => {\n' +
    '    let list = [\n' +
    '      {\n' +
    '        id: \'1\', name: \'指标一\', children: [\n' +
    '          { id: \'1-1\', name: \'指标一-01\', children: [] },\n' +
    '          {\n' +
    '            id: \'1-2\', name: \'指标一-02\', children: [\n' +
    '              { id: \'1-2-1\', name: \'指标一-02-001\', children: [] },\n' +
    '              { id: \'1-2-2\', name: \'指标一-02-002\', children: [] }\n' +
    '            ]\n' +
    '          },\n' +
    '        ]\n' +
    '      },\n' +
    '      {\n' +
    '        id: \'2\', name: \'指标二\', children: []\n' +
    '      },\n' +
    '      {\n' +
    '        id: \'3\', name: \'指标三\', children: [\n' +
    '          {\n' +
    '            id: \'3-1\', name: \'指标三-01\', children: [\n' +
    '              { id: \'3-1-1\', name: \'指标三-01-001\', children: [] },\n' +
    '              {\n' +
    '                id: \'3-1-2\', name: \'指标三-01-002\', children: [\n' +
    '                  { id: \'3-1-2-1\', name: \'指标三-02-002-1\', children: [] },\n' +
    '                  { id: \'3-1-2-2\', name: \'指标三-02-002-2\', children: [] },\n' +
    '                ]\n' +
    '              },\n' +
    '            ]\n' +
    '          },\n' +
    '          {\n' +
    '            id: \'3-2\', name: \'指标三-02\', children: [\n' +
    '              { id: \'3-2-1\', name: \'指标三-02-001\', children: [] },\n' +
    '              { id: \'3-2-2\', name: \'指标三-02-002\', children: [] },\n' +
    '              { id: \'3-2-3\', name: \'指标三-02-003\', children: [] }\n' +
    '            ]\n' +
    '          },\n' +
    '        ]\n' +
    '      },\n' +
    '    ];\n' +
    '    const treeData = getTreeExpandKeyAndChild(list);\n' +
    '    let newArr = contactTree(treeData.tree);\n' +
    '    setDataList(newArr.treeDataList);\n' +
    '    setTreeTitle(newArr.treeTitle);\n' +
    '  }, []);\n' +
    '  let columns: Array<any> = [\n' +
    '    ...treeTitle,\n' +
    '    { title: \'指标\', dataIndex: \'name\' }\n' +
    '  ];\n' +
    '  return (\n' +
    '    <Table\n' +
    '      bordered={true}\n' +
    '      pagination={false}\n' +
    '      dataSource={dataList}\n' +
    '      columns={columns}\n' +
    '      rowKey="id"\n' +
    '    />\n' +
    '  );\n' +
    '};\n' +
    'export default TreeTable;'
  return (
    <Row>
      <TitleWithDescription title="树形合并表格" content="树形结构的数据，展开为合并方式展示，类似于Excel表格中合并的方式" style={{ marginBottom: 50 }} />
      <CodeExample viewComponents={viewComponent} code={code} />
      <API dataList={apiList} description="tableToTree" />
    </Row>
  );
};
export default TreeTable;
