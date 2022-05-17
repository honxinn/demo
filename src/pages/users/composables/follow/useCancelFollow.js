import {
  reactive
} from 'vue'
import services from '@/services/api.js'
import { ElMessage } from 'element-plus'

export function useCancelFollow () {

  const cancelFollow = async (user_id) => {
    const res = services.cancelFollow({follow_id: user_id})
    await res.then(res => {
      ElMessage.success(res.message)
    }).catch(err => {
      ElMessage.error(err.message)
    })
  }

  return {
    cancelFollow
  }
}