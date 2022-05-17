import { ref } from 'vue'
import services from '@/services/api.js'

export function useArticleListSearch() {
  const searchArticleTitle = ref('')

  const searchSubmit = async (status, current, size, articleList, articleTotal) => {
    const res = services.searchArticleList({
      wd: searchArticleTitle.value,
      current: current.value,
      size: size.value,
      status: status.value
    })
    await res.then(res => {
      articleList.value = res.result.res.rows
      articleTotal.value = res.result.res.count
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }
  return {
    searchArticleTitle,
    searchSubmit
  }
}