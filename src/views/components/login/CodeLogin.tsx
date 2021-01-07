/**
 * @description: 手机号验证码登录示例
 * @author: lll
 * @createTime: 2021/1/05 13:29
 **/
import React from 'react';
import { Row } from 'antd';
import { API, CodeExample, TitleWithDescription, VerifyCode } from '@components/index';
import { useVerifyHook } from '@components/components/login/UseVerifyHook';

const CodeLogin = () => {
  const { verifyLoading, setVerifyLoading, countDown, setCountDown } = useVerifyHook();
  // 请求后台接口，获取验证码,设置倒计时
  const getCode = () => {
    setVerifyLoading(true);
    // 请求后台接口，发送验证码，成功则设置倒计时为60s，使用该组件时只需要以下注释部分
    // Ajax.post('security/cusUserRegister/getVerifyCode', params, { dataType: 'form' }, (data: any) => {
    //   if (data.flag === 0) {
    //     setCountDown(60);
    //   }
    //   setVerifyLoading(false);
    // });
    // 模仿调用后台接口成功，设置60s倒计时，使用该组件时不需要以下部分
    setTimeout(() => {
      setCountDown(60);
      setVerifyLoading(false);
    }, 2000);
  };
  const codeLoginParamList = [{
    name: 'verifyLoading',
    description: '必填，获取验证码按钮的loading状态',
    type: 'boolean',
    defaultValue: ''
  }, {
    name: 'countDown',
    description: '必填，倒计时时长',
    type: 'number',
    defaultValue: ''
  }, {
    name: 'getCode',
    description: '必填，获取验证码的方法',
    type: '(data: any) => void',
    defaultValue: ''
  }];
  const viewComponents = <VerifyCode verifyLoading={verifyLoading} countDown={countDown} getCode={getCode} />;
  const code: string = '<VerifyCode verifyLoading={verifyLoading} countDown={countDown} getCode={getCode} />';
  return (
    <Row>
      <TitleWithDescription title="CodeLogin" content="手机验证码登录。" />
      <TitleWithDescription title="示例" titleSize={24} content="" style={{ marginTop: 50, marginBottom: 10 }} />
      <CodeExample viewComponents={viewComponents} code={code} />
      <API dataList={codeLoginParamList} />
    </Row>
  );
};
export default CodeLogin;