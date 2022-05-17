import services from '@/services/api.js'
import { ElMessage } from 'element-plus'
export function useRestoreArticle() {
  
  const restoreArticleByAdmin = async (article_id) => {
    const res = services.restoreArticleById({
      article_id: article_id
    })
    await res.then(res => {
      ElMessage.success(res.message)
    })
  }

  return {
    restoreArticleByAdmin
  }
}