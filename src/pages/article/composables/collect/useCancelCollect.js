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

export function useCancelCollect() {

  const cancelCollect = async (article_id) => {
    const res = services.cancelCollectArticle({article_id})
    await res.then(res => {
      ElMessage.success(res.message)
    }).catch(err => {
      ElMessage.error(err.message)
    })
  }

  return {
    cancelCollect
  }
}