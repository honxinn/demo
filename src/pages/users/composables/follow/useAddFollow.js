import {
  reactive
} from 'vue'
import services from '@/services/api.js'
import { ElMessage } from 'element-plus'

export function useAddFollow () {

  const addFollow = async (user_id) => {
    const res = services.addFollow({follow_id: user_id})
    await res.then(res => {
      ElMessage.success(res.message)
    }).catch(err => {
      ElMessage.error(err.message)
    })
  }

  return {
    addFollow
  }
}