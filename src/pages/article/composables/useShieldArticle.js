import services from '@/services/api.js'
import { ElMessage } from 'element-plus'
export function useShieldArticle() {
  
  const shieldArticleByAdmin = async (article_id) => {
    const res = services.shieldArticleById({
      article_id: article_id
    })
    await res.then(res => {
      ElMessage.success(res.message)
    })
  }

  return {
    shieldArticleByAdmin
  }
}