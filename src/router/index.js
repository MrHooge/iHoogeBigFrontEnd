import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'


/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [{
    path: '/login',
    component: () =>
      import ('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () =>
      import ('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () =>
        import ('@/views/dashboard/index')
    }]
  },

  {
    path: '/sysManage',
    component: Layout,
    redirect: '/sysManage/mamber',
    name: '系统管理',
    meta: {
      title: '系统管理'
    },
    children: [{
        path: 'mamber',
        name: '用户管理',
        component: () =>
          import ('@/views/sys_management/user'),
        meta: {
          title: '用户管理'
        }
      },
      {
        path: 'property',
        name: '权限管理',
        component: () =>
          import ('@/views/sys_management/property'),
        meta: {
          title: '权限管理'
        }
      },
      {
        path: 'roles',
        name: '角色管理',
        component: () =>
          import ('@/views/sys_management/roles'),
        meta: {
          title: '角色管理'
        }
      },
      {
        path: 'bookTicket',
        name: '打票管理',
        component: () =>
          import ('@/views/sys_management/bookTicket'),
        meta: {
          title: '打票管理'
        }
      },
      {
        path: 'modules',
        name: '模块管理',
        component: () =>
          import ('@/views/sys_management/modules'),
        meta: {
          title: '模块管理'
        }
      },
      {
        path: 'Binding_channels',
        name: '绑定渠道',
        component: () =>
          import ('@/views/sys_management/Binding_channels'),
        meta: {
          title: '绑定渠道'
        }
      },

    ]
  },

  // 新闻公告
  {
    path: '/newsBulletin',
    component: Layout,
    redirect: '/newsBulletin/addNews',
    name: '新闻公告',
    meta: {
      title: '新闻公告'
    },
    children: [{
        path: 'addNews',
        name: '发布新闻',
        component: () =>
          import ('@/views/newsBulletin/add_news'),
        meta: {
          title: '发布新闻'
        }
      },
      {
        path: 'newsManage',
        name: '新闻管理',
        component: () =>
          import ('@/views/newsBulletin/news_manage'),
        meta: {
          title: '新闻管理'
        }
      },
      {
        path: 'websiteLettery',
        name: '站内信',
        component: () =>
          import ('@/views/newsBulletin/website_lettery'),
        meta: {
          title: '站内信'
        }
      },
      {
        path: 'commentModeration',
        name: '评论审核',
        component: () =>
          import ('@/views/newsBulletin/commentModeration'),
        meta: {
          title: '评论审核'
        }
      },
      {
        path: 'winningComments',
        name: '中奖评论审核',
        component: () =>
          import ('@/views/newsBulletin/winningComments'),
        meta: {
          title: '中奖评论审核'
        }
      }
      
    ]
  },
  // 轮播墙
  {
    path: '/swiperWall',
    component: Layout,
    redirect: '/swiperWall/openAccountWall',
    name: '轮播墙',
    meta: {
      title: '轮播墙'
    },
    children: [{
        path: 'openAccountWall',
        name: '开户轮播墙',
        component: () =>
          import ('@/views/swiperWall/openAccount_Wall'),
        meta: {
          title: '开户轮播墙'
        }
      },
      {
        path: 'activateWall',
        name: '激活轮播墙',
        component: () =>
          import ('@/views/swiperWall/activate_Wall'),
        meta: {
          title: '激活轮播墙'
        }
      },
      {
        path: 'rechangeWall',
        name: '充值与消费墙',
        component: () =>
          import ('@/views/swiperWall/rechange_Wall'),
        meta: {
          title: '充值与消费墙'
        }
      },
    ]
  },
  // 平台代理
  {
    path: '/platfor_manager',
    component: Layout,
    redirect: '/platfor_manager/rebatesList',
    name: '平台代理',
    meta: {
      title: '平台代理'
    },
    children: [{ //  会员返点列表
        path: 'rebatesList',
        name: '会员返点列表',
        component: () =>
          import ('@/views/platfor_manager/rebatesList'),
        meta: {
          title: '会员返点列表'
        }
      },
      { //  设置会员返点
        path: 'setRebates',
        name: '设置会员返点',
        component: () =>
          import ('@/views/platfor_manager/setRebates'),
        meta: {
          title: '设置会员返点'
        }
      },
      { //  代理分组
        path: 'agencyAllocation',
        name: '代理分组',
        component: () =>
          import ('@/views/platfor_manager/agencyAllocation'),
        meta: {
          title: '代理分组'
        }
      },
      {
        path: 'demotion',
        name: '渠道或代理降级为会员',
        component: () =>
          import ('@/views/platfor_manager/demotion'),
        meta: {
          title: '渠道或代理降级为会员'
        }
      },
      {
        path: 'SetUpAgent',
        name: '设置渠道或代理',
        component: () =>
          import ('@/views/platfor_manager/SetUpAgent'),
        meta: {
          title: '设置渠道或代理'
        }
      }, 
      {
        path: 'lookUp',
        name: '渠道绑定代理',
        component: () =>
          import ('@/views/platfor_manager/lookUp'),
        meta: {
          title: '渠道绑定代理'
        }
      },
      {
        path: 'agency_upgrade',
        name: '代理升级为渠道',
        component: () =>
          import ('@/views/platfor_manager/agency_upgrade'),
        meta: {
          title: '代理升级为渠道'
        }
      },
      {
        path: 'customer_transfer',
        name: '客户转移',
        component: () =>
          import ('@/views/platfor_manager/customer_transfer'),
        meta: {
          title: '客户转移'
        }
      },

    ]
  },
  // 代理授信
  {
    path: '/creadit',
    component: Layout,
    redirect: '/creadit/backend',
    name: '平台代理',
    meta: {
      title: '平台代理'
    },
    children: [{ //  授信表
        path: 'backend',
        name: '授信表',
        component: () =>
          import ('@/views/creadit/backend'),
        meta: {
          title: '授信表'
        }
      },
      { //  授信操作记录
        path: 'operationSurface',
        name: '授信记录表',
        component: () =>
          import ('@/views/creadit/operationSurface'),
        meta: {
          title: '授信记录表'
        }
      },
      { //  代理给客户加款流水
        path: 'subcustomer',
        name: '代理给客户加款流水',
        component: () =>
          import ('@/views/creadit/subcustomer'),
        meta: {
          title: '代理给客户加款流水'
        }
      },
      { //  代理向平台还款流水及确认
        path: 'creaditop',
        name: '代理还款流水及确认',
        component: () =>
          import ('@/views/creadit/creaditop'),
        meta: {
          title: '代理还款流水及确认'
        }
      },

    ]
  },
  // 支付模块
  {
    path: '/recharge_center',
    component: Layout,
    redirect: '/recharge_center/rechange_open_session',
    name: '支付中心',
    meta: {
      title: '支付中心'
    },
    children: [{
        path: 'rechange_open_session',
        name: '支付设置',
        component: () =>
          import ('@/views/recharge_center/rechange_open_session'),
        meta: {
          title: '支付设置'
        }
      },
      {
        path: 'rechangeDetail',
        name: '线下充值明细',
        component: () =>
          import ('@/views/recharge_center/rechangeDetail'),
        meta: {
          title: '线下充值明细'
        }
      },
      {
        path: 'online_SerialNumber',
        name: '线上充值流水',
        component: () =>
          import ('@/views/recharge_center/online_SerialNumber'),
        meta: {
          title: '线上充值流水'
        }
      },
      {
        path: 'all_rechange_surface',
        name: '会员充值流水查询-总表',
        component: () =>
          import ('@/views/recharge_center/all_rechange_surface'),
        meta: {
          title: '会员充值流水查询-总表'
        }
      },
      {
        path: 'replenishment_order',
        name: '线上充值补单',
        component: () =>
          import ('@/views/recharge_center/replenishment_order'),
        meta: {
          title: '线上充值补单'
        }
      },
      {
        path: 'fundReversal',
        name: '资金扣款',
        component: () =>
          import ('@/views/recharge_center/fundReversal'),
        meta: {
          title: '资金扣款'
        }
      },
      {
        path: 'repaylist',
        name: '支付列表',
        component: () =>
          import ('@/views/recharge_center/repaylist'),
        meta: {
          title: '支付列表'
        }
      },
      {
        path: 'addrepay',
        name: '添加线下支付',
        component: () =>
          import ('@/views/recharge_center/addrepay'),
        meta: {
          title: '添加线下支付'
        }
      },
      {
        path: 'repayset',
        name: '支付配置',
        component: () =>
          import ('@/views/recharge_center/repayset'),
        meta: {
          title: '支付配置'
        }
      },
      {
        path: 'greaplist',
        name: '修改支付渠道',
        component: () =>
          import ('@/views/recharge_center/greaplist'),
        meta: {
          title: '修改支付渠道'
        }
      },
      {
        path: 'auditList',
        name: '线下支付审核',
        component: () =>
          import ('@/views/recharge_center/auditList'),
        meta: {
          title: '线下支付审核'
        }
      },

    ]
  },

  //活动管理
  {
    path: '/activityManager',
    component: Layout,
    redirect: '/activityManager/activitySetting',
    name: '活动管理',
    meta: {
      title: '活动管理'
    },
    children: [{
        path: 'activitySetting',
        name: '彩金卡配置',
        component: () =>
          import ('@/views/activity_manager/activity_setting'),
        meta: {
          title: '彩金卡配置'
        }
      },
      {
        path: 'giftcardSearch',
        name: '彩金卡查询',
        component: () =>
          import ('@/views/activity_manager/giftcard_search'),
        meta: {
          title: '彩金卡查询'
        }
      },
      {
        path: 'activityGiftcard',
        name: '人工送彩金卡',
        component: () =>
          import ('@/views/activity_manager/activity_giftcard'),
        meta: {
          title: '人工送彩金卡'
        }
      },
      {
        path: 'seiper_banner',
        name: '轮播图管理',
        component: () =>
          import ('@/views/activity_manager/seiper_banner'),
        meta: {
          title: '轮播图管理'
        }
      },

    ]
  },



   //冠亚军投注
   {
    path: '/chanpiom',
    component: Layout,
    redirect: '/chanpiom/saishi',
    name: '冠亚军投注',
    meta: {
      title: '冠亚军投注'
    },
    children: [{
        path: 'saishi',
        name: '冠军赛事列表',
        component: () =>
          import ('@/views/chanpiom/saishi'),
        meta: {
          title: '冠军赛事列表'
        }
      },
      {
        path: 'guanyajun',
        name: '冠亚军赛事列表',
        component: () =>
          import ('@/views/chanpiom/guanyajun'),
        meta: {
          title: '冠亚军赛事列表'
        }
      },
    ]
  },

  // 市场管理
  {
    path: '/agentManager',
    component: Layout,
    redirect: '/agentManager/agentManager',
    name: '市场管理',
    meta: {
      title: '市场管理'
    },
    children: [{
        path: 'agentManager',
        name: '代理查询',
        component: () =>
          import ('@/views/agent_manager/agent_manager'),
        meta: {
          title: '代理查询'
        }
      },
      {
        path: 'examine',
        name: '代理审核',
        component: () =>
          import ('@/views/agent_manager/examine'),
        meta: {
          title: '代理审核'
        }
      },
      {
        path: 'salesManage',
        name: '销售管理',
        component: () =>
          import ('@/views/agent_manager/sales_manage'),
        meta: {
          title: '销售管理'
        }
      },
      {
        path: 'salesDetail',
        name: '业绩明细',
        component: () =>
          import ('@/views/agent_manager/sales_detail'),
        meta: {
          title: '业绩明细'
        }
      },
      {
        path: 'salesSummary',
        name: '业绩汇总',
        component: () =>
          import ('@/views/agent_manager/sales_summary'),
        meta: {
          title: '业绩汇总'
        }
      },
      {
        path: 'lotteryRecord', // 代理名下客户的购彩记录
        name: '购彩记录',
        component: () =>
          import ('@/views/agent_manager/lottery_record'),
        meta: {
          title: '购彩记录'
        }
      },
      {
        path: 'capitalFlow',
        name: '资金流水',
        component: () =>
          import ('@/views/agent_manager/capital_flow'),
        meta: {
          title: '资金流水'
        }
      },

    ]
  },

  //客户管理中心
  {
    path: '/customerManager',
    component: Layout,
    redirect: '/agentManager/modifyPassword',
    name: '客户管理中心',
    meta: {
      title: '客户管理中心'
    },
    children: [{
        path: 'modifyPassword',
        name: '修改密码',
        component: () =>
          import ('@/views/customer_manager/modify_password'),
        meta: {
          title: '修改密码'
        }
      },
      {
        path:'customerStatistics',
        name:'会员统计',
        component: () => import('@/views/customer_manager/customer_statistics'),
        meta: {title: '会员统计'}
      },
      {
        path:'customerManager',
        name:'会员管理',
        component: () => import('@/views/customer_manager/customer_manager'),
        meta: {title: '会员管理'}
      },
      {
        path:'operatingRecording',
        name:'绑定及转移记录',
        component: () => import('@/views/customer_manager/operating_recording'),
        meta: {title: '绑定及转移记录'}
      },
      {
        path:'customerAssociation',
        name:'客户关联申请',
        component: () => import('@/views/customer_manager/customer_association'),
        meta: {title: '客户关联申请'}
      },
      {
        path:'messageSearch',
        name:'查询短信',
        component: () => import('@/views/customer_manager/message_search'),
        meta: {title: '查询短信'}
      },
      {
        path:'customerTransfer',
        name:'客户转移申请',
        component: () => import('@/views/customer_manager/customer_transfer'),
        meta: {title: '客户转移申请'}
      }

    ]
  },
  //财务管理
  {
    path: '/financialManagement',
    component: Layout,
    redirect: '/financialManagement/Rechange',
    name: '财务管理',
    meta: {
      title: '财务管理'
    },
    children: [
      {
        path: 'Rechange',
        name: '充值加款',
        component: () =>
          import ('@/views/financialManagement/Rechange'),
        meta: {
          title: '充值加款'
        }
      },
      {
        path: 'capitaldetails',
        name: '财务资金明细',
        component: () =>
          import ('@/views/financialManagement/capitaldetails'),
        meta: {
          title: '财务资金明细'
        }
      },
      {
        path: 'cashdetails',
        name: '财务现金明细',
        component: () =>
          import ('@/views/financialManagement/cashdetails'),
        meta: {
          title: '财务现金明细'
        }
      },
      {
        path: 'handsel_give',
        name: '彩金赠送',
        component: () =>
          import ('@/views/financialManagement/handsel_give'),
        meta: {
          title: '彩金赠送'
        }
      },
      {
        path: 'withdrawal_request_list',
        name: '提款申请',
        component: () =>
          import ('@/views/financialManagement/withdrawal_request_list'),
        meta: {
          title: '提款申请'
        }
      },

    ]
  },

  //方案中心
  {
    path: '/programCenter',
    component: Layout,
    redirect: '/programCenter/periodmanager',
    name: '方案中心',
    meta: { title: '方案中心' },
    children: [
      {
        path: 'periodmanager',
        name: '彩期管理',
        component: () => import ('@/views/program_center/periodmanager'),
        meta: { title: '彩期管理' }
      },
      {
        path: 'Manuallottery',
        name: '手动开奖',
        component: () => import ('@/views/program_center/Manuallottery'),
        meta: { title: '手动开奖' }
      },
      {
        path: 'period',
        name: '彩期显示',
        component: () => import ('@/views/program_center/period'),
        meta: { title: '彩期显示' }
      },
      {
        path: 'Detail',
        name: '方案查询明细',
        component: () => import ('@/views/program_center/Detail'),
        meta: { title: '方案查询明细' }
      },
      {
        path: 'Declaraciondefacturacon',
        name: '修改发单宣言',
        component: () => import ('@/views/program_center/Declaraciondefacturacon'),
        meta: { title: '修改发单宣言' }
      },
      {
        path: 'lotteryprize',
        name: '开奖派奖',
        component: () => import ('@/views/program_center/lotteryprize'),
        meta: { title: '开奖派奖' }
      },
      {
        path: 'winningprogram',
        name: '查询中奖方案',
        component: () => import ('@/views/program_center/winningprogram'),
        meta: { title: '查询中奖方案' }
      },
      {
        path: 'sparklingbasketball',
        name: '竞彩篮球',
        component: () => import ('@/views/program_center/sparklingbasketball'),
        meta: { title: '竞彩篮球' }
      },
      {
        path: 'smg',
        name: '竞彩足球',
        component: () => import ('@/views/program_center/smg'),
        meta: { title: '竞彩足球' }
      },
      {
        path: 'programquery',
        name: '方案查询',
        component: () => import ('@/views/program_center/programquery'),
        meta: { title: '方案查询' }
      },
      {
        path: 'slaeandstop',
        name: '彩种开停售',
        component: () => import ('@/views/program_center/slaeandstop'),
        meta: { title: '彩种开停售' }
      },
    ]
  },

  //流水查询
  {
    path: '/detailsSearch',
    component: Layout,
    redirect: '/detailsSearch/fluwQuery',
    name: '流水查询',
    meta: { title: '流水查询' },
    children:[
      {
        path: 'fluwQuery',
        name: '操作流水查询',
        component: () => import('@/views/details_search/fluw_query'),
        meta: { title: '操作流水查询' }
      },
      {
        path: 'giftcardSearch',
        name: '彩金卡流水查询',
        component: () => import('@/views/details_search/giftcard_search'),
        meta: { title: '彩金卡流水查询' }
      },
      {
        path: 'redpackageSearch',
        name: '客户红包流水查询',
        component: () => import('@/views/details_search/redpackage_search'),
        meta: { title: '客户红包流水查询' }
      },
      {
        path: 'integralSearch',
        name: '积分查询',
        component: () => import('@/views/details_search/integral_search'),
        meta: { title: '积分查询' }
      },
      {
        path: 'lotterySearch',
        name: '彩金查询',
        component: () => import('@/views/details_search/lottery_search'),
        meta: { title: '彩金查询' }
      },
      {
        path: 'awardsgiving',
        name: '嘉奖派发、使用查询',
        component: () => import('@/views/details_search/awardsgiving'),
        meta: { title: '嘉奖派发、使用查询' }
      },
      {
        path: 'rebateCommission',
        name: '返点佣金查询',
        component: () => import('@/views/details_search/rebate_commission'),
        meta: { title: '返点佣金查询' }
      },
      {
        path: 'billingCommission',
        name: '发单佣金查询',
        component: () => import('@/views/details_search/billing_commission'),
        meta: { title: '发单佣金查询' }
      },
      {
        path: 'walletFlowquery',
        name: '钱包流水查询',
        component: () => import('@/views/details_search/wallet_flowquery'),
        meta: { title: '钱包流水查询' }
      },
    ]
  },
  //票务中心
  {
    path: '/ticketingCenter',
    component: Layout,
    redirect: '/ticketingCenter/searchticketing',
    name: '票务中心',
    meta: { title: '票务中心' },
    children: [
      {
        path: 'searchticketing',
        name: '票务查询',
        component: () =>
          import ('@/views/ticketing_center/searchticketing'),
        meta: { title: '票务查询' }
      },
    //   {
    //     path: 'ticketlist',
    //     name: '票务查询列表',
    //     component: () =>
    //       import ('@/views/ticketing_center/ticketlist'),
    //     meta: { title: '票务查询列表' }
    //   },
      
    ]
  },
  //麒云大师模块
  {
    path: '/qiyunGrandmaster',
    component: Layout,
    redirect: '/qiyunGrandmaster/customerRecharge',
    name: '麒云大师',
    meta: { title: '麒云大师' },
    children: [
      {
        path: 'customerRecharge',
        name: '客户充值提款流水',
        component: () =>
          import ('@/views/qiyun_grandmaster/customerRecharge'),
        meta: { title: '客户充值提款流水' }
      },
      {
        path: 'shoppingrecommend',
        name: '客户推荐购买退款流水',
        component: () =>
          import ('@/views/qiyun_grandmaster/shoppingrecommend'),
        meta: { title: '客户推荐购买退款流水' }
      },
      {
        path: 'rewardflut',
        name: '打赏流水',
        component: () =>
          import ('@/views/qiyun_grandmaster/rewardflut'),
        meta: { title: '打赏流水' }
      },
      {
        path: 'Recommendedincome',
        name: '推荐收入',
        component: () =>
          import ('@/views/qiyun_grandmaster/Recommendedincome'),
        meta: { title: '推荐收入' }
      },
      {
        path: 'wholecustomerflut',
        name: '总流水',
        component: () =>
          import ('@/views/qiyun_grandmaster/wholecustomerflut'),
        meta: { title: '总流水' }
      },
      {
        path: 'famousman',
        name: '名人和大神',
        component: () =>
          import ('@/views/qiyun_grandmaster/famousman'),
        meta: { title: '名人和大神' }
      },
      {
        path: 'tobesetted',
        name: '待审核列表',
        component: () =>
          import ('@/views/qiyun_grandmaster/tobesetted'),
        meta: { title: '待审核列表' }
      },
      {
        path: 'withdraw',
        name: '提现列表',
        component: () =>
          import ('@/views/qiyun_grandmaster/withdraw'),
        meta: { title: '提现列表' }
      },
    ]
  },
  //麒云88模块
  {
    path: '/qiyun88',
    component: Layout,
    redirect: '/qiyun88/Sundryinglist',
    name: '麒云88模块',
    meta: { title: '麒云88模块' },
    children: [
      {
        path: 'Sundryinglist',
        name: '晒单列表',
        component: () =>
          import ('@/views/qiyun88/Sundryinglist'),
        meta: { title: '晒单列表' }
      },
      {
        path: 'Newstarlist',
        name: '新星榜',
        component: () =>
          import ('@/views/qiyun88/Newstarlist'),
        meta: { title: '新星榜' }
      },
      {
        path: 'Winninglist',
        name: '中奖列表',
        component: () =>
          import ('@/views/qiyun88/Winninglist'),
        meta: { title: '中奖列表' }
      },
      {
        path: 'Addcelebrity',
        name: '发单名人添加',
        component: () =>
          import ('@/views/qiyun88/Addcelebrity'),
        meta: { title: '发单名人添加' }
      },
    //   {
    //     path: 'Stationletter',
    //     name: '站内信',
    //     component: () =>
    //       import ('@/views/qiyun88/Stationletter'),
    //     meta: { title: '站内信' }
    //   }
    ]
  },

  //焦点赛事模块
  {
    path: '/foucsEvent',
    component: Layout,
    redirect: '/foucsEvent/awardsConfiguration',
    name: '焦点赛事',
    meta: { title: '焦点赛事' },
    children: [
      {
        path: 'awardsConfiguration',
        name: '嘉奖配置列表',
        component: () => import('@/views/foucs_event/awards_configuration'),
        meta: { title: '嘉奖配置列表' }
      },
      {
        path: 'basketballEvent',
        name: '篮球赛事列表',
        component: () => import('@/views/foucs_event/basketball_event'),
        meta: { title: '篮球赛事列表' }
      },
      {
        path: 'basketballFoucs',
        name: '焦点篮球赛事列表',
        component: () => import('@/views/foucs_event/basketball_foucs'),
        meta: { title: '焦点篮球赛事列表' }
      },
      {
        path: 'footballEvent',
        name: '足球赛事列表',
        component: () => import('@/views/foucs_event/football_event'),
        meta: { title: '足球赛事列表' }
      },
      {
        path: 'footballFoucs',
        name: '焦点足球赛事列表',
        component: () => import('@/views/foucs_event/football_foucs'),
        meta: { title: '焦点足球赛事列表' }
      },
      {
        path: 'effectiveAgent',
        name: '有效代理列表',
        component: () => import('@/views/foucs_event/effective_agent'),
        meta: { title: '有效代理列表' }
      },
      {
        path: 'awardsBlacklist',
        name: '嘉奖黑名单列表',
        component: () => import('@/views/foucs_event/awards_blacklist'),
        meta: { title: '嘉奖黑名单列表' }
      },
      {
        path: 'Combination_restricted',
        name: '组合限售',
        component: () => import('@/views/foucs_event/Combination_restricted'),
        meta: { title: '组合限售' }
      },
    ]
  },
  //运营管理
  {
    path: '/operations',
    component: Layout,
    redirect: '/operations/seekingtick',
    name: '运营管理',
    meta: { title: '运营管理' },
    children: [
      {
        path: 'seekingtick',
        name: '寻票列表',
        component: () => import('@/views/operations/seekingtick'),
        meta: { title: '寻票列表' }
      },
      
      {
        path: 'lotteryDaily',
        name: '竞彩日报',
        component: () =>
          import ('@/views/operations/lottery_daily'),
        meta: {
          title: '竞彩日报'
        }
      },
      {
        path: 'ytick',
        name: '运营寻票操作',
        component: () => import('@/views/operations/ytick'),
        meta: { title: '运营寻票操作' }
      },
      {
        path: 'yrecord',
        name: '运营传票记录',
        component: () => import('@/views/operations/yrecord'),
        meta: { title: '运营传票记录' }
      },
      {
        path: 'ticket_checking',
        name: '出票校验',
        component: () => import('@/views/operations/ticket_checking'),
        meta: { title: '出票校验' }
      },
      {
        path: 'Directout',
        name: '设置会员直接出票',
        component: () => import('@/views/operations/Directout'),
        meta: { title: '设置会员直接出票' }
      },
      {
        path: 'Robot',
        name: '机器人列表',
        component: () => import('@/views/operations/Robot'),
        meta: { title: '机器人列表' }
      },
      {
        path: 'cyseting',
        name: '彩研设置',
        component: () => import('@/views/operations/cyseting'),
        meta: { title: '彩研设置' }
      },
      {
        path: 'FollowUpPlan',
        name: '自动跟单',
        component: () => import('@/views/operations/FollowUpPlan'),
        meta: { title: '自动跟单' }
      },
      
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
