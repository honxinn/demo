import {
  ref, reactive
} from 'vue'
import services from '@/services/api.js'
import { ElMessage } from 'element-plus'

export function useGetArticleComment() {
  const pageNo = ref(1)
  const pageSize = ref(10)
  const commentList = reactive([])
  const getArticleComment = async (article_id) => {
    const res = services.getArticleCommentByAdmin({
      id: article_id,
      pageNo: pageNo.value,
      pageSize: pageSize.value
    })
    await res.then((res) => {
      commentList.length = 0
      commentList.push(...res.result)
    }).catch((err) => {
      ElMessage.error(err.message)
    });
  }

  const getArticleCommentCount = async (article_id) => {
    const res = services.getArticleCommentCountByAdmin({
      id: article_id
    })
    await res.then((res) => {
      console.log(res)
    }).catch((err) => {
      ElMessage.error(err.message)
    })
  }

  return {
    pageNo,
    pageSize,
    commentList,
    getArticleComment,
    getArticleCommentCount
  }
}