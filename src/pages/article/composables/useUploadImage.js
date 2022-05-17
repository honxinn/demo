import { ref } from 'vue'
import services from '@/services/api.js'
import qs from 'qs'
export function useUploadImage(cover_url,md) {
  const imageFile = ref(null)
  const upImg = ref('')

  const sendImage = (pos, file) => {
    const formData = new FormData()
    formData.append('file', file)
    console.log(formData)
    const res = services.uploadArticleImg(formData)
    res.then(res => {
      md.value.$img2Url(pos, res.result.imgPaths[0])
    }).catch(err => {
      ElMessage.error(err.message)
    })
  }

  const uploadImage = (headers) => {
    const formData = new FormData()
    formData.append('file', headers.file)
    const res = services.uploadArticleImg(formData)
    res.then(res => {
      cover_url.value = res.result.imgPaths[0]
      upImg.value = res.result.imgPaths[0]
    }).catch(err => {
      ElMessage.error(err.message)
    })
  }


  return {
    upImg,
    imageFile,
    uploadImage,
    sendImage
  }
}