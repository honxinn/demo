import {ref} from 'vue'
import services from '@/services/api.js'
import { ElMessage } from 'element-plus'
import { useGetArticlePartition } from './useGetArticlePartition'
export function useAddArticlePartition() {
  const partitionName = ref('')
  const partitionDesc = ref('')
  const { getArticlePartition } = useGetArticlePartition()
  const addArticlePartition = async (cover_url) => {
    const res = services.createArticlePartitionByAdmin({
      partition_name: partitionName.value,
      partition_desc: partitionDesc.value,
      icon: cover_url.value 
    })
    await res.then(async res => {
      ElMessage.success(res.message)
      partitionName.value = ''
      partitionDesc.value = ''
      await getArticlePartition()
    })
  }

  return {
    partitionName,
    partitionDesc,
    addArticlePartition
  }
}