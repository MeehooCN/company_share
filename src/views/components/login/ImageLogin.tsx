/**
 * @description: 图片验证码登录示例
 * @author: lll
 * @createTime: 2021/1/05 13:25
 **/
import React, { useEffect, useState } from 'react';
import { Row } from 'antd';
import { API, CodeExample, ImageCaptcha, TitleWithDescription } from '@components/index';
// @ts-ignore
import codeImage1 from '@static/images/loginCode/code1.png';
// @ts-ignore
import codeImage2 from '@static/images/loginCode/code2.png';
// @ts-ignore
import codeImage3 from '@static/images/loginCode/code3.png';
// @ts-ignore
import codeImage4 from '@static/images/loginCode/code4.png';
// @ts-ignore
import codeImage5 from '@static/images/loginCode/code5.png';

const ImageLogin = () => {
  const [blob, setBlob] = useState<any>();
  const [base64, setBase64] = useState<any>();
  const [currCodeIndex, setCurrCodeIndex] = useState<number>(0);
  useEffect(() => {
    getImageUrl();
  }, [currCodeIndex]);
  useEffect(() => {
    if (base64) {
      getBlob();
    }
  }, [base64]);
  // 图片转base64格式
  const getBase64Image = (img: any) => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx: any = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);
    const ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase();
    const dataURL = canvas.toDataURL('image/' + ext);
    return dataURL;
  };
  // base64 转 blob 对象
  const getBlob =  () => {
    let byteString = atob(base64.split(',')[1]);
    const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const BlobImage = new Blob([ab], { type: mimeString });
    setBlob(BlobImage);
  };
  // 获取图片
  const getImageUrl = () => {
    const codeImageList = [codeImage1, codeImage2, codeImage3, codeImage4, codeImage5];
    let img = codeImageList[currCodeIndex];// codeImage 就是你的图片路径
    let image = new Image();
    image.src = img;
    let base64: any = '';
    image.onload = () => {
      base64 = getBase64Image(image);
      setBase64(base64);
    };
  };
  // 改变验证码图片
  const changeImage = () => {
    // 请求后台接口，改变验证码图片，使用该组件时只需要以下注释部分
    // get('security/kaptcha/getKaptchaImage', { responseType: 'blob' }, (data: any) => {
    //   setBlob(data);
    //   form.setFieldsValue({
    //     verifyCode: ''
    //   });
    // });
    // 模仿点击图片，连接后台接口，改变图片验证码，使用该组件时不需要以下部分
    if (currCodeIndex < 4) {
      const currIndex = currCodeIndex + 1;
      setCurrCodeIndex(currIndex);
    } else {
      setCurrCodeIndex(0);
    }
  };
  const imageLoginParamList = [{
    name: 'blob',
    description: '必填，生成验证码图片的图片流',
    type: 'any',
    defaultValue: ''
  }, {
    name: 'changeImage',
    description: '必填，改变验证码图片',
    type: '(data: any) => void',
    defaultValue: ''
  }];
  const viewComponents = <ImageCaptcha blob={blob} changeImage={changeImage} />;
  const code: string = '<ImageCaptcha blob={blob} changeImage={changeImage} />';
  return (
    <Row>
      <TitleWithDescription title="ImageLogin" content="图片验证码登录。" />
      <TitleWithDescription title="示例" titleSize={24} content="" style={{ marginTop: 50, marginBottom: 10 }} />
      <CodeExample viewComponents={viewComponents} code={code} />
      <API dataList={imageLoginParamList} />
    </Row>
  );
};
export default ImageLogin;