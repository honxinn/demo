import { ref, reactive, computed } from 'vue'
import {
  ElMessage
} from 'element-plus'
import qs from 'qs'
import services from '@/services/api.js'


export function useSelectTableItem() {
  const selectList = reactive({
    value: []
  })
  const select_status = ref(false)
  const status = ref(false)

  const handleSelectItem = (selection, row) => {
    selectList.value = []
    selectList.value.push(...delArrayFilter(selection))
  }
  
  const handleSelectAllItem = (selection) => {
    selectList.value = []
    selectList.value.push(...delArrayFilter(selection))
    status.value = true
  }

  const delSelectItem = () => {
    select_status.value && status.value ? delCleanArticleList() : delArticleList()
  }

  const delArticleList = () => {
    const res = services.delArticleList({ids: selectList.value})
    res.then(res => {
      ElMessage.success(res.message)
    }).catch(err => {
      ElMessage.error(err.message)
    })
  }

  const delCleanArticleList = () => {
    const res = services.delCleanArticleList({ids: selectList.value})
    res.then(res => {
      ElMessage.success(res.message)
    }).catch(err => {
      ElMessage.error(err.message)
    })
  }

  const delArrayFilter = (selectList) => {
    return selectList.map(item => {
      return item.id
    })
  }
  
  return {
    select_status,
    selectList,
    handleSelectItem,
    handleSelectAllItem,
    delSelectItem
  }

}