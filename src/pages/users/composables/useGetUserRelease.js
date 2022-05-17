import {
  ref,
  reactive
} from 'vue'
import services from '@/services/api.js'
import {
  ElMessage
} from 'element-plus'

export function useGetUserRelease() {
  const user_id = ref(null)
  const page = ref(1)
  const type = ref('article')
  const page_num = ref(1)
  const total = ref(0)
  const resultList = reactive([])

  const load = () => {
    page.value += 1
    getUserReleases()
  }

  const getUserReleases = async () => {
    const res = services.getUserReleaseArticle({
      user_id: user_id.value,
      page: page.value,
      type: type.value
    })
    await res.then(res => {
      total.value = res.result.article_total | res.result.comment_total
      resultList.push(...(res.result.article_list || res.result.comment_list))
      page_num.value = res.result.page_nums
    }).catch(err => {
      ElMessage.error(err.message)
    })
  }

  return {
    user_id,
    page,
    type,
    total,
    page_num,
    resultList,
    load,
    getUserReleases
  }
}