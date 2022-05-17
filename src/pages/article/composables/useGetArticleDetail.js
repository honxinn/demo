import {
  ref,
  reactive
} from 'vue'
import {
  useRouter
} from 'vue-router'
import moment from 'moment'
import services from '@/services/api.js'

export function useGetArticleDetail() {
  const loading = ref(false)
  const article_detail = reactive({
    value: {
      collections: 0,
      content: "",
      cover_url: "",
      createdAt: "",
      deletedAt: "",
      id: null,
      likes: 0,
      partition_id: 0,
      status: 0,
      summary: "",
      title: "",
      updatedAt: "",
      user_id: 0,
      visits: 0
    }
  })
  const router = useRouter()
  const getArticleDetail = async (article_id) => {
    loading.value = true
    const res = services.getArticleDetail({
      article_id: article_id
    })
    await res.then(res => {
      article_detail.value = res.result
      article_detail.value.createdAt = moment(article_detail.value.createdAt).format('YYYY-MM-DD HH:mm:ss')
      article_detail.value.deletedAt = moment(article_detail.value.deletedAt).format('YYYY-MM-DD HH:mm:ss')
      article_detail.value.updatedAt = moment(article_detail.value.updatedAt).format('YYYY-MM-DD HH:mm:ss')

      loading.value = false
    }).catch(err => {
      loading.value = false
      router.go(-1)
    })
  }


  return {
    loading,
    article_detail,
    getArticleDetail
  }
}