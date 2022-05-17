import {
  reactive
} from 'vue'
import {useStore} from '@/store/index'
import services from '@/services/api.js'
import { ElMessage } from 'element-plus'

export function useAlterUserInfo () {
  const store = useStore()
  const userInfo = store.userInfo

  const filter = (user_copy) => {
    return !!user_copy.sex && !!user_copy.city && !!user_copy.name
  }

  const alterUserInfo = (user_copy, user_detail, isEdit) => {
    if(!filter(user_copy)) {
      ElMessage.warning('输入不能为空')
      return;
    }
    const res = services.updateUserInfo({sex: user_copy.sex, city: user_copy.city, name: user_copy.name})
    res.then(res => {
      const temp = res.user
      delete temp.password
      user_detail.value = temp
      userInfo.user = temp
      isEdit.value = false
      store.setUserInfo(userInfo)
      ElMessage.success(res.message)
    }).catch(err => {
      ElMessage.error(err.message)
    })
  }

  return {
    alterUserInfo
  }
}