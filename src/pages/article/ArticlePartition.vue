<template>
  <div class="article-classify">
    <div class="classify-left">
      <el-tag
        size="large"
        v-for="tag in articleTag"
        :key="tag.name"
        class="mx-1"
        closable
        @close="handleClose(tag.id)"
        :type="tag.type"
      >
        <div class="tag-item" style="cursor: pointer;" @click.stop="handleClick({ tag })">
          <img style="width: 50px; height: 50px;" :src="tag.img" alt />
          <div class="tag-name">{{ tag.name }}</div>
          <div class="tag-desc">{{ tag.desc }}</div>
        </div>
      </el-tag>
    </div>
    <div class="classify-box">
      <div class="operation-item">
        <p>{{ partition_id ? '修改分类' : '新增分类' }}</p>
        <el-upload
          class="upload-demo"
          drag
          :action="API + '/article/uploads'"
          :headers="{ 'Authorization': 'Bearer ' + store.userInfo.token, 'Content-Type': 'multipart/form-data' }"
          :http-request="uploadImage"
        >
          <el-icon class="el-icon--upload">
            <upload-filled />
          </el-icon>
          <div class="el-upload__text">
            拖拽图片到 此处
            <em>点击上传</em>
          </div>
        </el-upload>
        <el-input v-model="partitionName" size="large" placeholder="请输入新增分类"></el-input>
        <el-input v-model="partitionDesc" size="large" placeholder="请输入描述"></el-input>
        <div style="display:flex; align-items: center;">
          <el-button
            color="#626aef"
            style="color: white"
            size="large"
            v-if="partition_id"
            @click="handleAlterPartition"
          >{{ '修改分类' }}</el-button>
          <el-button
            color="#626aef"
            style="color: white"
            size="large"
            v-else
            @click="handleAdd"
          >{{ '添加分类' }}</el-button>
          <el-button color="#626aef" size="large" plain @click="clear">清空</el-button>
        </div>
      </div>
      <!-- <div class="operation-item">
        <p>删除分类</p>
        <el-select v-model="article_id" class="m-2" placeholder="请选择删除分类" size="large">
          <el-option
            v-for="item in articlePartition"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button
          color="#626aef"
          style="color: white"
          size="large"
          @click="delArticlePartition"
        >删除分类</el-button>
      </div>-->
    </div>
  </div>
</template>
<script setup>
import { useStore } from '@/store/index'
import { UploadFilled } from '@element-plus/icons-vue'
import { onMounted, reactive, ref } from 'vue';
import { useAlterPartition } from './composables/useAlterPartition';
import { useUploadImage } from './composables/useUploadImage'
import { useGetArticlePartition } from './composables/useGetArticlePartition'
import { useDelArticlePartition } from './composables/useDelArticlePartition'
import { useAddArticlePartition } from './composables/useAddArticlePartition'
const store = useStore()
const cover_url = ref('')
const API = process.env.VUE_APP_BASIC_API
const partition_id = ref(null)
const {  upImg, uploadImage } = useUploadImage(cover_url)
const { uploadPartition } = useAlterPartition()
const { articlePartition, articleTag, partitionVal, getArticlePartition } = useGetArticlePartition()


const { article_id, delArticlePartition } = useDelArticlePartition()
const { partitionName, partitionDesc, addArticlePartition } = useAddArticlePartition()
const titles = reactive(['可选分类', '已选分类'])

const clear = () => {
  partition_id.value = null
  partitionName.value = ''
  partitionDesc.value = ''
  cover_url.value = ''
}

const handleClick = (item) => {
  partition_id.value = item.tag.id
  partitionName.value = item.tag.name
  partitionDesc.value = item.tag.desc
  cover_url.value = item.tag.img
}

const handleAlterPartition = async () => {
  await uploadPartition(partition_id.value, partitionName.value, partitionDesc.value, cover_url.value)
  partition_id.value = null
  partitionName.value = ''
  partitionDesc.value = ''
  cover_url.value = ''
}

const handleClose = async (id) => {
  await delArticlePartition(id)
  getArticlePartition()
}

const handleAdd = async () => {
  await addArticlePartition(cover_url)
  getArticlePartition()
}

onMounted(() => {
  getArticlePartition()
})


</script>

<style lang="scss" scoped>
.article-classify {
  display: flex;
}
.classify-left {
  width: 70%;
  background: white;
  margin-right: 50px;
}
.classify-box {
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}
.operation-item {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 15px;
  margin-bottom: 10px;
  padding: 20px;
}
.choice-classify {
  background: #fff;
  border-radius: 15px;
}
.el-transfer {
  padding: 20px;
}
p {
  font-size: 24px;
}
.el-input {
  margin-bottom: 20px;
}
.el-select {
  margin-bottom: 20px;
}
.el-button {
  width: 100px;
}
.tag-item {
  padding: 20px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & > * {
    margin-bottom: 10px;
  }
}
:deep(.el-tag--large) {
  padding: 50px 20px;
  margin: 10px;
}
</style>