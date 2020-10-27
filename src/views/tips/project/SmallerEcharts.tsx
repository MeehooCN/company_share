/**
 * @description: 减小 Echarts 打包体积，按需引入所需图表。
 * @author: cnn
 * @createTime: 2020/10/27 14:40
 **/
import React from 'react';
import { Row } from 'antd';
import { CodeBox, TitleWithDescription } from '@components/index';

const SmallerEcharts = () => {
  const code: string = '- import ReactEcharts from \'echarts-for-react\';\n' +
    '- import echarts from \'echarts\';\n' +
    '+ import ReactEchartsCore from \'echarts-for-react/lib/core\';\n' +
    '+ import echarts from \'echarts/lib/echarts\';\n' +
    '// 具体引入哪些图表及配置可根据需求增删\n' +
    '+ import \'echarts/lib/chart/line\';\n' +
    '\n' +
    '- <ReactEcharts option={options} />\n' +
    '+ <ReactEchartsCore echarts={echarts} option={options} />';
  return (
    <div>
      <TitleWithDescription
        title="减小 Echarts 打包体积，按需引入所需图表"
        content="亲测从 800+ kb 减少到 300+ kb。"
        url="https://github.com/hustcc/echarts-for-react"
      />
      <Row style={{ marginTop: 20 }}>
        <CodeBox code={code} />
      </Row>
    </div>
  );
};
export default SmallerEcharts;
