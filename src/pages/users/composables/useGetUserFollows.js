import { reactive, ref} from 'vue'
import services from '@/services/api.js'
import { ElMessage } from 'element-plus'

export function useGetUserFollows() {
  const dialogVisible = ref(false)
  const user_follows = reactive([])

  const getUserFollow = (user_id) => {
    const res = services.getUserFollows({
      user_id: user_id
    })
    res.then(res => {
      user_follows.length = 0
      user_follows.push(...res.res)
      dialogVisible.value = true
    }).catch(err => {
      ElMessage.error(err.message)
    })
  }

  return {
    dialogVisible,
    user_follows,
    getUserFollow
  }
}