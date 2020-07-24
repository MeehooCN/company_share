/**
 * @description: ReactEcharts y 轴数据过小导致无法处理点击事件解决方法
 * @author: cnn
 * @createTime: 2020/7/21 17:25
 **/
import React from 'react';
import { Row } from 'antd';
import { TitleWithDescription, CodeBox } from '@components/index';

const EchartsYError = () => {
  const code: string = 'onChartReady(echart) {\n' +
    '    echart.getZr().on(\'click\',params=>{\n' +
    '        const pointInPixel = [params.offsetX, params.offsetY];\n' +
    '        if (echart.containPixel(\'grid\',pointInPixel)) {\n' +
    '            let xIndex = echart.convertFromPixel({seriesIndex:0},[params.offsetX, params.offsetY])[0];\n' +
    '            /*事件处理代码书写位置*/\n' +
    '            let score = this.props.xData[xIndex];\n' +
    '            this.props.showYear(score);\n' +
    '        }\n' +
    '    });\n' +
    '}\n' +
    '\n' +
    '<ReactEcharts onChartReady={this.onChartReady}/>';
  return (
    <div>
      <TitleWithDescription title="ReactEcharts" content="ReactEcharts y 轴数据过小导致无法处理点击事件解决方法。" />
      <Row style={{ marginTop: 20 }}>
        <CodeBox code={code} />
      </Row>
    </div>
  );
};
export default EchartsYError;
