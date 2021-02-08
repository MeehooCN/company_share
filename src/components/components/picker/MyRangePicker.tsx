/**
 * @description: 时间范围选择
 * @author: cnn
 * @createTime: 2021/1/4 16:28
 **/
import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Radio, TimePicker, DatePicker } from 'antd';
import moment from 'moment';
import { dateTimeToHour, dateTimeToHourWithDate, dateToDateString, dateToMinute, dateToMonthString } from '@utils/CommonFunc';

declare type RangeType = 'minute' | 'hour' | 'day' | 'month';

const { RangePicker } = DatePicker;

/**
 * rangeTypes: 要显示的时间维度，
 * selectDate: 选中的时间，
 * setSelectDate: 设置选中的时间
 * onlyHour: 是否只显示小时
 **/
interface IProps {
  rangeTypes: Array<RangeType>,
  selectDate: any,
  setSelectDate(selectDate: any): void,
  onlyHour?: boolean
}

// 获取时间参数
export const getTimeParams = (timeDimension: RangeType, selectDate: Array<any>, onlyHour?: boolean) => {
  let timeType: number = 0;
  let beginTime: string = '';
  let endTime: string = '';
  if (timeDimension === 'hour') {
    timeType = 0;
    if (onlyHour) {
      beginTime = selectDate ? dateTimeToHour(selectDate[0]) : '';
      endTime = selectDate ? dateTimeToHour(selectDate[1]) : '';
    } else {
      beginTime = selectDate ? dateTimeToHourWithDate(selectDate[0]) : '';
      endTime = selectDate ? dateTimeToHourWithDate(selectDate[1]) : '';
    }
  } else if (timeDimension === 'day') {
    timeType = 1;
    beginTime = selectDate ? dateToDateString(selectDate[0]) : '';
    endTime = selectDate ? dateToDateString(selectDate[1]) : '';
  } else if (timeDimension === 'month') {
    timeType = 2;
    beginTime = selectDate ? dateToMonthString(selectDate[0]) : '';
    endTime = selectDate ? dateToMonthString(selectDate[1]) : '';
  } else if (timeDimension === 'minute') {
    timeType = -1;
    beginTime = selectDate ? dateToMinute(selectDate[0]) : '';
    endTime = selectDate ? dateToMinute(selectDate[1]) : '';
  }
  return { timeType, beginTime, endTime };
};

const MyRangePicker = (props: IProps, ref: any) => {
  const { rangeTypes, selectDate, setSelectDate, onlyHour } = props;
  const [timeDimension, setTimeDimension] = useState<any>('minute');
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
    }
    if (timeDimension === 'hour') {
      maxDay = 23;
      timeSpace = 'hours';
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
        if (onlyHour) {
          // @ts-ignore
          return <TimePicker.RangePicker value={selectDate} onChange={(time) => setSelectDate(time)} format="HH" />;
        } else {
          return (
            <RangePicker
              showTime={{ format: 'HH' }}
              format="YYYY-MM-DD HH"
              value={selectDate}
              onChange={(date) => setSelectDate(date)}
              onCalendarChange={(val) => setSelectDate(val)}
              disabledDate={disabledDate}
              onOpenChange={onOpenChange}
            />
          );
        }
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
    <>
      <div style={{ marginRight: 10 }}>时间维度：</div>
      <Radio.Group value={timeDimension} onChange={onTimeDimensionChange} buttonStyle="solid" style={{ marginRight: 20 }}>
        {rangeTypes.indexOf('minute') !== -1 && <Radio.Button key="minute" value="minute">分钟</Radio.Button>}
        {rangeTypes.indexOf('hour') !== -1 && <Radio.Button key="hour" value="hour">小时</Radio.Button>}
        {rangeTypes.indexOf('day') !== -1 && <Radio.Button key="day" value="day">天</Radio.Button>}
        {rangeTypes.indexOf('month') !== -1 && <Radio.Button key="month" value="month">月</Radio.Button>}
      </Radio.Group>
      <div style={{ marginRight: 10 }}>时间范围：</div>
      {getTimeRange()}
    </>
  );
};
export default forwardRef(MyRangePicker);
