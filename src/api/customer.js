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
//会员资料修改
export function updateMemberInfoBack(userinfos){
    return request.member({
        url:'/user/updateMemberInfoBack',
        method:'get',
        params: userinfos
    })
}
//会员加白
export function memberToWrite(account,type){
    return request.member({
        url:'/userManage/memberToWrite',
        method:'get',
        params:{
            account,
            type
        }
    })
}
//会员管理
//绑定记录和转移记录
export function memberMoveLogs(page,pageSize){
    return request.member({
        url:'/user/memberMoveLogs',
        method:'get',
        params:{
           page,
           pageSize
        }
    })
}
//短信查询
export function getSmsCode(mobile){
    return request.member({
        url:'/user/getSmsCode',
        method:'get',
        params: mobile
    })
}

//客户关联查询
export function findMemberAssociation(userinfos){
    return request.member({
        url:'/user/findMemberAssociation',
        method:'get',
        params:userinfos
    })
}
//客户关联通过
export function MemberAudit(userinfos){
    return request.member({
        url:'/user/MemberAudit',
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
//客户转移通过
export function MemberMoveAudit(userinfos){
    return request.member({
        url:'/user/MemberMoveAudit',
        method:'get',
        params:userinfos
    })
}

//通过id查询钱包
export function getMemberWalletByMemberId(memberId){
    return request.member({
        url:'/user/getMemberWalletByMemberId',
        method:'get',
        params:{
            memberId
        }
    })
}
//通过账号查询银行信息
export function getMemberInfoBack(account){
    return request.member({
        url:'/user/getMemberInfoBack',
        method:'get',
        params:{
            account
        }
    })
}
//获取钱包信息
export function getMemberWallet(token){
    return request.member({
        url:'/user/getMemberWallet',
        method:'get',
        params:{
            token
        }
    })
}
//绑定银行卡信息
export function bind(userinfos){
    return request.member({
        url:'/user/bind',
        method:'get',
        params:userinfos
    })
}
//显示一个月以上未登录用户
export function getHistoryClient(offset,pageSize){
    return request.member({
        url:'/userManage/getHistoryClient',
        method:'get',
        params:{
            offset,
            pageSize
        }
    })
}
//查询审核头像
export function findAllMemberPictureReview(params) {
    return request.member({
        url: '/user/findAllMemberPictureReview',
        method:'get',
        params: params
    })
}
//头像审核操作
export function updateMemberPictureReview(params) {
    return request.member({
        url: '/user/updateMemberPictureReview',
        method:'get',
        params: params
    })
}