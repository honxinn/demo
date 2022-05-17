<template>
  <div class="header">
    <div class="header-left"></div>
    <div class="header-right">
      <el-tooltip :content="showSearchInput ? '关闭搜索' : '全站搜索'" placement="bottom" effect="light">
        <el-icon
          @click="goToSearch"
          :style="{ 'margin-right': showSearchInput ? '5px' : '10px' }"
        >
          <search v-if="!showSearchInput" />
          <circle-close v-else />
        </el-icon>
      </el-tooltip>
      <el-input
        :class="{'show-input': true }"
        v-model="input"
        @keyup.esc="showSearchInput = false"
        @keyup.enter="goToSearch"
        placeholder="搜索用户、文章"
      />
      <!-- <el-tooltip content="消息提示" placement="bottom" effect="light">
        <el-icon>
          <bell />
        </el-icon>
      </el-tooltip> -->

      <div class="header-user">
        <el-dropdown>
          <span class="el-dropdown-link">
            <img class="user-avator" :src="store.userInfo.user.img" alt />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="goToUser">个人中心</el-dropdown-item>
              <el-dropdown-item @click="quit">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <div class="header-user-name">
          <div class="admin-name">{{ store.userInfo.user.name }}</div>
          <div class="super_admin">@{{ store.userInfo.user.user_name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useStore } from '@/store/index';
import { useRouter, useRoute } from 'vue-router'
import { Bell, Search, CircleClose } from '@element-plus/icons-vue'
const route = useRoute()
const router = useRouter()
const store = useStore()
const input = ref('')
const showSearchInput = ref(false)

const goToSearch = () => {
  
  router.push({
    name: 'Search',
    query: {
      keyword: input.value
    }
  })
  input.value = ''
}

const quit = () => {
  localStorage.clear()
  router.push('/login')
}

const goToUser = () => {
  router.push({
    name: 'UserDetail',
    query: {
      user_id: store.userInfo.user.id
    }
  })
}

</script>

<style scoped lang="scss">
.header {
  user-select: none;
  background: white;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header-left {
  width: 30%;
}
.header-right {
  width: 70%;
}
.header-right {
  justify-content: flex-end;
  display: flex;
  align-items: center;
}
.header-user {
  display: flex;
  align-items: center;
  margin-right: 40px;
}
.user-avator {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 5px;
  cursor: pointer;
}
.header-user-name {
  text-align: left;
}
.admin-name {
  font-weight: bold;
}
.super_admin {
  color: #a5a4a4;
  font-size: 12px;
}
.el-icon {
  margin-right: 20px;
  font-size: 20px;
  cursor: pointer;
}
:deep(.el-input__inner) {
  border: none;
  border-radius: 0px;
}
.el-input {
  margin-right: 10px;
  transition: all 0.3s ease;
}
.search-input {
  width: 0px;
  padding: 0;
  border: 0px;
  :deep(.el-input__inner) {
    width: 0;
    padding: 0;
  }
}
.show-input {
  width: 200px;
  :deep(.el-input__inner) {
    border-bottom: 1px solid black;
  }
}
</style>