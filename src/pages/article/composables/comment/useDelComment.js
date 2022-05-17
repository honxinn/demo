import {
  ref
} from 'vue'
import services from '@/services/api.js'
import { ElMessage } from 'element-plus'

export function useDelComment() {

  const delComment = async (comment_id) => {
    const res = services.delArticleCommentByAdmin({id: comment_id})
    await res.then(res => {
      ElMessage.success(res.message)
    }).catch(err => {
      ElMessage.error(err.message)
    })
  }

  return {
    delComment
  }
}