import services from '@/services/api.js'
import {
  ElMessage
} from 'element-plus'
export function useAlterArticle() {
  const alterArticleByAdmin = async (content, summary, title, article_id, partition_id, cover_url) => {
    const res = services.alterArticleById({
      content,
      summary,
      title,
      article_id,
      partition_id,
      cover_url
    })
    await res.then(res => {
      ElMessage.success(res.message)
    }).catch(err => {
      ElMessage.error(err.message)
    })
  }

  return {
    alterArticleByAdmin
  }
}