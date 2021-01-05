/**
 * @description: 时间范围选择
 * @author: cnn
 * @createTime: 2021/1/4 16:28
 **/
import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Radio, TimePicker, DatePicker, Row } from 'antd';
import moment from 'moment';
import { dateTimeToHour, dateTimeToMinute, dateToDateString, dateToMonthString } from '@utils/CommonFunc';

declare type RangeType = 'minute' | 'hour' | 'day' | 'month';

const { RangePicker } = DatePicker;
const TimeRangePicker = TimePicker.RangePicker;

/**
 * rangeTypes: 要显示的时间维度，
 * selectDate: 选中的时间，
 * setSelectDate: 设置选中的时间
**/
interface IProps {
  rangeTypes: Array<RangeType>,
  selectDate: any,
  setSelectDate(selectDate: any): void
}

// 获取时间参数
export const getTimeParams = (timeDimension: RangeType, selectDate: Array<any>) => {
  let beginTime: string = '';
  let endTime: string = '';
  if (timeDimension === 'hour') {
    beginTime = selectDate ? dateTimeToHour(selectDate[0]) : '';
    endTime = selectDate ? dateTimeToHour(selectDate[1]) : '';
  } else if (timeDimension === 'day') {
    beginTime = selectDate ? dateToDateString(selectDate[0]) : '';
    endTime = selectDate ? dateToDateString(selectDate[1]) : '';
  } else if (timeDimension === 'month') {
    beginTime = selectDate ? dateToMonthString(selectDate[0]) : '';
    endTime = selectDate ? dateToMonthString(selectDate[1]) : '';
  } else if (timeDimension === 'minute') {
    beginTime = selectDate ? dateTimeToMinute(selectDate[0]) : '';
    endTime = selectDate ? dateTimeToMinute(selectDate[1]) : '';
  }
  return { timeDimension, beginTime, endTime };
};

const MyRangePicker = (props: IProps, ref: any) => {
  const { selectDate, setSelectDate } = props;
  let rangeTypes = props.rangeTypes;
  if (rangeTypes.length === 0) {
    rangeTypes = ['hour', 'day', 'month'];
  }
  const [timeDimension, setTimeDimension] = useState<any>('hour');
  useImperativeHandle(ref, () => ({
    getTimeDimension: timeDimension,
  }));
  // 限制时间选择
  const disabledDate = (current: any) => {
    if (!selectDate || selectDate.length === 0) {
      return false;
    }
    let maxDay: number = 30;
    let timeSpace: string = 'days';
    if (timeDimension === 'month') {
      maxDay = 366;
    }
    if (timeDimension === 'minute') {
      timeSpace = 'minutes';
      maxDay = 60;
    }
    const tooLate = selectDate[0] && current.diff(selectDate[0], timeSpace) > maxDay;
    const tooEarly = selectDate[1] && selectDate[1].diff(current, timeSpace) > maxDay;
    return tooEarly || tooLate;
  };
  // 切换时间维度
  const onTimeDimensionChange = (e: any) => {
    const dimension: string = e.target.value;
    setTimeDimension(e.target.value);
    if (dimension === 'hour') {
      setSelectDate([moment().startOf('day'), moment()]);
    } else if (dimension === 'day') {
      setSelectDate([moment().startOf('month'), moment()]);
    } else if (dimension === 'month') {
      setSelectDate([moment().startOf('year'), moment()]);
    } else if (dimension === 'minute') {
      setSelectDate([moment().startOf('hour'), moment()]);
    }
  };
  // 展开日期选择框
  const onOpenChange = (open: boolean) => {
    if (open) {
      setSelectDate(undefined);
    }
  };
  // 获取时间范围组件
  const getTimeRange = () => {
    switch (timeDimension) {
      case 'minute':
        return (
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            value={selectDate}
            onChange={(date) => setSelectDate(date)}
            onCalendarChange={(val) => setSelectDate(val)}
            disabledDate={disabledDate}
            onOpenChange={onOpenChange}
          />
        );
      case 'hour':
        return <TimeRangePicker picker="time" value={selectDate} onChange={(time) => setSelectDate(time)} format="HH" />;
      case 'day':
      case 'month':
      default:
        return (
          <RangePicker
            picker={timeDimension}
            value={selectDate}
            onChange={(date) => setSelectDate(date)}
            onCalendarChange={(val) => setSelectDate(val)}
            disabledDate={disabledDate}
            onOpenChange={onOpenChange}
          />
        );
    }
  };
  return (
    <Row align="middle">
      <div style={{ marginRight: 10 }}>时间维度：</div>
      <Radio.Group value={timeDimension} onChange={onTimeDimensionChange} buttonStyle="solid" style={{ marginRight: 20 }}>
        {rangeTypes.indexOf('minute') !== -1 && <Radio.Button key="minute" value="minute">分钟</Radio.Button>}
        {rangeTypes.indexOf('hour') !== -1 && <Radio.Button key="hour" value="hour">小时</Radio.Button>}
        {rangeTypes.indexOf('day') !== -1 && <Radio.Button key="day" value="day">天</Radio.Button>}
        {rangeTypes.indexOf('month') !== -1 && <Radio.Button key="month" value="month">月</Radio.Button>}
      </Radio.Group>
      <div style={{ marginRight: 10 }}>时间范围：</div>
      {getTimeRange()}
    </Row>
  );
};
export default forwardRef(MyRangePicker);
