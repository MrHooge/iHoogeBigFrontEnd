'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const QYAPI = {
  member: "'https://member.api.qiyun88.cn'",
  // member: "'http://192.168.42.40:8081'",
  user: "'https://user.api.qiyun88.cn'",
  infos: "'https://infos.api.qiyun88.cn'",
  pay: "'https://pay.api.qiyun88.cn'",
  // pay: "'http://192.168.42.40:8087'",
  ticket: "'https://ticket.api.qiyun88.cn'",
  lottery: "'https://lottery.api.qiyun88.cn'"
  // lottery: "'http://47.97.192.124:10090'"
}

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: QYAPI,
})
