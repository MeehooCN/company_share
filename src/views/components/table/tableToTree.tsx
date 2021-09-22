/**
 * @description: 将树形结构的数据，转换为平铺的数据结构
 * @author: cy
 * @createTime: 2021/9/18 15:44
 **/
import React from 'react';
const convertToChinaNum = (num: number) => {
  let arr1: Array<string> = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  let arr2: Array<string> = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿']; // 可继续追加更高位转换值
  if (!num || isNaN(num)) {
    return '零';
  }
  let english = num.toString().split('')
  let result = '';
  for (let i = 0; i < english.length; i++) {
    let des_i = english.length - 1 - i; // 倒序排列设值
    result = arr2[i] + result;
    let arr1_index: any = english[des_i];
    result = arr1[arr1_index] + result;
  }
  // 将【零千、零百】换成【零】 【十零】换成【十】
  result = result.replace(/零(千|百|十)/g, '零').replace(/十零/g, '十');
  // 合并中间多个零为一个零
  result = result.replace(/零+/g, '零');
  // 将【零亿】换成【亿】【零万】换成【万】
  result = result.replace(/零亿/g, '亿').replace(/零万/g, '万');
  // 将【亿万】换成【亿】
  result = result.replace(/亿万/g, '亿');
  // 移除末尾的零
  result = result.replace(/零+$/, '')
  // 将【零一十】换成【零十】
  // result = result.replace(/零一十/g, '零十');//貌似正规读法是零一十
  // 将【一十】换成【十】
  result = result.replace(/^一十/g, '十');
  return result;
};
interface IProps {
  textRender?: (text: any, row: any) => React.ReactNode; // 单元格内容render
  columnWidth?: number | string; // 列宽
  titleSuffix?: string; // 表头的标题后缀， 若为“级”，则表头为：一级、二级、三级
}
interface objProps {
  [propName: string]: any
}
export const tableToTree = (props: IProps = {}) => {
  const { textRender = (text: any) => text, columnWidth = 100, titleSuffix = '级' } = props;
  let mergeNum = 0; // 最大层级数，需要多少个title
  const contactTree = (list: Array<any>) => {
    let newArr: Array<any> = [];
    let maxLevel = 0; // 最大层级数
    const getChildren = (list: Array<any>, level: number) => {
      if (level > maxLevel) {
        maxLevel = level;
      }
      list.forEach((item: any) => {
        if (item.children) {
          let treeLength = getTreeLength(item);
          let newChild = item.children.map((subItem: any) => {
            return {
              ...item,
              ...subItem,
              ['name_' + level]: item.name, // 将上级的名称保存下来
              ['rowSpan_' + level]: treeLength, // 最底层的数据长度为多少则需向下合并相同的长度
            };
          });
          getChildren(newChild, level + 1);
        } else {
          let obj: objProps = { ...item };
          delete obj.children;
          newArr.push(obj);
        }
      });
    };
    getChildren(list, 1);
    mergeNum = maxLevel;
    newArr.forEach((item: any) => {
      for (let i = 1; i < mergeNum; i++) {
        if (!item['name_' + i]) {
          item['name_' + i] = '';
          item['rowSpan_' + i] = 1;
        }
      }
    });
    let treeTitle = getMergeTitle();
    return { treeDataList: newArr, treeTitle };
  };
  const getTreeLength = (tree: any) => { // 获取树形结构中最底层的数据个数
    let childrenLength = 0;
    const getLength = (list: Array<any>) => {
      list.forEach((item: any, i: number) => {
        if (item.children) {
          getLength(item.children);
        } else {
          childrenLength += 1;
        }
      });
    };
    getLength(tree.children);
    return childrenLength;
  };
  const getMergeTitle = () => {
    let mergeTitle = [];
    for (let i = 1; i < mergeNum; i++) {
      let titleName = convertToChinaNum(i) + titleSuffix;
      let position = 0;
      mergeTitle.push({
        title: titleName, dataIndex: 'name_' + i, width: columnWidth, ellipsis: { showTitle: false },
        render: (text: string, row: any, index: number) => {
          let currentSpan = row['rowSpan_' + i];
          const obj = {
            children: text ? textRender(text, row) : '',
            props: { rowSpan: 0 }
          };
          if (index === 0) { // 当为列表第一个时，设置rowSpan，position为合并的长度
            obj.props.rowSpan = currentSpan;
            position = currentSpan;
          }
          if (index === position) { // 当到了上一个合并结束位置时，累加position，直到合并结束位置
            obj.props.rowSpan = currentSpan;
            position += currentSpan;
          }
          return obj;
        }
      });
    }
    return mergeTitle;
  };
  return contactTree;
};
