import request from '@/utils/request'

//修改密码
export function resetPassword(account,password){
    return request.member({
        url:'/user/resetPassword',
        method:'get',
        params:{
            account,
            password
        }
    })
}
//会员统计
export function findAllMember(userinfos){
    return request.member({
        url:'/user/findAllMember',
        method:'get',
        params:userinfos
    })
}
//会员管理
//短信查询
export function getSmsCode(mobile){
    return request.member({
        url:'/user/getSmsCode',
        method:'get',
        params:{
            mobile
        }
    })
}

//客户关联查询
export function findMemberAssociation(userinfos){
    return request.member({
        url:'/user/findMemberAssociationr',
        method:'get',
        params:userinfos
    })
}
//客户转移查询
export function findMemberMove(userinfos){
    return request.member({
        url:'/user/findMemberMove',
        method:'get',
        params:userinfos
    })
}