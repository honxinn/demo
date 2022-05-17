import {
  ref, reactive
} from 'vue'
import services from '@/services/api.js'

export function useGetArticleListTotal() {
  const total_status = ref('')
  const total_partition_id = ref(null)
  const timeList = ref([])
  const totalList = reactive([])

  const getArticleListTotal = async () => {
    const res = services.getArticleList({
      current: 1,
      size: 1000,
      status: total_status.value,
      start_time: timeList.value[0],
      end_time: timeList.value[1]
    })
    await res.then(res => {
      totalList.length = 0
      totalList.push(...res.result.article_list)
    }).catch(err => {
      ElMessage.error(err.message)
    })
  }
  // const getArticleListTotal = () => {
  //   const res = services.getArticleCountByAdmin({
  //     status: total_status.value,
  //     start_time: timeList.value[0],
  //     end_time: timeList.value[1],
  //   })
  //   res.then(res => {
  //     console.log(res)
  //   })
  // }

  return {
    total_status,
    total_partition_id,
    timeList,
    totalList,
    getArticleListTotal
  }
}