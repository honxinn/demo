import { useRouter, useRoute } from 'vue-router'
export function useCurdArticle() {
  const route = useRoute()
  const router = useRouter()
  const curdArticleOperation = async (article_id, fn, fn2, fn3, partition_id, status) => {
    await fn(article_id);
    if(route.path === '/article-list') {
      fn3(partition_id, status)
      fn2()
    }
  }

  const handleAlterArticle = (article_id) => {
    router.push({
      name: 'Article',
      query: {
        article_id
      }
    })
  }

  return {
    curdArticleOperation,
    handleAlterArticle
  }
}