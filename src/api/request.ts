// 引入 axios
import axios from "axios";
const baseURL = 'http://localhost:3000'
// 创建刷新安全实例 当出现 401 或者 cookie 过期 时候使用刷新安全访问实例
const instance = axios.create({
  baseURL: baseURL ,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  },
  // timeout: 1000
});
// 创建验证实例
const securedInstance = axios.create({
  baseURL: baseURL ,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
  // timeout: 1000
});

// 添加请求拦截器

securedInstance.interceptors.request.use((config)=>{
  // 在发送请求之前做些什么
  const method = config.method?.toUpperCase();
  if(method !== 'OPTIONS' && method !== "GET"){
    config.headers = {
      ...config.headers,
      'X-CSRF-TOKEN': localStorage.csrf
    }
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
securedInstance.interceptors.response.use(null, error => {
  if (error.response && error.response.config && error.response.status === 401) {
    // If 401 by expired access cookie, we do a refresh request
    return instance.post('/refresh', {}, { headers: { 'X-CSRF-TOKEN': localStorage.csrf } })
      .then(response => {
        localStorage.csrf = response.data.csrf
        localStorage.signedIn = true
        // After another successfull refresh - repeat original request 再次成功刷新后-重复原始请求
        let retryConfig = error.response.config
        retryConfig.headers['X-CSRF-TOKEN'] = localStorage.csrf
        return instance.request(retryConfig)
      }).catch(error => {
        delete localStorage.csrf
        delete localStorage.signedIn
        // redirect to signin if refresh fails
        location.replace('/')
        return Promise.reject(error)
      })
  } else {
    return Promise.reject(error)
  }
})

export { securedInstance, instance }
