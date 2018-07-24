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
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/sysManage',
    component: Layout,
    redirect: '/sysManage/mamber',
    name: '系统管理',
    meta: { title: '系统管理' },
    children: [
      {
        path: 'mamber',
        name: '用户管理',
        component: () => import('@/views/sys_management/user'),
        meta: { title: '用户管理' }
      },
      {
        path: 'property',
        name: '权限管理',
        component: () => import('@/views/sys_management/property'),
        meta: { title: '权限管理' }
      },
      {
        path: 'roles',
        name: '角色管理',
        component: () => import('@/views/sys_management/roles'),
        meta: { title: '角色管理' }
      },
      {
        path: 'modules',
        name: '模块管理',
        component: () => import('@/views/sys_management/modules'),
        meta: { title: '模块管理' }
      }
    ]
  },

  // 新闻公告
  {
    path: '/newsBulletin',
    component: Layout,
    redirect: '/newsBulletin/addNews',
    name: '新闻公告',
    meta: { title: '新闻公告' },
    children: [
      {
        path: 'addNews',
        name: '发布新闻',
        component: () => import('@/views/newsBulletin/add_news'),
        meta: { title: '发布新闻' }
      },
      {
        path: 'newsManage',
        name: '新闻管理',
        component: () => import('@/views/newsBulletin/news_manage'),
        meta: { title: '新闻管理' }
      },
      {
        path: 'lotteryDaily',
        name: '竞彩日报',
        component: () => import('@/views/newsBulletin/lottery_daily'),
        meta: { title: '竞彩日报' }
      },
      {
        path: 'websiteLettery',
        name: '站内信',
        component: () => import('@/views/newsBulletin/website_lettery'),
        meta: { title: '站内信' }
      }
    ]
  },


  //活动管理
  {
    path: '/activityManager',
    component: Layout,
    redirect: '/activityManager/activitySetting',
    name: '活动管理',
    meta: { title: '活动管理' },
    children: [
      {
        path: 'activitySetting',
        name: '活动配置',
        component: () => import('@/views/activity_manager/activity_setting'),
        meta: { title: '活动配置' }
      },
      {
        path: 'activityGiftcard',
        name: '充值送礼金卡',
        component: () => import('@/views/activity_manager/activity_giftcard'),
        meta: { title: '充值送礼金卡' }
      }
     
    ]
  },


  // 代理管理
  {
    path: '/agentManager',
    component: Layout,
    redirect: '/agentManager/agentManager',
    name: '代理管理',
    meta: { title: '代理管理' },
    children: [
      {
        path: 'agentManager',
        name: '代理查询',
        component: () => import('@/views/agent_manager/agent_manager'),
        meta: { title: '代理查询' }
      },
      {
        path: 'examine',
        name: '代理审核',
        component: () => import('@/views/agent_manager/examine'),
        meta: { title: '代理审核' }
      },
      {
        path: 'salesManage',
        name: '销售管理',
        component: () => import('@/views/agent_manager/sales_manage'),
        meta: { title: '销售管理' }
      },
      {
        path: 'salesDetail',
        name: '业绩明细',
        component: () => import('@/views/agent_manager/sales_detail'),
        meta: { title: '业绩明细' }
      },
      {
        path: 'salesSummary',
        name: '业绩汇总',
        component: () => import('@/views/agent_manager/sales_summary'),
        meta: { title: '业绩汇总' }
      },
      {
        path: 'lotteryRecord', // 代理名下客户的购彩记录
        name: '购彩记录',
        component: () => import('@/views/agent_manager/lottery_record'),
        meta: { title: '购彩记录' }
      },
      {
        path: 'capitalFlow',
        name: '资金流水',
        component: () => import('@/views/agent_manager/capital_flow'),
        meta: { title: '资金流水' }
      }
    ]
  },

  //客户管理中心
  {
    path: '/customerManager',
    component: Layout,
    redirect: '/agentManager/modifyPassword',
    name: '客户管理中心',
    meta: { title: '客户管理中心' },
    children: [
      {
        path: 'modifyPassword',
        name: '修改密码',
        component: () => import('@/views/customer_manager/modify_password'),
        meta: { title: '修改密码' }
      },
      {
        path:'customerStatistics',
        name:'会员统计',
        component: () => import('@/views/customer_manager/customer_statistics'),
        meta: {title: '会员统计'}
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


  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

