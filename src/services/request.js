import qs from 'qs'
import axios from 'axios';
import statusCode from "./statusCode";
import {
  useRouter
} from 'vue-router';
import {
  ElMessage
} from 'element-plus';
const service = axios.create({
  baseURL: process.env.VUE_APP_BASIC_API,
  timeout: 60000,
  withCredentials: false, // allow cookie
})
const router = useRouter()
// 取消请求接口
const cancelToken = axios.CancelToken;

let cancel, promiseArr = {};

service.interceptors.request.use(config => {
  // 取消重复请求
  if (promiseArr[config.url]) {
    promiseArr[config.url]('操作取消');
  }
  if (config.method === 'delete' || config.method === 'get') {

    config.paramsSerializer = function (params) {

      return qs.stringify(params, {
        arrayFormat: 'repeat'
      })
    }
  }
  config.headers['Content-Type'] = config.url === '/articles/uploads' ? 'multipart/form-data' : config.headers['Content-Type'];
  promiseArr[config.url] = cancel;
  return config;
}, error => {
  ElMessage.error({
    message: '加载超时'
  })

  return Promise.reject(error);
})

service.interceptors.response.use(response => {
  return response.data;
}, error => {
  if (error && error.response) {
    const {
      data,
      status
    } = error.response

    const message = data.message || statusCode[status] || '请求错误';
    ElMessage.error(`${status}: ${message}`);
    clearStorage(data.code);
    return Promise.reject(message);
  } else {
    // 无状态码，网络错误
    ElMessage.error({
      message: '请求超时, 请刷新重试'
    })
  }
  return Promise.reject(error);
})

const clearStorage = (code) => {
  if ([10101, 10102, 10103].includes(code)) {
    setTimeout(() => {
      localStorage.clear();
      location.href = '/login'
    }, 1000)
  }
}

const getToken = () => {
  let userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    return JSON.parse(userInfo).token;
  } else {
    ElMessage.error('请先登录');
    setTimeout(() => {
      localStorage.clear();
      router.push('/login');
    }, 1000)
  }
}

export default {
  // 异步带验证get请求
  async authGet(url, params) {
    return service({
      method: 'get',
      url,
      params,
      headers: {
        Authorization: `Bearer ${getToken()}`
      },
      cancelToken: new cancelToken(c => {
        cancel = c;
      })
    })
  },
  // 异步不带验证get请求
  async get(url, params) {
    return service({
      method: 'get',
      url,
      params,
      cancelToken: new cancelToken(c => {
        cancel = c;
      })
    })
  },
  // 异步带验证post请求
  async authPost(url, data) {
    return service({
      method: 'post',
      url,
      data,
      headers: {
        Authorization: `Bearer ${getToken()}`
      },
      cancelToken: new cancelToken(c => {
        cancel = c;
      })
    })
  },
  // 异步post请求
  async post(url, data, headers) {
    return service({
      method: 'post',
      url,
      data,
      headers,
      cancelToken: new cancelToken(c => {
        cancel = c;
      })
    })
  },
  // 异步带验证Delete请求
  async authDelete(url, params) {
    return service({
      method: 'delete',
      url,
      params,
      headers: {
        Authorization: `Bearer ${getToken()}`
      },
      cancelToken: new cancelToken(c => {
        cancel = c;
      })
    })
  },
  // 异步带验证patch请求
  async authPatch(url, data) {
    return service({
      method: 'patch',
      url,
      data,
      headers: {
        Authorization: `Bearer ${getToken()}`
      },
      cancelToken: new cancelToken(c => {
        cancel = c;
      })
    })
  }


}