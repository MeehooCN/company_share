/**
 * @description: 标题
 * @author: cnn
 * @createTime: 2020/7/21 10:06
 **/
import React from 'react';
import { Row } from 'antd';
import { TitleWithDescription, API, CodeExample, MyTitle } from '@components/index';

interface IProps {}

interface IState {}

class Title extends React.Component<IProps, IState> {
  render(): React.ReactNode {
    const titleParamList = [{
      name: 'title',
      description: '标题名称',
      type: 'string',
      defaultValue: ''
    }, {
      name: 'color',
      description: '可选，border 颜色',
      type: 'string',
      defaultValue: '主题色'
    }];
    const viewComponents = <MyTitle title="我的标题一" />;
    const code = '<MyTitle title="我的标题一" />';
    return (
      <Row>
        <TitleWithDescription title="MyTitle" content="标题。" />
        <TitleWithDescription title="示例" titleSize={24} content="" style={{ marginTop: 50, marginBottom: 10 }} />
        <CodeExample viewComponents={viewComponents} code={code} />
        <API dataList={titleParamList} />
      </Row>
    );
  }
}
export default Title;
