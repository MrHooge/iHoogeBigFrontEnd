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
        url:'/userManage/addGoldCard',
        method:'get',
        params:{
            params,
            loginAccount
        }
    })
}
//查询所有的彩金卡
export function getAllGift(userInfos){
    return request.member({
        url:'/userManage/getAllGift',
        method:'get',
        params: userInfos
    })
}
//修改礼物及彩金卡
export function updateGift(userInfos){
    return request.member({
        url:'/userManage/updateGift',
        method:'post',
        data: userInfos
    })
}
//查询充值赠送活动配置
export function findAllRechargeCardAct(userInfos){
    return request.member({
        url:'/userManage/findAllRechargeCardAct',
        method:'get',
        params: userInfos
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