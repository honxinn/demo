import {
  ref
} from 'vue'
import {
  useRouter
} from 'vue-router'
import {
  ElMessage
} from 'element-plus'
import services from '@/services/api.js'

export function useAddLike() {

  const addLike = async (type, target_id) => {
    const res = services.addLikes({type, target_id})
    await res.then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }

  return {
    addLike
  }
}