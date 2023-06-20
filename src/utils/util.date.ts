import dayjs, { ConfigType, ManipulateType } from "dayjs";
// const timezone = require('dayjs/plugin/timezone');
// const utc = require('dayjs/plugin/utc');

// dayjs.extend(utc);
// dayjs.extend(timezone);
// dayjs.tz.setDefault('Asia/Seoul');

export const FullDateFormat = "YYYY-MM-DD HH:mm";
export const DateFormat = "YYYYMMDDHHmm";
export const YYYY_MM_DD_Format = "YYYY-MM-DD";

const isValid = (date: Date) => {
  return date && dayjs(date).isValid();
};

const format = (date: any, format = FullDateFormat) => {
  return date && dayjs(date).isValid() && dayjs(date).format(format);
};

const add = (date: Date, addDate: number, type: ManipulateType, format = FullDateFormat) => {
  let value: any;
  if (isValid(date)) {
    value = dayjs(date as ConfigType).add(addDate, type);
    value = value.format(format);
  }
  return value;
};

/**
 * 해당월의 마지막 일자 반환한다.
 * @param {*} date
 * @returns number
 */
const getMonthLastDay = (date: any) => {
  return date && dayjs(date).isValid() && dayjs(date).daysInMonth();
};

/**
 * 현재 날짜 반환.
 * @param {*} format
 * @returns string
 */
const getToday = (format = FullDateFormat) => {
  return dayjs().format(format);
};
const getExcelName = (format = DateFormat) => {
  return dayjs().format(format);
};

export default {
  format,
  isValid,
  add,
  getMonthLastDay,
  getToday,
  getExcelName,
};
