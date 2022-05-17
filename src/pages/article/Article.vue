<template>
  <div class="article">
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="article-release">
          <div class="article-release-title">
            <p>{{ $route.query.article_id ? '修改文章' : '发布文章' }}</p>
          </div>
          <div class="article-release-item">
            <p>文章名称</p>
            <el-input v-model="title" size="large" placeholder="请输入文章名称"></el-input>
          </div>
          <div class="article-release-item">
            <p>文章摘要</p>
            <el-input v-model="summary" size="large" placeholder="请输入文章摘要(可选)"></el-input>
          </div>
          <div class="article-release-item">
            <p>文章分类</p>
            <el-select v-model="partition_id" size="large" placeholder="请选择文章分类">
              <el-option
                v-for="item in articlePartition"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <!-- <div class="article-release-item">
            <p>功能设置</p>
            <el-checkbox label="通知所有人" />
            <el-checkbox label="允许评论" />
            <el-checkbox label="允许点赞" />
          </div> -->
        </div>
      </el-col>
      <el-col :span="8">
        <div class="article-photo">
          <div class="article-photo-title">图片上传</div>
          <el-upload
            class="upload-demo"
            drag
            :action="api + '/article/uploads'"
            :headers="{ 'Authorization': 'Bearer ' + store.userInfo.token, 'Content-Type': 'multipart/form-data' }"
            :http-request="uploadImage"
          >
            <el-icon class="el-icon--upload">
              <upload-filled />
            </el-icon>
            <div class="el-upload__text">
              Drop file here or
              <em>click to upload</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
            </template>
          </el-upload>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <div class="article-release-item">
          <mavon-editor ref="md" v-model="content" style="height: 100%" @imgAdd="sendImage"></mavon-editor>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" justify="center">
      <el-col :span="6">
        <el-button
          color="#626aef"
          style="color: white"
          size="large"
          @click="handleRelease"
        >{{ $route.query.article_id ? '确认修改' : '确认发布' }}</el-button>
      </el-col>
      <el-col :span="6">
        <el-button color="#ababab" style="color: white" size="large" @click="handleRecovery">点我重置</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { mavonEditor } from 'mavon-editor'
import { ElMessage } from 'element-plus'
import { useStore } from '@/store/index'
import 'mavon-editor/dist/css/index.css'
import { useAlterArticle } from './composables/useAlterArticle'
import { UploadFilled } from '@element-plus/icons-vue'
import { useAddArticle } from './composables/useAddArticle'
import { useGetArticlePartition } from './composables/useGetArticlePartition'
import { useUploadImage } from './composables/useUploadImage'
import { useGetArticleDetail } from './composables/useGetArticleDetail'
const router = useRouter()
const route = useRoute()
const store = useStore()
const md = ref(null)
const api = process.env.VUE_APP_BASIC_API
const { alterArticleByAdmin } = useAlterArticle()
const { article_detail, getArticleDetail } = useGetArticleDetail()
const { title, content, partition_id, cover_url, summary, recoveryArticle, releaseArticleByAdmin } = useAddArticle()
const { articlePartition, getArticlePartition } = useGetArticlePartition()
const { sendImage, uploadImage } = useUploadImage(cover_url, md)

const handleRecovery = () => {
  recoveryArticle()
  let params = JSON.parse(JSON.stringify(route.query))
  delete params.article_id
  router.push({ query: params }) //再把新的替换了
}

const hasVal = (val) => {
  return val.trim() !== ''
}

const handleRelease = async () => {
  if (!hasVal(title.value) || !hasVal(content.value)) {
    ElMessage.error('请填写完整的文章信息')
    return;
  }
  route.query.article_id ? await alterArticleByAdmin(content.value, summary.value, title.value, article_detail.value.id, partition_id.value, cover_url.value) : await releaseArticleByAdmin()
  setTimeout(() => {
    router.push({
      name: 'ArticleList'
    })
  }, 200)
}
onMounted(async () => {
  if (route.query.article_id) {
    await getArticleDetail(route.query.article_id)
    title.value = article_detail.value.title
    content.value = article_detail.value.content
    partition_id.value = article_detail.value.partition_id
    cover_url.value = article_detail.value.cover_url
    summary.value = article_detail.value.summary
  }
  getArticlePartition()
})
</script>


<style lang="scss" scoped>
.article {
  background: #fff;
  padding: 20px;
  border-radius: 15px;
}
.article-release {
  text-align: left;
}
.article-release-item {
  margin-bottom: 20px;
}
.article-release-title {
  font-size: 20px;
  font-weight: bold;
}
.el-row {
  margin-bottom: 40px;
}
:deep(.el-upload-dragger) {
  width: 100%;
  padding: 10px;
}
:deep(.el-progress) {
  margin-top: 20px !important;
}
</style>