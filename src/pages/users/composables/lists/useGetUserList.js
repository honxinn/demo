import {
  ref
} from 'vue'
import services from '@/services/api.js'
import { ElMessage } from 'element-plus'

export function useGetUserList() {
  const page = ref(1)
  const size = ref(10)
  const user_list = ref([])

  const getUserList = (is_active) => {
    const res = services.getUserList({
      page: page.value,
      size: size.value,
      is_active: is_active.value
    })

    res.then(res => {
      user_list.value = res.users
    }).catch(err => {
      ElMessage.error(err.message)
    })
  }
  return {
    page,
    size,
    user_list,
    getUserList
  }
}