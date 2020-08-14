import React from 'react';
import {Button, Result, Skeleton} from 'antd';

/**
 * @description: ~~
 * @author: cy
 * @createTime: 2020/8/13 13:22
 **/
const ButtonType = () => {
  return (
    <>
      <Skeleton avatar paragraph={{ rows: 4 }} />
      <Skeleton avatar paragraph={{ rows: 4 }} />
      <Skeleton avatar paragraph={{ rows: 4 }} />
      <Result
        status="success"
        title="Successfully Purchased Cloud Server ECS!"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
          <Button type="primary" key="console">
            Go Console
          </Button>,
          <Button key="buy">Buy Again</Button>,
        ]}
      />
      <Result
        status="success"
        title="Successfully Purchased Cloud Server ECS!"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
          <Button type="primary" key="console">
            Go Console
          </Button>,
          <Button key="buy">Buy Again</Button>,
        ]}
      />
    </>
  );
};
export default ButtonType;
