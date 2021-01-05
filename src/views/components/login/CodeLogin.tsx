/**
 * @description: 手机号验证码登录示例
 * @author: lll
 * @createTime: 2021/1/05 13:29
 **/
import React from 'react';
import { Form, message, Input } from 'antd';
import { VerifyCode } from '@components/index';
import { useVerifyHook } from '@components/components/login/UseVerifyHook';
import { post } from '@utils/Ajax';
import { PhoneOutlined } from '@ant-design/icons';

const CodeLogin = () => {
  const [form] = Form.useForm();
  const { verifyLoading, setVerifyLoading, countDown, setCountDown } = useVerifyHook();
  // 请求后台接口，获取验证码
  const getCode = () => {
    if (form.getFieldValue('phone') && form.getFieldValue('phone').length > 0) {
      const phone: string = form.getFieldValue('phone');
      const params = {
        phone: phone
      };
      setVerifyLoading(true);
      post('security/cusUserRegister/getVerifyCode', params, { dataType: 'form' }, (data: any) => {
        if (data.flag === 0) {
          setCountDown(60);
        }
        setVerifyLoading(false);
      });
    } else {
      message.error('请输入手机号！');
    }
  };
  return (
    <div>
      <Form form={form}>
        <Form.Item
          rules={[{
            required: true,
            message: '请输入手机号'
          }, {
            message: '手机号输入不合法',
            pattern: /^1(3|4|5|6|7|8|9)\d{9}$/
          }]}
          name="phone"
        >
          <Input placeholder="请输入手机号" prefix={<PhoneOutlined />} />
        </Form.Item>
        <Form.Item rules={[{ required: true, message: '请输入短信验证码' }]} name="verifyCode">
          <VerifyCode verifyLoading={verifyLoading} countDown={countDown} getCode={getCode} />
        </Form.Item>
      </Form>
    </div>
  );
};
export default CodeLogin;