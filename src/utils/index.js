import Config from '@/../config/env.js';

const PROJECT_NAME = Config.name;

// 设置localstorage
export function setLocalStorage(key, value) {
  return localStorage.setItem(PROJECT_NAME + '-' + key, JSON.stringify(value));
}

// 获取localstorage
export function getLocalStorage(key) {
  let json = localStorage.getItem(PROJECT_NAME + '-' + key);
  if (!json || json === 'undefined') {
    return '';
  }

  return JSON.parse(json);
}

// 删除localstorage
export function removeLocalStorage(key) {
  return localStorage.removeItem(PROJECT_NAME + '-' + key);
}

// 获取参数
export function getParmas(url) {
  let theRequest = {};
  let strs;
  if (url.indexOf('?') !== -1) {
    var str = url.split('?')[1];
    strs = str.split('&');
    for (var i = strs.length - 1; i >= 0; i--) {
      theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1];
    }
  }
  return theRequest;
}

// 获取设备
export function getDevice() {
  var agent = navigator.userAgent.toLowerCase();
  var device = {};
  if (agent.includes('micromessenger')) {
    device.app = 'weixin'; // 在微信中打开
  } else if (agent.match(/QQ\//i) === 'qq/') {
    device.app = 'qq'; // 在QQ打开
  } else if (agent.match(/WeiBo/i) === 'weibo') {
    device.app = 'weibo'; // 在新浪微博客户端打开
  }

  if (agent.indexOf('android') !== -1) {
    device.platform = 'Android';
  } else if (agent.indexOf('iphone') !== -1) {
    device.platform = 'iOS';
  }

  return device;
}

/**
 * @descrition: 这个函数对输入的参数检查时候是合格的身份证号码，其身份证有效性无法判断。检测的颗粒度可以定制。
 * @param->num : 待验证的参数
 * 0、校验成功!
 * 1、地址编码错误!
 * 2、输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X!
 * 3、输入的身份证号里出生日期不对!
 * 4、18位身份证的校验码不正确！
 * 5、校验失败!
 */
export function checkIdCards(num) {
  num = num.toUpperCase();
  let cityCode = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外 '
  };
  if (!cityCode[num.substr(0, 2)]) {
    return 1;
  }
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
  if (!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num)) {
    return 2;
  }
  // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
  // 下面分别分析出生日期和校验位
  let len, re;
  len = num.length;
  if (len === 15) {
    re = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
    let arrSplit = num.match(re);
    // 检查生日日期是否正确
    let dtmBirth = new Date(
      '19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]
    );
    let bGoodDay;
    bGoodDay =
      dtmBirth.getYear() === Number(arrSplit[2]) &&
      dtmBirth.getMonth() + 1 === Number(arrSplit[3]) &&
      dtmBirth.getDate() === Number(arrSplit[4]);
    if (!bGoodDay) {
      return 3;
    } else {
      // 将15位身份证转成18位
      // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
      let arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      let arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
      let nTemp = 0;
      let k;
      num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
      for (k = 0; k < 17; k++) {
        nTemp += num.substr(k, 1) * arrInt[k];
      }
      num += arrCh[nTemp % 11];
      return 0;
    }
  }
  if (len === 18) {
    re = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
    let arrSplit = num.match(re);
    // 检查生日日期是否正确
    let dtmBirth = new Date(
      arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]
    );
    let bGoodDay;
    bGoodDay =
      dtmBirth.getFullYear() === Number(arrSplit[2]) &&
      dtmBirth.getMonth() + 1 === Number(arrSplit[3]) &&
      dtmBirth.getDate() === Number(arrSplit[4]);
    if (!bGoodDay) {
      return 3;
    } else {
      // 检验18位身份证的校验码是否正确。
      // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
      let valnum;
      let arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      let arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
      let nTemp = 0;
      let k;
      for (k = 0; k < 17; k++) {
        nTemp += num.substr(k, 1) * arrInt[k];
      }
      valnum = arrCh[nTemp % 11];
      if (valnum !== num.substr(17, 1)) {
        return 4;
      }
      return 0;
    }
  }
  return 5;
}
