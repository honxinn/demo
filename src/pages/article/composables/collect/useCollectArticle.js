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

export function useCollectArticle() {

  const collectArticle = async (article_id) => {
    const res = services.collectArticle({article_id})
    await res.then(res => {
      ElMessage.success(res.message)
    }).catch(err => {
      ElMessage.error(err.message)
    })
  }

  return {
    collectArticle
  }
}