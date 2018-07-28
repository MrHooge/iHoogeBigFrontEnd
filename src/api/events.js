import request from '@/utils/request'

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