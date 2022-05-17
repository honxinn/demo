# CampusSNS校园社区

- 本项目是百度训练营晋级班第一题《CampusSNS校园社区》的前端

- 本项目基于Vue3+Vite构建

## 功能要求
> 构建一个简单的校园社区功能
- 具备支持多人文字内容生产及浏览功能，该功能仅支持移动端访问样式，PC端使用时也使用移动端样式，支持用户的注册及登录
- 具备一个PC端的管理系统，提供给管理员一个对于贴子修改删除屏蔽恢复等基本管理功能
- 参考可选功能
    - 支持分板块
    - 支持搜索
    - 支持回帖、评论、点赞等
    - 支持发图片、视频

###  主要任务
> 移动端框架使用VantUI，PC端框架使用ElementUI

- 论坛主页面
- 板块页面
- 详细帖子页面
- 登录注册页面
- 后端搭建
- 管理员页面

## 搭建过程记录

### 一. 项目搭建

#### 1.  创建项目
```bash
npm create vite@latest
```
#### 2.  运行项目
```bash
cd campusSNS
npm install
npm run dev
```
### 二. 项目配置

#### 1. 导入配置别名
- 在`vite.config.js`文件内增加导入文件别名配置项
- @ 为`src`文件夹
```javascript
import { resolve } from "path"
function pathResolve(dir) {
  return resolve(__dirname, ".", dir);
}
// ...
export default defineConfig({
  resolve: {
    alias: {
      "@": pathResolve('src')
    }
  },
  // ...
})
```
```bash
import xxx from '@/components/xxx.vue'
```

#### 2. 配置局域网访问
- 在`package.json`文件内，`script`中的`dev`命令新增局域网访问命令
```bash
"scripts": {
    "dev": "vite --host 0.0.0.0",
    # ...
  },
```

###  三. 添加路由

#### 1. 安装Vue-Router@4
```bash
npm install vue-router@4
```
#### 2. 路由配置
```javascript
import { createRouter, createWebHistory } from 'vue-router'
 
const routerHistory = createWebHistory()
 
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      component: () => import('@/pages/Home.vue')
    },
  ]
})
export default router
 
```

#### 3.路由导入
```javascript
import router from './router/index'

createApp(App).use(router).mount('#app')
```
帖子详细内容 90%
评论列表 
用户列表 90%
用户详细信息页 90%
用户封禁 100%
全站搜索
消息通知


获取文章总数接口
首页用户总数、文章总数、仅七天增长量
用户管理