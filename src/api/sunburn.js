import request from '@/utils/request'

//晒单列表
export function getPlanShow(userinfos){
    return request.lottery({
        url:'/lottery/getPlanShow',
        method:'get',
        params:userinfos
    })
}
//修改晒单状态
export function updatePlanShowStatus(userinfos){
    return request.lottery({
        url:'/lottery/updatePlanShowStatus',
        method:'get',
        params:userinfos
    })
}
//通过、驳回晒单
export function passShowPlanApply(userinfos){
    return request.lottery({
        url:'/lottery/passShowPlanApply',
        method:'get',
        params:userinfos
    })
}
//新星榜
export function getNewStar(dan){
    return request.lottery({
        url:'/lottery/getNewStar',
        method:'get',
        params:{
            dan
        }
    })
}
//添加新星榜
export function addNewStar(accounts){
    return request.lottery({
        url:'/lottery/addNewStar',
        method:'get',
        params:{
            accounts
        }
    })
}
//中奖宣传列表
export function getWinPromotion(userinfos){
    return request.lottery({
        url:'/lottery/getWinPromotion',
        method:'get',
        params:userinfos
    })
}
//发起中奖宣传
export function addWinPromotion(userinfos){
    return request.lottery({
        url:'/lottery/addWinPromotion',
        method:'get',
        params:userinfos
    })
}
//修改中奖宣传状态
export function updateWinPromotionStatus(userinfos){
    return request.lottery({
        url:'/lottery/updateWinPromotionStatus',
        method:'get',
        params:userinfos
    })
}
//添加名人
export function addCelebrity(userinfos){
    return request.member({
        url:'user/addCelebrity',
        method:'get',
        params:userinfos
    })
}
//获取名人列表
export function getSuperMan(userinfos){
    return request.member({
        url:'/user/getSuperMan',
        method:'get',
        params:userinfos
    })
}
//添加站内信
export function addMail(userinfos){
    return request.infos({
        url:'/information/addMail',
        method:'get',
        params:userinfos
    })
}

//修改SP抓取源
export function reviseSpSourse(userinfos){
    return request.infos({
        url:'/information/reviseSpSourse',
        method:'get',
        params:userinfos
    })
}

//获取当前竞彩足球SP抓取来源
export function getSpSourse(userinfos){
    return request.infos({
        url:'/information/getSpSourse',
        method:'get',
        params:userinfos
    })
}