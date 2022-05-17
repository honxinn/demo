import {
  ref
} from 'vue'
import {
  useRouter
} from 'vue-router'
import {
  ElMessage
} from 'element-plus'
import services from '@/services/api.js'

export function useAddArticle() {
  const router = useRouter()
  const title = ref('')
  const content = ref('# 说点什么吧')
  const partition_id = ref(1)
  const cover_url = ref('')
  const summary = ref('')


  const releaseArticleByAdmin = async () => {
    const res = services.releaseArticleByAdmin({
      title: title.value,
      content: content.value,
      partition_id: partition_id.value,
      cover_url: cover_url.value,
      summary: summary.value
    })

    await res.then(res => {
      ElMessage.success(res.message)
    }).catch(err => {
      ElMessage.error(err.message)
    })
  }

  const recoveryArticle = () => {
    title.value = ''
    content.value = ''
    partition_id.value = ''
    cover_url.value = ''
    summary.value = ''
  }

  return {
    title,
    content,
    partition_id,
    cover_url,
    summary,
    recoveryArticle,
    releaseArticleByAdmin
  }
}