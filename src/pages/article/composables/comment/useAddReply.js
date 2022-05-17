import {
  ref
} from 'vue'
import services from '@/services/api.js'
import { ElMessage } from 'element-plus'


export function useAddReply() {
  const comment_reply_content = ref('')
  const addReply = async (comment_id, to_user_id, comment_reply_id) => {
    const res = services.replyComment({comment_id: comment_id, comment_reply_id: comment_reply_id, to_user_id: to_user_id, comment_reply_content: comment_reply_content.value})
    await res.then(res => {
      console.log(res)
    }).catch(err => {
      ElMessage.error(err.message)
    })
    comment_reply_content.value = ''
  }

  return {
    comment_reply_content,
    addReply
  }
}