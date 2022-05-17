import {
  reactive, ref
} from 'vue'
import services from '@/services/api.js'
import { ElMessage } from 'element-plus'

export function useGetUserFans () {
  const fansList = reactive([])
  const fansVisibal = ref(false)

  const getUserAllFans = async (user_id) => {
    const res = services.getUserAllFans({follow_id: user_id})
    await res.then(res => {
      fansList.length = 0
      fansList.push(...res.res)
    }).catch(err => {
      ElMessage.error(err.message)
    })
  }

  return {
    fansVisibal,
    fansList, 
    getUserAllFans
  }
}
