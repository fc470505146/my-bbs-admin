import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import { AppMain } from '@/layout/components'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'el-icon-s-home' }
      }
    ]
  },
  {
    path: '/bbs',
    name: 'BBS',
    redirect: '/bbs/catalog',
    component: Layout,
    meta: { title: '板面目录', icon: 'el-icon-document' },
    children: [
      {
        hidden: true,
        path: 'catalog',
        name: 'BoardCatalog',
        component: () => import('@/views/bbs/BoardCatalog')
      },
      {
        hidden: true,
        path: ':id',
        name: 'BoardView',
        meta: { title: '板块' },
        component: () => import('@/views/bbs/boardView/BoardView')
      },
      {
        hidden: true,
        path: 'post/:id',
        name: 'PostView',
        meta: { title: '帖子' },
        component: () => import('@/views/bbs/postView/PostView')
      },
      {
        hidden: true,
        path: 'user/:id',
        name: 'UserView',
        meta: { title: '用户' },
        component: () => import('@/views/bbs/userView/UserView')
      },
      {
        hidden: true,
        path: 'new/:id',
        name: 'UserNew',
        meta: { title: '消息' },
        component: () => import('@/views/bbs/newView/NewView')
      }
    ]
  }
]

// 异步路由
export const asyncRoutes = [
  // 比较差的处理 todo
  {
    path: '/user',
    name: 'UserInfo',
    component: Layout,
    meta: { title: '个人中心', icon: 'el-icon-s-custom' }
  },
  {
    path: '/admin',
    component: Layout,
    meta: {
      title: '管理界面',
      icon: 'nested',
      breadcrumb: false,
      roles: ['admin']
    },
    children: [
      {
        path: 'user',
        name: 'UserAdmin',
        component: AppMain,
        meta: {
          title: '用户管理',
          icon: 'user',
          roles: ['admin'],
          breadcrumb: false
        },
        children: [
          {
            path: 'userlist',
            name: 'UserAdminList',
            component: () => import('@/views/admin/UserAdmin'),
            meta: {
              title: '用户列表',
              icon: 'user',
              roles: ['admin']
            }
          },
          {
            path: 'addList',
            name: 'UserAddList',
            component: () => import('@/views/admin/user/UserAddList'),
            meta: {
              title: '用户批量体添加',
              icon: 'nested'
            }
          }
        ]
      },
      {
        path: 'board',
        name: 'BoardAdmin',
        component: () => import('@/views/admin/BoardAdmin'),
        meta: { title: '板块管理', icon: 'user' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
