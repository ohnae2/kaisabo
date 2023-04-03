/**
 * 문자 여부 체크
 * @param {*} str
 * @returns boolean
 */
const isString = (str) => {
  let strType = typeof str;
  if (strType == 'string' || (strType == 'object' && str instanceof String)) {
    return true;
  }
  return false;
};

/**
 * 숫자 여부 체크
 * @param {*} number
 * @returns boolean
 */
const isNumber = (number) => {
  let num = Number(number);
  return isNaN(num) == false;
};

/**
 * Object 여부 체크
 * @param {*} object
 * @returns boolean
 */
const isObject = (object) => {
  if (object === null) {
    return false;
  }
  return typeof object === 'object';
};

/**
 * Array 여부 체크
 * @param {*} array
 * @returns boolean
 */
const isArray = (array) => {
  if (array === null) {
    return false;
  }
  return Array.isArray(array);
};

/**
 * 문자열 빈값 체크
 * @param {*} str
 * @returns boolean
 */
const isEmpty = (str) => {
  return str == null || str == undefined || str.length == 0;
};

/**
 * 문자 공백 제거
 * @param {*} str
 * @returns boolean
 */
const trim = (str) => {
  return str.replace(/(^\s*)|(\s*$)/g, '');
};

/**
 * 문자를 숫자로 변환
 * @param {*} str
 * @returns number
 */
const toNumber = (str) => {
  if (isNumber(str)) {
    return Number(str);
  }
  return 0;
};

/**
 * 길이에 맞게 앞자리에 0을 붙인다.
 * leadingZeros(1,3) -> 003
 * @param {*} number
 * @param {*} length
 * @returns string
 */
const leadingZeros = (number, length) => {
  var zero = '';
  number = number.toString();

  if (number.length < length) {
    for (var i = 0; i < length - number.length; i++) zero += '0';
  }
  return zero + number;
};

const asyncTime = () => {
  return 300;
}

const restoreXSS = (str) => {
  str = str.replace(/&lt;/gi, '<');
  str = str.replace(/&gt;/gi, '>');
  str = str.replace(/&#40;/gi, '(');
  str = str.replace(/&#41;/gi, ')');
  str = str.replace(/&#39;/gi, "'");
  return str;
};

export default {
  isString,
  isNumber,
  isObject,
  isArray,
  isEmpty,
  trim,
  toNumber,
  leadingZeros,
  restoreXSS,
  asyncTime,
};
