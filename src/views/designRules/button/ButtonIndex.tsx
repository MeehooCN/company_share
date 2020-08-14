/**
 * @description: 按钮设计规范
 * @author: cy
 * @createTime: 2020/8/13 11:06
 **/
import React from 'react';
import { Anchor, Col, Row } from 'antd';
import ButtonPosition from './ButtonPosition';
import ButtonType from '@views/designRules/button/ButtonType';
import { TitleWithDescription } from '@components/index';

const ButtonIndex = () => {
  return (
    <>
      <TitleWithDescription title="按钮位置" content="将按钮区放置于用户浏览路径中，便于被用户发现，阅读顺序，如 “F 浏览模式” 和 “Z 浏览模式” 。" />
      <ButtonPosition />
      <TitleWithDescription title="按钮顺序" content="" />
      <ButtonType />
    </>
  );
};
export default ButtonIndex;
