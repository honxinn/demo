import {
   ref
} from 'vue'
import services from '@/services/api.js'
import { ElMessage } from 'element-plus'

export function useGetUserLikes () {
  const likeTotal = ref(0)

  const getLikesCount = async (user_id) => {
    const res = services.getLikesCount({user_id: user_id})
    await res.then(res => {
      // console.log(res)
      likeTotal.value = res.result.cnt
    }).catch(err => {
      ElMessage.error(err.message)
    })
  }

  return {
    likeTotal,
    getLikesCount
  }
}
