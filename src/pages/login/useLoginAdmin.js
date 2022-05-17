import {
  ref
} from 'vue'
import services from '@/services/api.js'

export default function useLoginAdmin() {
  const loginAdminUsername = ref('')
  const loginAdminPassword = ref('')

  const loginAdminSubmit = () => {
    const res = services.login({
      user_name: loginAdminUsername.value,
      password: loginAdminPassword.value
    })
    res.then(res => {
      ElMessage.success('登录成功, 即将自动跳转');
      localStorage.setItem('userInfo', JSON.stringify(res.result));
      setTimeout(() => {
        location.href = '/'
      }, 500)
    }).catch(() => {
      localStorage.clear();
    });
  }

  return {
    loginAdminUsername,
    loginAdminPassword,
    loginAdminSubmit
  }
}