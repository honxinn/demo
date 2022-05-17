<template>
  <router-view></router-view>
</template>
<script setup>
import { onMounted } from 'vue';
import { useStore } from './store';
const store = useStore()
const saveLocalStorage = () => {
  !store.userInfo && localStorage.getItem('userInfo') && store.setUserInfo(JSON.parse(localStorage.getItem('userInfo')))
}

onMounted(() => {
  saveLocalStorage()
})  
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0;
}
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
