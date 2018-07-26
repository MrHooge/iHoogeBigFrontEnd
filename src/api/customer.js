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
//会员加白
export function memberToWrite(account){
    return request.member({
        url:'/userManage/memberToWrite',
        method:'get',
        params:{
            account
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
        params:{
            mobile
        }
    })
}

//客户关联查询
export function findMemberAssociation(userinfos){
    return request.member({
        url:'http://192.168.42.40:8081/user/findMemberAssociation',
        method:'get',
        params:userinfos
    })
}
//客户关联通过
export function MemberAudit(userinfos){
    return request.member({
        url:'http://192.168.42.40:8081/user/MemberAudit',
        method:'get',
        params:userinfos
    })
}
//客户转移查询
export function findMemberMove(userinfos){
    return request.member({
        url:'http://192.168.42.40:8081/user/findMemberMove',
        method:'get',
        params:userinfos
    })
}
//客户转移通过
export function MemberMoveAudit(userinfos){
    return request.member({
        url:'http://192.168.42.40:8081/user/MemberMoveAudit',
        method:'get',
        params:userinfos
    })
}
//通过id查询钱包
export function getMemberWalletByMemberId(memberId){
    return request.member({
        url:'http://192.168.42.40:8081/user/getMemberWalletByMemberId',
        method:'get',
        params:{
            memberId
        }
    })
}
//获取钱包信息
export function getMemberWallet(token){
    return request.member({
        url:'http://192.168.42.40:8081/user/getMemberWallet',
        method:'get',
        params:{
            token
        }
    })
}
//绑定银行卡信息
export function bind(userinfos){
    return request.member({
        url:'http://192.168.42.40:8081/user/bind',
        method:'get',
        params:userinfos
    })
}