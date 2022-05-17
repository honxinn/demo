import {
  ref,
  reactive
} from 'vue'
import services from '@/services/api.js'
import {
  ElMessage
} from 'element-plus'

export function useGetTotalArticle () {
  const post_count = ref(0)
  const shield_count = ref(0)
  const delete_count = ref(0)
  const pending_count = ref(0)

  const getTotalArticle = async () => {
    const res = services.getTotalArticle()
    await res.then(res => {
      post_count.value = res.result.post_cnt
      shield_count.value = res.result.shield_cnt
      delete_count.value = res.result.deleted_cnt
      pending_count.value = res.result.pending_cnt
    }).catch(err => {
      ElMessage.error(err.message)
    })
  }

  return {
    post_count,
    shield_count,
    delete_count,
    pending_count,
    getTotalArticle
  }
}