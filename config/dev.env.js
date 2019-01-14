'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const QYAPI = {
  // member: "'https://member.api.qiyun88.cn'",
  // user: "'https://user.api.qiyun88.cn'",
  // infos: "'https://infos.api.qiyun88.cn'",
  // pay: "'https://pay.api.qiyun88.cn'",
  // ticket: "'https://ticket.api.qiyun88.cn'",
  // lottery: "'https://lottery.api.qiyun88.cn'"
  member: "'http://192.168.1.37:10010'",
    user: "'http://192.168.1.37:10010'",
    infos: "'http://192.168.1.37:10030'",
    pay: "'http://192.168.1.37:10050'",
    ticket: "'http://192.168.1.37:10070'",
    lottery: "'http://192.168.1.37:10090'"
}

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: QYAPI,
})
