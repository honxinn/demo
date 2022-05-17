import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Layout from '@/layouts/Main.vue'
const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes: [{
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/login/Login.vue'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '',
      component: Layout,
      name: 'Layout',
      redirect: '/home',
      children: [{
        path: 'home',
        name: 'Home',
        component: () => import('@/pages/Home.vue'),
        meta: {
          title: '首页'
        }
      }]
    },
    {
      path: '',
      component: Layout,
      children: [{
          path: '/article-list',
          name: 'ArticleList',
          component: () => import('@/pages/article/ArticleList.vue'),
          meta: {
            title: '文章列表'
          },
        },
        {
          path: '/article-partition',
          name: 'ArticlePartition',
          component: () => import('@/pages/article/ArticlePartition.vue'),
          meta: {
            title: '文章分类',
            roles: ['admin']
          },
        },
        {
          path: '/article-add',
          name: 'Article',
          component: () => import('@/pages/article/Article.vue'),
          meta: {
            title: '发布文章',
            roles: ['admin']
          },
        },
      ],
      meta: {
        title: '文章管理',
        icon: 'icon-activity',
        roles: ['admin']
      },
    },
    {
      path: '',
      component: Layout,
      children: [{
        path: '/comment-list',
        name: 'CommentList',
        component: () => import('@/pages/comment/CommentList.vue'),
        meta: {
          title: '评论列表'
        }
      }]
    },
    {
      path: '',
      component: Layout,
      children: [{
        path: '/user-list',
        name: 'UserList',
        component: () => import('@/pages/users/UserList.vue'),
        meta: {
          title: '用户列表'
        }
      }]
    },
    {
      path: '',
      component: Layout,
      children: [{
        path: '/search',
        name: 'Search',
        component: () => import('@/pages/search/Search.vue'),
        meta: {
          title: '搜索'
        }
      }]
    },
    {
      'path': '',
      component: Layout,
      children: [{
        path: '/article-detail',
        name: 'ArticleDetail',
        component: () => import('@/pages/article/ArticleDetail.vue'),
        meta: {
          title: '文章详情',
          breadcrumb: [{
              title: '首页',
              url: '/'
            },
            {
              title: '文章列表',
              url: '/article-list'
            },
            {
              title: '文章详情',
              active: true
            }
          ]
        }
      }]
    },
    {
      'path': '',
      component: Layout,
      children: [{
        path: '/user-detail',
        name: 'UserDetail',
        component: () => import('@/pages/users/UserDetail.vue'),
        meta: {
          title: '用户信息',
          breadcrumb: [{
              title: '首页',
              url: '/'
            },
            {
              title: '用户列表',
              url: '/user-list'
            },
            {
              title: '用户信息',
              active: true
            }
          ]
        }
      }]
    }
  ]
})
export default router