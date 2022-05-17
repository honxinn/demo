
import services from '@/services/api.js'
import { ElMessage } from 'element-plus'
export function useSetUserStatus () {
  const setUserStatus = async (user_name, status) => {
    const res = services.userBlockByAdmin({
      user_name: user_name,
      is_active: status
    })
    await res.then(res => {
      ElMessage.success(res.message)
    }).catch(err => {
      ElMessage.error(err.message)
    })
  }

  return {
    setUserStatus
  }
}