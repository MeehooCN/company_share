/**
 * @description: 图片验证码
 * @author: lll
 * @createTime: 2021/1/04 16:31
 **/
import React, { useEffect, useRef } from 'react';
import { Row, Input, Form } from 'antd';
import { VerifiedOutlined } from '@ant-design/icons';
interface ImageCaptchaProps {
  blob: any
  changeImage(): void
}
const ImageCaptcha = (props: ImageCaptchaProps) => {
  const { blob, changeImage } = props;
  const imageRef: any = useRef();
  // 格式化图片格式
  useEffect(() => {
    if (blob) {
      const img = imageRef.current;
      img.onload = () => {
        window.URL.revokeObjectURL(img.src);
      };
      img.src = window.URL.createObjectURL(blob);
    }
  }, [blob]);
  return (
    <Form.Item
      name="verifyCode"
      rules={[{ required: true, message: '请输入验证码' }]}
    >
      <Row justify="space-between">
        <Input prefix={<VerifiedOutlined />} placeholder="验证码，点击图片刷新" size="large" style={{ width: document.body.clientWidth < 1400 ? 'calc(100%)' : 'calc(60%)' }} />
        <Row style={{ marginTop: document.body.clientWidth < 1400 ? 10 : 0 }}>
          <img src="" alt="pic" ref={imageRef} onClick={changeImage} />
        </Row>
      </Row>
    </Form.Item>
  );
};
export default ImageCaptcha;