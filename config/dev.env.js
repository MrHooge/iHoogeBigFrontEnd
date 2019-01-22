'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const QYAPI = {
    member: "'http://memberapi.qiyun88.cn'",
    user: "'http://userapi.qiyun88.cn'",
    infos: "'http://infosapi.qiyun88.cn'",
    pay: "'http://payapi.qiyun88.cn'",
    ticket: "'http://ticketapi.qiyun88.cn'",
    lottery: "'http://lotteryapi.qiyun88.cn'"
}

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    BASE_API: QYAPI,
})