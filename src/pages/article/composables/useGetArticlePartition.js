import {
  ref,
  reactive,
  computed
} from 'vue'
import services from '@/services/api.js'
import {
  useArticlePartitionMap
} from './useArticlePartitionMap.js'

export function useGetArticlePartition() {
  const articlePartition = reactive([])
  const articleTag = reactive([])
  const {
    getArticlePartitionFilter
  } = useArticlePartitionMap(articlePartition)
  const partitionVal = ref([])
  const getArticlePartition = async () => {
    const res = services.getArticlePartitionByAdmin()
    await res.then(res => {
      articlePartition.length = 0
      articlePartition.push(...res.result)
    })
  }

  const articleTagFilter = computed(() => {
    return articlePartition.map(item => {
      return {
        id: item.id,
        name: item.partition_name,
        desc: item.partition_desc,
        img: item.icon,
        type: ''
      }
    })
  })

  return {
    articleTag: articleTagFilter,
    articlePartition: getArticlePartitionFilter,
    partitionVal,
    getArticlePartition
  }
}