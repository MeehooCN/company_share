/**
 * @description: 公共函数
 * @author: cnn
 * @createTime: 2020/7/22 9:35
 **/
/* eslint no-unused-vars:0 */
import React from 'react';
import { MenuData } from '@utils/CommonInterface';
import { Menu } from 'antd';
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
