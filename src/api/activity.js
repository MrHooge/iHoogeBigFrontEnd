import request from '@/utils/request'

export function getActivityData(){
    return request.member({
        url:'/userManage/findAllActivity',
        method:'get',
    })
}
//添加活动
export function addActivity(userInfos){
    return request.member({
        url:'/userManage/addActivity',
        method:'get',
        params:userInfos
    })
}
//保存彩金卡
export function addGoldCard(params,loginAccount){
    return request.member({
        url:'http://192.168.7.40:8081/userManage/addGoldCard',
        method:'get',
        params:{
            params,
            loginAccount
        }
    })
}
//红包记录
export function grabRedRacketList2(params){
    return request.pay({
        url:'/redPacket/grabRedRacketList2',
        method:'get',
        params:params
    })
}
export function putRedRacketList2(params){
    return request.pay({
        url:'/redPacket/putRedRacketList2',
        method:'get',
        params:params
    })
}
//发布平台红包
export function addRedRacketForPlatform(params){
    return request.pay({
        url:'/redPacket/addRedRacketForPlatform',
        method:'get',
        params:params
    })
}
//查询彩金卡
export function findGoldCard(params){
    return request.member({
        url:'/userManage/findGoldCard',
        method:'get',
        params:params
    })
}