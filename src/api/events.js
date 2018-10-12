import request from '@/utils/request'
//配置订单数量提醒
export function updateRemindNum(userinfos){
    return request.lottery({
        url:'/lottery/updateRemindNum',
        method:'get',
        params:userinfos
    })
}
//获取嘉奖列表配置
export function getAddPirzeConfigList(userinfos){
    return request.lottery({
        url:'/lottery/getAddPirzeConfigList',
        method:'get',
        params:userinfos
    })
}
//设置嘉奖
export function setAddPrize(userinfos){
    return request.lottery({
        url:'/lottery/setAddPrize',
        method:'get',
        params:userinfos
    })
}
//修改嘉奖
export function updateAddPirzeConfig(userinfos){
    return request.lottery({
        url:'/lottery/updateAddPirzeConfig',
        method:'get',
        params:userinfos
    })
}
//获取当日最高嘉奖上限
export function getMaxAddPrize(){
    return request.lottery({
        url:'/lottery/getMaxAddPrize',
        method:'get'
    })
}
//修改当日最高嘉奖上限
export function updateMaxAddPrize(maxAddPrize){
    return request.lottery({
        url:'/lottery/updateMaxAddPrize',
        method:'get',
        params:{
            maxAddPrize
        }
    })
}
//篮球赛事列表
export function getBasketBallMatch(userinfos){
    return request.lottery({
        url:'/lottery/getBasketBallMatch',
        method:'get',
        params:userinfos
    })
}
//设置篮球为焦点赛事
export function setBbFocusMatch(ids){
    return request.lottery({
        url:'/lottery/setBbFocusMatch',
        method:'get',
        params:{
            ids
        }
    })
}
//开始投注
export function updateDGByStatus(userinfos){
    return request.lottery({
        url:'/lottery/updateDGByStatus',
        method:'get',
        params:userinfos
    })
}
//取消篮球焦点赛事
export function updateBbFocusMatchStatus(id){
    return request.lottery({
        url:'/lottery/updateBbFocusMatchStatus',
        method:'get',
        params:{
            id
        }
    })
}
//获取足球赛事列表
export function findFootballMixureInfo(userinfos){
    return request.lottery({
        url:'/lottery/findFootballMixureInfo',
        method:'get',
        params:userinfos
    })
}
//设置足球焦点赛事列表
export function setFbFocusMatch(ids){
    return request.lottery({
        url:'/lottery/setFbFocusMatch',
        method:'get',
        params:{
            ids
        }
    })
}
//取消足球焦点赛事
export function updateFbFocusMatchStatus(id){
    return request.lottery({
        url:'/lottery/updateFbFocusMatchStatus',
        method:'get',
        params:{
            id
        }
    })
}
//有效代理列表
export function getAgentList(userinfos){
    return request.member({
        url:'/user/getAgentList',
        method:'get',
        params:userinfos
    })
}
//设置嘉奖名单
export function setAddPrizeBlackOrWhite(userinfos){
    return request.lottery({
        url:'/lottery/setAddPrizeBlackOrWhite',
        method:'get',
        params:userinfos
    })
}
//获取嘉奖黑名单列表
export function getAddPrizeBlack(userinfos){
    return request.lottery({
        url:'/lottery/getAddPrizeBlack',
        method:'get',
        params:userinfos
    })
}
//修改赛事截止时间
export function updateMatchDealTime(userinfos){
    return request.lottery({
        url:'/lottery/updateMatchDealTime',
        method:'get',
        params:userinfos
    })
}