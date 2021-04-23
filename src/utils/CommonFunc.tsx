/**
 * @description: 公共函数
 * @author: cnn
 * @createTime: 2020/7/22 9:35
 **/
/* eslint no-unused-vars:0 */
import React from 'react';
import { MenuData } from '@utils/CommonInterface';
import { Menu, message, Upload } from 'antd';
import { Link } from 'react-router-dom';
import dayJs, { Dayjs } from 'dayjs';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

/**
 * 初始化菜单
 * @params
 * type: 来自哪个页面，如：'/components/'
 * **/
export const initMenu = (menuList: Array<MenuData>, type: string) => {
  const subMenuList = [];
  for (let i = 0, length = menuList.length; i < length; i++) {
    // @ts-ignore
    if (menuList[i].children.length > 0) {
      // @ts-ignore
      const menuHtmlList = menuList[i].children.map((item: MenuData) => (
        <MenuItem key={item.key}>
          <Link to={type + item.key}>{item.name}</Link>
        </MenuItem>
      ));
      subMenuList.push((
        <SubMenu title={menuList[i].name} key={menuList[i].key}>
          {menuHtmlList}
        </SubMenu>
      ));
    } else {
      subMenuList.push((
        <MenuItem key={menuList[i].key}>
          <Link to={type + menuList[i].key}>{menuList[i].name}</Link>
        </MenuItem>
      ));
    }
  }
  return subMenuList;
};
/**
 * 设置当前激活的菜单
 * **/
export const setActiveMenu = (activeMenu: string) => {
  sessionStorage.setItem('activeMenu', activeMenu || '');
};
/**
 * 获取当前激活的菜单
 * **/
export const getActiveMenu = () => {
  return sessionStorage.getItem('activeMenu') || '';
};
/**
 * 设置当前激活的子菜单
 * **/
export const setActiveChildMenu = (activeChildMenu: string) => {
  sessionStorage.setItem('activeChildMenu', activeChildMenu || '');
};
/**
 * 获取当前激活的子菜单
 * **/
export const getActiveChildMenu = () => {
  return sessionStorage.getItem('activeChildMenu') || '';
};
/**
 * 日期转为日期字符串
 * **/
export const dateToDateString = (date: Dayjs) => {
  if (date) {
    return dayJs(date).format('YYYY-MM-DD');
  } else {
    return '';
  }
};
/**
 * 日期转为月字符串
 * **/
export const dateToMonthString = (date: Dayjs) => {
  if (date) {
    return dayJs(date).format('YYYY-MM');
  } else {
    return '';
  }
};
/**
 * 时间转为小时
 * **/
export const dateTimeToHour = (dateTime: Dayjs) => {
  if (dateTime) {
    return dayJs(dateTime).format('HH');
  } else {
    return '';
  }
};
/**
 * 日期转为分钟
 * **/
export const dateToMinute = (dateTime: Dayjs) => {
  if (dateTime) {
    return dayJs(dateTime).format('YYYY-MM-DD HH:mm');
  } else {
    return '';
  }
};
/**
 * 时间转为带日期小时
 * **/
export const dateTimeToHourWithDate = (dateTime: Dayjs) => {
  if (dateTime) {
    return dayJs(dateTime).format('YYYY-MM-DD HH');
  } else {
    return '';
  }
};
/**
 * 获取当前浏览器高度
 * **/
export const getClientHeight = () => {
  // @ts-ignore
  return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
};
/**
 * 获取当前浏览器宽度
 * **/
export const getClientWidth = () => {
  // @ts-ignore
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
};
/**
 * limitSize: 文件限制大小（MB）
 * limitType： 限制文件的 格式
 * limitFileNameLength: 限制文件名长度
 * limitFileName: 文件名中不应包含字符
 * file: 文件
 **/
export const beforeUploadLimit = (limitSize: number, limitType: Array<string>, limitFileNameLength: number, limitFileName: Array<string>, file: any) => {
  const isLtLimitSize = file.size / 1024 / 1024 < limitSize;
  // 限制文件大小
  if (!isLtLimitSize) {
    message.error('文件不能超过 ' + limitSize + ' MB');
    return Upload.LIST_IGNORE;
  }
  // 限制文件格式
  let fileSuf = file.name.split('.');
  let suffix = fileSuf[fileSuf.length - 1].toLowerCase();
  if (limitType.indexOf('.' + suffix) === -1) {
    message.error('文件限' + limitType.join('、') + '格式');
    return Upload.LIST_IGNORE;
  }
  // 限制文件名长度
  if (file.name.length > limitFileNameLength) {
    message.error('文件名长度不能超过 ' + limitFileNameLength + ' 字');
    return Upload.LIST_IGNORE;
  }
  // 限制文件名中不应包含字符
  for (let i = 0; i < limitFileName.length; i++) {
    const item = limitFileName[i];
    if (file.name.indexOf(item) !== -1) {
      message.error('文件名中不应包含字符 ' + limitFileName.join(' ') + ' 字符');
      return Upload.LIST_IGNORE;
    }
  }
  return true;
};
