'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const QYAPI = {
  member: "'https://member.api.qiyun88.cn'",
  user: "'https://user.api.qiyun88.cn'",
  infos: "'https://infos.api.qiyun88.cn'",
  pay: "'https://pay.api.qiyun88.cn'",
  ticket: "'https://ticket.api.qiyun88.cn'",
  lottery: "'https://lottery.api.qiyun88.cn'"
  // lottery: "'https://lottery.api.588yd.cn'",
}

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: QYAPI,
})
