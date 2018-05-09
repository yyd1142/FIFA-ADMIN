import Vue from 'vue'
import axios from 'axios'
import apiConfig from '../api.config'

const http = (path, method, domain) => {
  return (params, data) => {
    let newPath = path;
    return new Promise((resolve, reject) => {
      let regexp = /(\${[a-zA-Z0-9_]+})/g
      if (path.search(regexp) != -1 && '_paths' in params) {
        let _paths = params['_paths'];
        let pathValues = path.match(regexp);
        if (pathValues && pathValues.length > 0) {
          for (let pValue of pathValues) {
            let key = pValue.substr(2, pValue.length - 3);
            if (key in _paths) {
              newPath = newPath.replace(pValue, _paths[key]);
            }
          }
        }
      }
      delete params['_paths'];
      for (let key in Object.keys(params)) {
        let value = params[key];
        if (value == null || value == undefined) {
          delete params[key];
        }
      }
      axios({
        method: method,
        url: apiConfig.baseUrl + newPath,
        data: method === 'post' ? data : params,
        params: params ? params : '',
        timeout: 10000,
      }).then((response) => {
        resolve(response.data);
        if (response.data.code != 0) {
          console.error(`请求数据错误，[错误代码:${response.data.code}], ${response.data.msg}`);
        }
      }).catch((error) => {
        let errorString = error.toString();
        if (error.code == "ECONNABORTED") {
          reject(`请求数据超时，请检查网络连接是否正常!`);
        } else if (errorString.match('^Error: Network Error')) {
          reject(`网络异常，请检查网络连接是否正常!`)
        } else {
          reject(`网络异常[${errorString}]，请检查网络是否正常!`);
        }
      })
    })
  }
}

const httpGet = function (path, domain) {
  return http(path, 'get', domain)
}

const httpPost = function (path, domain) {
  return http(path, 'post', domain)
}

Vue.prototype.$httpGet = httpGet;
Vue.prototype.$httpPost = httpPost;

export default {
  userInfo: httpGet('/user')
}
