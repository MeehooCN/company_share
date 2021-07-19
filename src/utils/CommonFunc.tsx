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
import { RuleType } from '@utils/CommonVars';
import { Rule } from 'antd/lib/form';

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
 * limitType： 限制文件的 格式
 * file: 文件
 * limitSize: 文件限制大小（MB）
 * limitFileNameLength: 限制文件名长度
 * limitFileName: 文件名中不应包含字符
 **/
export const beforeUploadLimit = (limitType: Array<string>, file: any, limitSize?: number, limitFileNameLength?: number, limitFileName?: Array<string>) => {
  let fileSize = limitSize ? limitSize : 40;
  const isLtLimitSize = file.size / 1024 / 1024 < fileSize;
  // 限制文件大小
  if (!isLtLimitSize) {
    message.error('文件不能超过 ' + fileSize + ' MB');
    return Upload.LIST_IGNORE;
  }
  // 限制文件格式
  let fileSuf = file.name.split('.');
  let suffix = fileSuf[fileSuf.length - 1].toLowerCase();
  if (limitType.indexOf('.' + suffix) === -1) {
    message.error('文件限' + limitType.join('、') + '格式');
    return Upload.LIST_IGNORE;
  }
  let nameLength = limitFileNameLength ? limitFileNameLength : 100;
  // 限制文件名长度
  if (file.name.length > nameLength) {
    message.error('文件名长度不能超过 ' + nameLength + ' 字');
    return Upload.LIST_IGNORE;
  }
  let nameLimit = limitFileName ? limitFileName : ['&', '+', '=', '#', '%'];
  // 限制文件名中不应包含字符
  for (let i = 0; i < nameLimit.length; i++) {
    const item = nameLimit[i];
    if (file.name.indexOf(item) !== -1) {
      message.error('文件名中不应包含字符 ' + nameLimit.join(' ') + ' 字符');
      return Upload.LIST_IGNORE;
    }
  }
  return true;
};
/**
 * 文件 Url 转义
 **/
export const encodeFileUrl = (url: string) => {
  if (url) {
    let transformUrl: string = url.replace('+', '%2B')
      .replace('&', '%26')
      .replace('#', '%23');
    return transformUrl;
  } else {
    return '';
  }
};
/**
 * 获取常用校验
 * @param ruleType: required | selectRequired | inputNotSpace | email | phone | idNumber | url | password
 * @param required（可选）: 是否必填（如果单独需要必填，ruleType 设置为 required 即可，如果要满足其他校验且必填，该值才设为 true）
 **/
export const getRules = (ruleType: RuleType, required?: boolean) => {
  const commonRules: Map<string, Array<Rule>> = new Map([
    ['required', [{
      required: true,
      message: '请输入'
    }]],
    ['selectRequired', [{
      required: true,
      message: '请选择'
    }]],
    ['inputNotSpace', [{
      whitespace: true,
      message: '不能只有空格'
    }, {
      pattern: /^[^\s]*$/,
      message: '不能包含空格及其他空白字符'
    }]],
    ['email', [{
      pattern: /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/,
      message: '请输入正确邮箱格式'
    }]],
    ['phone', [{
      pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,
      message: '请输入正确手机号格式'
    }]],
    ['idNumber', [{
      pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
      message: '请输入正确身份证号格式'
    }]],
    ['url', [{
      pattern: /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/,
      message: '请输入合法 url'
    }]],
    ['password', [{
      pattern: /^[_a-zA-Z0-9]+$/,
      message: '仅由英文字母，数字以及下划线组成'
    }]]
  ]);
  const returnRules: Array<Rule> = commonRules.get(ruleType) || [];
  if (required) {
    // @ts-ignore
    returnRules.unshift(commonRules.get('required')[0]);
  }
  return returnRules;
};
/**
 * 节流（连续大量触发的事件应该都要携带该函数）
 * @param fn: 真正要执行的函数
 * @param wait: 等待时间，默认 500 ms
 **/
export const throttle = (fn: Function, wait: number = 100) => {
  let time = Date.now();
  return () => {
    if ((time + wait - Date.now()) < 0) {
      fn();
      time = Date.now();
    }
  };
};
