/**
 * @description: 时间范围选择器
 * @author: cnn
 * @createTime: 2021/1/5 9:54
 **/
import React, { useEffect, useRef, useState } from 'react';
import { API, CodeExample, getTimeParams, MyRangePicker, TitleWithDescription } from '@components/index';
import moment from 'moment';
import { Row } from 'antd';

const MyRangePickerView = () => {
  const timeRef: any = useRef();
  const [selectDate, setSelectDate] = useState<any>([moment().startOf('day'), moment()]);
  useEffect(() => {
    console.log(getTimeParams(timeRef.current.getTimeDimension, selectDate));
  }, [selectDate]);
  const pickerParamList = [{
    name: 'rangeTypes',
    description: '需要显示的时间维度列表。',
    type: 'Array<string>',
    defaultValue: '[\'hour\', \'day\', \'month\']'
  }, {
    name: 'selectDate',
    description: '选中的时间。',
    type: 'undefined || [Moment, Moment]',
    defaultValue: '无'
  }, {
    name: 'setSelectDate',
    description: '设置选中的时间。',
    type: 'Function',
    defaultValue: '无'
  }];
  const viewComponents = <MyRangePicker rangeTypes={['minute', 'hour', 'day', 'month']} setSelectDate={setSelectDate} ref={timeRef} selectDate={selectDate} />;
  const code: string = 'import React, { useRef, useState } from \'react\';\n' +
    'import { CodeExample, MyRangePicker } from \'@components/index\';\n' +
    'import moment from \'moment\';\n' +
    '\n' +
    'const MyRangePickerView = () => {\n' +
    '  const timeRef: any = useRef();\n' +
    '  const [selectDate, setSelectDate] = useState<any>([moment().startOf(\'day\'), moment()]);\n' +
    '  return (\n' +
    '    <MyRangePicker rangeTypes={[\'minute\', \'hour\', \'day\', \'month\']} setSelectDate={setSelectDate} ref={timeRef} selectDate={selectDate} />\n' +
    '  );\n' +
    '};\n' +
    'export default MyRangePickerView;';
  return (
    <Row>
      <TitleWithDescription title="MyRangePickerView" content="分维度的时间范围选择器。" />
      <TitleWithDescription title="示例" titleSize={24} content="" style={{ marginTop: 50, marginBottom: 10 }} />
      <CodeExample viewComponents={viewComponents} code={code} />
      <API dataList={pickerParamList} />
    </Row>
  );
};
export default MyRangePickerView;
