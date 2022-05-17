import {
  ElMessage
} from 'element-plus'
import services from '@/services/api.js'
export function useAuditArticle () {

  const auditArticleByAdmin = async (article_id, pass) => {
    const res = services.auditArticleByAdmin({article_id, pass})
    await res.then(res => {
      ElMessage.success(res.message)
    }).catch(err => {
      ElMessage.error(err.message)
    })
  }

  return {
    auditArticleByAdmin
  }
}