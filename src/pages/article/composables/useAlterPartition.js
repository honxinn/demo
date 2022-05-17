import { ref } from 'vue'
import services from '@/services/api.js'
import { ElMessage } from 'element-plus'

export function useAlterPartition() {

  const uploadPartition = async (id, partition_name, partition_desc, icon) => {
    const res = services.uploadPartition({
      id,
      partition_name,
      partition_desc,
      icon
    })
    await res.then(res => {
      ElMessage.success(res.message)
    }).catch(err => {
      ElMessage.error(res.message)
    })
  }
  return {
    uploadPartition
  }
}