import services from '@/services/api.js'
import { ElMessage } from 'element-plus'
export function useDelArticle() {
  
  const delArticleByAdmin = async (article_id) => {
    const res = services.deleteArticleById({
      article_id: article_id
    })
    await res.then(res => {
      ElMessage.success(res.message)
    })
  }

  return {
    delArticleByAdmin
  }
}