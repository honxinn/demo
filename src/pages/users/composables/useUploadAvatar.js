import {
  ref
} from 'vue'
import {
  useStore
} from '@/store/index'
import {
  useGetUserRelease
} from './useGetUserRelease'
import services from '@/services/api.js'
import {
  ElMessage
} from 'element-plus'
export function useUploadAvatar(user_detail, user_id,
  page,
  type,
  total,
  page_num,
  resultList, activeName, func) {

  const updateArticleUserAvatar = (id) => {
    user_id.value = id
    page.value = 1
    type.value = activeName.value
    page_num.value = 1
    total.value = 0
    resultList.length = 0
    func()
  }


  const updateUserInfo = async () => {
    const store = useStore()
    const res = services.updateToken()
    await res.then(res => {
      let userInfo = res.result
      userInfo['token'] = userInfo.newtoken
      delete userInfo.newtoken
      delete userInfo.oldtoken
      updateArticleUserAvatar(userInfo.user.id)
      store.setUserInfo(userInfo)
    })
  }

  const uploadAvatar = (headers) => {
    const formData = new FormData()
    formData.append('file', headers.file)
    const res = services.userAvatarUpload(formData)
    res.then(async res => {
      user_detail.value.img = res.result.img
      await updateUserInfo()
      ElMessage.success(res.message)
    }).catch(err => {
      ElMessage.error(err.message)
    })
  }
  return {
    uploadAvatar
  }
}