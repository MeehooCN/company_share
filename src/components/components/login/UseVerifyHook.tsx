/**
 * @description: 自定义 验证码登录 公共hook
 * @author: lll
 * @createTime: 2020/1/05 10:23
 **/
import { useEffect, useState } from 'react';

const useVerifyHook = () => {
  const [verifyLoading, setVerifyLoading] = useState<boolean>(false);
  const [countDown, setCountDown] = useState<number>(0);
  useEffect(() => {
    if (countDown > 0) {
      setTimeout(() => {
        setCountDown(countDown - 1);
      }, 1000);
    }
  }, [countDown]);
  return { verifyLoading, setVerifyLoading, countDown, setCountDown };
};
export { useVerifyHook };