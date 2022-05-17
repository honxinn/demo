<template>
  <div class="nav-menu">
    <div
      id="logo"
      :class="{ 'logo-collapse': sidebarCollapse }"
      @click="store.setSidebarCollapse(!sidebarCollapse)"
    >
      <img class="logo-img" src="../../assets/images/logo.png" alt />
      <transition
        enter-active-class="animate__animated animate__backInLeft animate__faster"
        leave-active-class="animate__animated animate__backOutLeft animate__faster"
        mode="out-in"
      >
        <img
          class="logo-text"
          v-show="!sidebarCollapse"
          src="../../assets/images/logo-text.png"
          alt
        />
      </transition>
    </div>

    <el-menu
      :default-active="$route.path"
      router
      class="siderbar"
      :default-openeds="['1', '2', '3']"
      :collapse="sidebarCollapse"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon>
            <house />
          </el-icon>
          <span>数据分析</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/home">首页</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <el-icon>
            <tickets />
          </el-icon>
          <span>文章管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/article-list">文章列表</el-menu-item>
          <el-menu-item index="/article-partition">文章分类</el-menu-item>
          <el-menu-item index="/article-add">发布文章</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <!-- <el-sub-menu index="3">
        <template #title>
          <el-icon>
            <chat-dot-square />
          </el-icon>
          <span>评论管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/comment-list">评论列表</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu> -->
      <el-sub-menu index="4">
        <template #title>
          <el-icon>
            <user />
          </el-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/user-list">用户列表</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from '@/store/index.js'
import _ from 'lodash';
import {
  User,
  Tickets,
  House,
  ChatDotSquare
} from '@element-plus/icons-vue'

const store = useStore()

// 返回当前侧边栏是否折叠
const sidebarCollapse = computed(() => {
  return store.sidebarCollapse
})

// 页面宽度改变时，改变侧边栏及logo的样式
const sidebarCheck = () => {
  document.body.clientWidth <= 1300 ? store.setSidebarCollapse(true) : store.setSidebarCollapse(false)
}

// 初始化侧边栏折叠状态
sidebarCheck()

// 监听页面宽度改变，防抖
onMounted(() => {
  window.onresize = _.debounce(sidebarCheck, 400)
})

</script>

<style scoped lang="scss">
.nav-menu {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  height: 100%;
  background: #f2f2f2;
  user-select: none;
}
.el-menu.siderbar {
  max-width: $sidebar-width;
  height: 100%;
  overflow-y: auto;
  &:not(.el-menu--collapse) {
    width: $sidebar-width;
  }
}

.el-menu--collapse {
  width: 64px;
}

.el-menu {
  background: #fff;
  border-right: 0px;
  border-top: 1px solid #f2f2f2;
}
.el-menu-item {
  margin: 0px 20px 20px 20px;
  border-radius: 5px;
  height: 40px !important;
  line-height: 40px !important;
}
.el-menu-item.is-active {
  box-shadow: 0 0 10px rgba(41, 82, 232, 1);
  background: linear-gradient(
    to right,
    rgba(41, 82, 232, 1),
    rgba(41, 82, 232, 0.6)
  );
  color: white;
}
#logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: $sidebar-width;
  background: #ffffff;
  height: 64px;
  transition: all 0.5s;
  &.logo-collapse {
    width: 64px;
  }
}
.logo-collapse .logo-img {
  width: 100%;
  height: 100%;
}
// #logo img {
//   width: 55%;
//   height: 55%;
// }
#logo .logo-img {
  width: 3rem;
  height: 3rem;
}
.logo-text {
  width: 8rem;
  height: 5rem;
}
</style>