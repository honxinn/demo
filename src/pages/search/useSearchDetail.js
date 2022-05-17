import { ref, reactive, computed } from 'vue'
import { useStore} from '@/store/index'
import services from '@/services/api.js'
import { ElMessage } from 'element-plus'

export function useSearchDetail() {
  const store = useStore()
  const loading = ref(false)
  const searchList = reactive([])


  const searchSubmit = async (val, status, current, size, total) => {
    loading.value = true
    const res = services.searchArticleList({
      wd: val,
      current: current.value,
      size: size.value,
      status: status.value
    })
    await res.then(res => {
      searchList.length = 0
      console.log(searchList)
      searchList.push(...res.result.res.rows)
      total.value = res.result.res.count
      loading.value = false
      console.log(res)
    }).catch(err => {
      console.log(err)
      loading.value = false
    })
  }


  const searchDetail = (val) => {
    loading.value = true
    searchList.length = 0
    const res = services.searchUserByName({like_name: val})
    res.then(res => {
      loading.value = false
      searchList.push(...res.result.users)
    }).catch(err => {
      loading.value = false
      ElMessage.error(err.message)
    })
  }

  const searchListFilter = computed(() => {
    return searchList.filter(item => {
      return item.id != store.userInfo.user.id
    })
  })

  return {
    loading,
    searchList: searchListFilter,
    searchSubmit,
    searchDetail
  }
}