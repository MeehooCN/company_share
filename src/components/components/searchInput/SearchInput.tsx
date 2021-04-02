/**
 * @description: 搜索后将获取的数据以下拉框形式展示
 * @author: sml
 * @createTime: 2021/2/22 10:07
 **/
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Select, Empty } from 'antd';
import { mock } from 'mockjs';

let timeout: any;
const { Option } = Select;

interface IOption {
  key: number,
  value: string
}
interface IProps {
  placeholder: string,
  style: object,
  getResult: any,
  ref: any
}

const SearchInput = (props: IProps, ref: any) => {
  const { placeholder, style, getResult } = props;
  const [selectValue, setSelectValue] = useState<any>(undefined);
  const [randomData, setRandomData] = useState<Array<IOption>>([]);
  const [options, setOptions] = useState<Array<object>>([]);
  const [currentCount, setCurrentCount] = useState<number>(0);
  const count: number = 20; // 初始数组长度
  useImperativeHandle(ref, () => ({
    // 向父组件暴露的方法
    setSelectValue: (value: string) => setSelectValue(value)
  }));
  useEffect(() => {
    getRandomOption();
  }, []);
  useEffect(() => {
    setOption();
  }, [randomData]);
  // 为下拉框生成随机数据
  const getRandomOption = () => {
    for (let i = 0; i < count; i++) {
      randomData.push({
        key: i,
        value: mock('@cname')
      });
    }
    setRandomData(randomData);
  };
  const setOption = () => {
    let optionList: Array<object> = randomData.map((item: any) => {
      return (
        <Option key={item.key} value={item.value}>
          {item.value}
        </Option>
      );
    });
    setOptions(optionList);
  };
  // 此处放入的value为option的key值
  const handleChange = (value: string) => {
    getResult(value);  // 向父组件传值
  };
  // 根据用户输入的搜索值得到下拉框的值
  const getOption = (searchValue: string) => {
    let list: Array<IOption> = [];
    let currentCount: number = 0;
    for (let i = 0; i < randomData.length; i++) {
      if (randomData[i].value.indexOf(searchValue) !== -1) {
        list.push(randomData[i]);
      } else {
        currentCount++;
      }
    }
    if (currentCount === randomData.length) {
      const addValue = {
        key: currentCount + 1,
        value: searchValue
      };
      list.unshift(addValue);
      setCurrentCount(currentCount);
    }
    const optionList = list.map((item: any) => {
      return (
        <Option key={item.key} value={item.value}>
          {item.value}
        </Option>
      );
    });
    setOptions(optionList);
  };
  // 下拉列表滚动触发事件 每触发一次显示时新增20条数据(当数据过多时可使用此方法)
  // const onPopupScroll = () => {
  //   if (timeout) {
  //     clearTimeout(timeout);
  //     timeout = null;
  //   }
  //   const getList = () => {
  //     setCount(count + 20);
  //     getOption(searchValue);
  //   };
  //   timeout = setTimeout(getList, 300);
  // };
  const handleSearch = (value: string) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    const getList = () => {
      if (value) {
        getOption(value);
      } else {
        setOption();
      }
    };
    timeout = setTimeout(getList, 300);
  };
  // 选中时调用函数 当用户选中的值不在已有的选择范围内则新增这个值
  const handleSelect = (value: string) => {
    const tempRandomData = [...randomData];
    if (currentCount === tempRandomData.length) {
      const addValue = {
        key: currentCount + 1,
        value
      };
      tempRandomData.unshift(addValue);
      setRandomData(tempRandomData);
    }
  };
  return (
    <Select
      ref={ref}
      showSearch
      allowClear
      value={selectValue}
      placeholder={placeholder}
      style={style}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onChange={handleChange}
      onSearch={handleSearch}
      onClear={setOption}
      onSelect={handleSelect}
      onBlur={setOption}
      // onPopupScroll={onPopupScroll}
      notFoundContent={<Empty />}
    >
      {options}
    </Select>
  );
};
export default forwardRef(SearchInput);
