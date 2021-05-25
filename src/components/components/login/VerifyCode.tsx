/**
 * @description: 短信验证码
 * @author: lll
 * @createTime: 2021/1/04 16:57
 **/
import React from 'react';
import { Input, Button, Form } from 'antd';
import { MailOutlined } from '@ant-design/icons';

interface VerifyCodeProps {
  verifyLoading: boolean,
  countDown: number,
  getCode(): void
}

const VerifyCode = (props: VerifyCodeProps) => {
  const { verifyLoading, countDown, getCode } = props;
  return (
    <Form.Item rules={[{ required: true, message: '请输入短信验证码' }]} name="verifyCode">
      <Input
        className="login-input"
        size="large"
        placeholder="请输入短信验证码"
        prefix={<MailOutlined />}
        suffix={<Button loading={verifyLoading} type="primary" disabled={countDown > 0} onClick={getCode}>{countDown > 0 ? countDown + 's 后重新获取' : '点击获取'}</Button>}
      />
    </Form.Item>
  );
};
export default VerifyCode;
