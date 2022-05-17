import {
  ref,
  reactive
} from 'vue'
import services from '@/services/api.js'
import {
  ElMessage
} from 'element-plus'

export function useGetArticleList() {
  const current = ref(1)
  const size = ref(10)
  const articleTime = ref([])
  const articleList = reactive([])
  const articleTotal = ref(0)
  const articlePages = ref(0)
  const loading = ref(false)
  const getArticleList = async (partition_id, status) => {
    loading.value = true
    const res = services.getArticleList({
      current: current.value,
      size: size.value,
      status: status.value,
      partition_id: partition_id.value,
      start_time: articleTime.value[0],
      end_time: articleTime.value[1]
    })
    await res.then(res => {
      articleList.length = 0
      articleList.push(...res.result.article_list)
      articleTotal.value = res.result.article_total
      articlePages.value = res.result.article_pages
    }).catch(err => {
      ElMessage.error(err.message)
    })
    loading.value = false
  }

  return {
    current,
    size,
    articleTime,
    articleList,
    articleTotal,
    articlePages,
    loading,
    getArticleList
  }
}