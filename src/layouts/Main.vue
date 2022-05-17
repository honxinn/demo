<template>
  <div class="layout-main">
    <Siderbar />

    <div id="layout-content" :class="{ 'layout-content-area-full': sidebarCollapse }">
      <Navbar class="nav-bar" />
      <div class="content-area">
        <transition
          enter-active-class="animate__animated animate__FadeIn"
          leave-active-class="animate__animated animate__FadeOut"
          mode="out-in"
        >
          <el-breadcrumb :separator-icon="ArrowRight">
            <template v-for="(item, index) in $route.meta.breadcrumb" :key="index">
              <el-breadcrumb-item :to="{ path: item.url }">{{ item.title }}</el-breadcrumb-item>
            </template>
          </el-breadcrumb>
        </transition>

        <transition
          enter-active-class="animate__animated animate__backInLeft"
          leave-active-class="animate__animated animate__backOutLeft"
          mode="out-in"
        >
          <router-view></router-view>
        </transition>
      </div>

      <Footerbar />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Navbar from './components/Navbar.vue'
import Footerbar from './components/Footerbar.vue'
import Siderbar from './components/Siderbar.vue'
import { useStore } from '@/store/index.js'
import { ArrowRight } from '@element-plus/icons-vue'
const store = useStore()

const sidebarCollapse = computed(() => {
  return store.sidebarCollapse
})

</script>


<style lang="scss" scoped>
.layout-main {
  position: relative;
  height: 100%;
  min-width: 800px;
}
#layout-content {
  margin-left: 240px;
  background: #f5f5f5;
  transition: margin-left 0.5s;
  min-height: 100%;
  min-width: 1200px;
  &.layout-content-area-full {
    margin-left: 65px;
  }
}
.nav-bar {
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 0 20px rgb(0, 0, 0, 0.1);
}
.content-area {
  min-height: 100vh;
  padding: 1.5em;
}
.slide-enter {
  opacity: 0;
}
.slide-enter-active {
  transition: opacity 0.5s;
}
.slide-leave {
  opacity: 1;
}
.slide-leave-active {
  opacity: 0;
  transition: opacity 0.5s;
}
</style>