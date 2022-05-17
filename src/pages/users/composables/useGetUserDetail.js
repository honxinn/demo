import {
  reactive
} from 'vue'
import services from '@/services/api.js'
import {
  ElMessage
} from 'element-plus'
export function useGetUserDetail() {
  const user_detail = reactive({
    value: {
      city: "",
      id: null,
      img: "",
      is_active: null,
      is_admin: null,
      name: "",
      sex: "",
      user_name: "",
    },
    follows: [],
    befollowed: [],
    befollowed_cnt: 0,
    follows: [],
    follows_cnt: 0
  })
  const getUserDetail = async (user_id) => {

    const res = services.getUserDetailByAdmin({
      id: user_id
    })
    await res.then(res => {
      user_detail.value = res.result.user
      user_detail.follows = res.result.follows
      user_detail.befollowed = res.result.befollowed
      user_detail.follows_cnt = res.result.follows_cnt
      user_detail.befollowed_cnt = res.result.befollowed_cnt
    }).catch(err => {
      ElMessage.error(err.message)
    })
  }

  return {
    user_detail,
    getUserDetail
  }
}