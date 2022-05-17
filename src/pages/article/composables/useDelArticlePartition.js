import {
  ref
} from 'vue'
import { ElMessage } from 'element-plus'
import services from '@/services/api.js'
export function useDelArticlePartition() {
  const article_id = ref(null)
  const delArticlePartition = async (partition_id) => {
    const res = services.delArticlePartitionByAdmin({
      id: partition_id
    })
    await res.then(res => {
      ElMessage.success(res.message);
    }).catch(err => {
      ElMessage.error(res.message);
    })
  }


  return {
    article_id,
    delArticlePartition
  }
}