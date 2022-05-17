import {
  defineStore
} from "pinia"


export const useStore = defineStore({
  id: 'useStore',
  state() {
    return {
      sidebarCollapse: false,
      userInfo: null,
      loading: false,
    }
  },
  getters: {
    getSidebarCollapse() {
      return this.sidebarCollapse
    },
    getUserInfo() {
      return this.userInfo
    },
    getLoading() {
      return this.loading
    }
  },
  actions: {
    setSidebarCollapse(sidebarCollapse) {
      this.sidebarCollapse = sidebarCollapse
    },
    setUserInfo(userInfo) {
      this.userInfo = userInfo
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    },
    setLoading(loading) {
      this.loading = loading
    }
  }
})