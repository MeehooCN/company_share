/**
 * @description: 图片验证码登录示例
 * @author: lll
 * @createTime: 2021/1/05 13:25
 **/
import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import { ImageCaptcha } from '@components/index';
import { get } from '@utils/Ajax';

const ImageLogin = () => {
  const [blob, setBlob] = useState<any>();
  useEffect(() => {
    getCode();
  }, []);
  // 请求后台接口，获取验证码
  const getCode = () => {
    get('security/kaptcha/getKaptchaImage', { responseType: 'blob' }, (data: any) => {
      setBlob(data);
    });
  };
  return (
    <div>
      {/* 只写了获取图片验证码的form表单部分，请根据项目需求，自行补充 */}
      <Form style={{ width: 400 }}>
        {/* 下面是填写图片验证码表单部分 */}
        <ImageCaptcha blob={blob} changeImage={getCode} />
      </Form>
    </div>
  );
};
export default ImageLogin;