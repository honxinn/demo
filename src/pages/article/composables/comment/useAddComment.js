import {
  ref
} from 'vue'
import services from '@/services/api.js'
import { ElMessage } from 'element-plus'


export function useAddComment() {
  const comment_content = ref('')
  const addComment = async (article_id) => {
    const res = services.releaseComment({comment_content: comment_content.value, article_id: article_id})
    await res.then(res => {
      ElMessage.success(res.message)
    }).catch(err => {
      ElMessage.error(err.message)
    })
    comment_content.value = ''
  }

  return {
    comment_content,
    addComment
  }
}