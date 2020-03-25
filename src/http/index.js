import axios from 'axios';
import user from 'store/modules/user';
import baseUrl from './apiRoot.js';

const App = window.App;
// 实例化
const myAxios = axios.create({
  baseURL: baseUrl,
  timeout: 50000
});

// 添加请求拦截器
myAxios.interceptors.request.use(config => {
  config.headers['access-token'] = config.headers['access-token']
    ? config.headers['access-token']
    : user.state.token;
  return config;
}, error);

// 添加响应拦截器
myAxios.interceptors.response.use(response => {
  let success = true;
  let resultMsg = '';
  let data = '';
  if (response && response.status === 200) {
    if (
      response.data.errorCode === 100001 ||
      response.data.resultCode === 1030102
    ) {
      resultMsg = '请重新登录';
      success = false;
      user.dispatch('logout');
    } else {
      if (response.data) {
        data = response.data.data;
        if (!data && typeof data !== 'boolean') {
          data = '';
        }
        resultMsg = response.data.resultMsg || '';
        if (response.data.resultCode !== 1) {
          success = false;
          resultMsg = response.data.resultMsg || '接口失败';
        }
      }
    }
  } else if (response && response.status) {
    resultMsg = `请求状态错误码：${response.status}`;
    success = false;
  }
  if (!success && window.App) {
    // 需要使用自己的toast组件
    // window.App.$toast.fail(resultMsg);
  }
  return {
    resultMsg,
    success,
    data
  };
}, error);

function error(error) {
  let resultMsg = `网络异常：`;

  if (error.response) {
    resultMsg = `${resultMsg} ${error.response.status} ${error.response.statusText}`;
  }

  if (App) {
    // 业务开发自行处理
    // App.$toast.fail(resultMsg);
  }

  return {
    resultMsg: resultMsg,
    success: false
  };
}
export default myAxios;
