import {
  reactive, ref
} from 'vue'
import services from '@/services/api.js'
import { ElMessage } from 'element-plus'

export function useGetSelfCollect () {
  const selfCollect = reactive([])
  const collectVisibal = ref(false)

  const getSelfCollect = async () => {
    const res = services.getSelfCollection()
    await res.then(res => {
      selfCollect.length = 0
      selfCollect.push(...res.result)
    }).catch(err => {
      ElMessage.error(err.message)
    })
  }

  return {
    collectVisibal,
    selfCollect, 
    getSelfCollect
  }
}
