import { reactive} from 'vue'
import {
  ElMessage
} from 'element-plus'
import services from '@/services/api.js'

export function useGetTotalData() {

  const user_rank = reactive([])
  const article_rank = reactive([])
  
  const getArticleRank = async () => {
    const res = services.getArticleRank()
    await res.then(res => {
      article_rank.length = 0
      article_rank.push(...res.result.article_list)
    }).catch(err => {
      ElMessage.error(err.message)
    })
  }

  const getUserRank = async () => {
    const res = services.getUserRank()
    await res.then(res => {
      user_rank.length = 0
      user_rank.push(...res.ranks.slice(0, 10))
    }).catch(err => {
      ElMessage.error(err.message)
    })
  }

  return {
    user_rank,
    article_rank,
    getArticleRank,
    getUserRank
  }
}