import {
  ref,
  reactive
} from 'vue'
import services from '@/services/api.js'
import { ElMessage } from 'element-plus'

export function useSetUserPasswd() {
  const dialogFormVisible = ref(false)
  const form = reactive({
    name: '',
    passwd: ''
  })

  const setUserPasswd = async () => {
    const res = services.setUserPasswdByAdmin({
      user_name: form.name,
      password: form.passwd
    })
    await res.then(res => {
      ElMessage.success(res.message)
    }).catch(err => {
      ElMessage.error(err.message)
    })
    setDialogVisible(false)
  }

  const setDialogVisible = (status, user_name) => {
    dialogFormVisible.value = status
    user_name && (form.name = user_name)
  }

  return {
    dialogFormVisible,
    form,
    setDialogVisible,
    setUserPasswd
  }
}