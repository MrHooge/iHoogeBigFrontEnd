import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

const BASE_API = process.env.BASE_API
console.log('BASE_API', process.env.NODE_ENV)
// 创建axios实例
const service = {
  member: axios.create({
    baseURL: BASE_API.member, // api的base_url
    timeout: 120000 // 请求超时时间
  }),
  infos: axios.create({
    baseURL: BASE_API.infos, // api的base_url
    timeout: 5000 // 请求超时时间
  }),
  pay: axios.create({
    baseURL: BASE_API.pay, // api的base_url
    timeout: 5000 // 请求超时时间
  }),
  ticket: axios.create({
    baseURL: BASE_API.ticket, // api的base_url
    timeout: 5000 // 请求超时时间
  }),
  lottery: axios.create({
    baseURL: BASE_API.lottery, // api的base_url
    timeout: 5000 // 请求超时时间
  }),
  user: axios.create({
    baseURL: BASE_API.user, // api的base_url
    timeout: 5000 // 请求超时时间
  })
}

// request拦截器
axios.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
axios.interceptors.response.use(
  response => {
  /**
  * code为非20000是抛错 可结合自己业务进行修改
  */
    const res = response.data
    console.log(response)
    if (res.success) {
      return response.data
    } else {
      Message({
        message: res.message,
        type: 'error',
        duration: 3 * 1000
      })
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
