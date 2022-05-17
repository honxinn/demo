import {
  ref
} from 'vue'
import services from '@/services/api'
import {
  ElMessage
} from 'element-plus'

export function useGetOnlineUser() {
  const onlineUser = ref(null)

  const getOnlineUser = () => {
    const res = services.getOnlineUser()
    res.then(res => {
      onlineUser.value = res.result.res.count
    }).catch(err => {
      ElMessage.error(err.message)
    })
  }

  return {
    onlineUser,
    getOnlineUser
  }
}