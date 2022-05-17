<template>
  <div class="login">
    <div class="login-box">
      <div class="login-left">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane label="登录" name="login">
            <el-input v-model="loginAdminUsername" size="large" placeholder="请输入账号" />
            <el-input v-model="loginAdminPassword" type="password" size="large" placeholder="请输入密码" />
            <el-button color="#626aef" style="color: white" size="large" @click="loginAdminSubmit">登录</el-button>
          </el-tab-pane>
          <!-- <el-tab-pane label="注册" name="reg">
            <el-input v-model="user_name" size="large" placeholder="请输入账号" />
            <el-input v-model="password" size="large" placeholder="请输入密码" />
            <el-input v-model="confirPassword" size="large" placeholder="请再次密码" />
            <el-button color="#626aef" style="color: white" size="large" @click="handleReg">注册</el-button>
          </el-tab-pane> -->
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import UseLoginAdmin from './useLoginAdmin'

const { loginAdminUsername, loginAdminPassword, loginAdminSubmit } = UseLoginAdmin()


const activeName = ref('login')

const handleClick = (tab, event) => {
  console.log(tab, event)
}
</script>

<style lang="scss" scoped>
.login {
  background: url("@/assets/images/background.jpeg") no-repeat;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.login {
  background: url("@/assets/images/background.png") no-repeat;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-box {
  background: url("@/assets/images/login_bg.png") no-repeat;
  min-width: 1000px;
  height: 562px;
  border-radius: 15px;
  padding: 0px 10px 0px 10px;
  display: flex;
}
.login-left {
  width: 50%;
}
:deep(.el-tabs__nav-wrap::after) {
  display: none;
}
:deep(.el-tabs__item) {
  margin: 5px 5px;
  font-size: 20px;
  padding: 0px;
}
:deep(.el-tabs__active-bar) {
  height: 3px;
}
:deep(.el-tab-pane) {
  width: 50%;
  margin: 5px auto;
}
.el-input {
  margin: 5px 0px;
}
.el-button {
  width: 100%;
}
.el-tabs {
  height: 80%;
}
:deep(.el-tabs__content) {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>