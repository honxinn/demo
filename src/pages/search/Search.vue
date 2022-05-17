<template>
  <div class="search">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="文章" name="article" v-loading="loading">
        <!-- <el-skeleton :loading="loading" animated style="padding:20px;">
          <template #template>
            <el-skeleton-item variant="text" style="display: flex; flex-direction: column;text-align:left;width: 100px;" />
            <div style="display: flex; align-items: center;">
              <div style="display: flex; flex-direction: column; flex:1;">
                <el-skeleton-item variant="text" style="width:30%" />
                <el-skeleton-item variant="text" style="width: 20%; margin-top:10px;" />
              </div>
              <el-skeleton-item
                variant="image"
                style="margin-right: 10px; width:50px; height:50px"
              />
            </div>
            <el-skeleton-item variant="text" style="display: flex; flex-direction: column;text-align:left;width: 100px;" />
          </template>
        </el-skeleton>-->
        <div class="article-item no" v-if="!loading && !searchList.length">暂无数据哦</div>
        <div
          class="article-item"
          v-else
          v-for="item in searchList"
          :key="item.id"
          @click="handleGoToArticle(item.id)"
        >
          <div class="item-header">
            <span class="user-name" @click.stop="handleGoToUserDetail(item.user_id)">{{ item.name }}</span> -
            <span>{{ item.createdAt }}</span>
          </div>
          <div class="item-content-box">
            <div class="item-content">
              <div class="item-title" @click.stop="handleGoToArticle(item.id)">{{ item.title }}</div>
              <div class="item-summary">{{ item.summary }}</div>
            </div>
            <img class="cover-img" :src="item.cover_url" alt />
          </div>
          <div class="item-view">
            <span class="view">{{ item.likes }}点赞</span>
            <span class="view">{{ item.comments }}评论</span>
            <span class="view">{{ item.visits }}访问</span>
          </div>
        </div>
        <div style="display: flex;align-items:center;justify-content:center;margin-top: 10px;">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="size"
            :current-page="current"
            @current-change="handleChangePage"
          ></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="用户" name="user">
        <el-skeleton :loading="loading" animated>
          <template #template>
            <div style="display: flex; align-items: center; padding:20px;">
              <el-skeleton-item
                variant="circle"
                style="margin-right: 10px; width:50px; height:50px"
              />
              <div style="display: flex; flex-direction: column; width:50%;">
                <el-skeleton-item variant="p" style="width:30%" />
                <el-skeleton-item variant="p" style="width: 20%; margin-top:10px;" />
              </div>
            </div>
          </template>
        </el-skeleton>
        <div class="search-item no" v-if="!loading && !searchList.length">暂无数据哦</div>
        <div class="search-item" v-else v-for="item in searchList" :key="item.id">
          <img class="avatar" @click="handleGoToUserDetail(item.id)" :src="item.img" alt />
          <div class="search-item-name">
            <div class="user-name" @click="handleGoToUserDetail(item.id)">{{ item.name }}</div>
            <div class="account">{{ item.user_name }}</div>
          </div>
          <el-button
            color="#626aef"
            style="color: white"
            @click="handleChangeFollow(addFollow, item.id)"
            v-if="!item.follow"
          >关注</el-button>
          <el-button v-else color="#626aef" plain @click="handleChangeFollow(cancelFollow, item.id)">取关</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSearchDetail } from './useSearchDetail'
import { useAddFollow } from '../users/composables/follow/useAddFollow';
import { useCancelFollow } from '../users/composables/follow/useCancelFollow';

const route = useRoute()
const router = useRouter()
const total = ref(0)
const current = ref(1)
const size = ref(10)
const status = ref('0')
const activeName = ref('article')

const { addFollow } = useAddFollow()
const { cancelFollow } = useCancelFollow()
const { loading, searchList, searchSubmit, searchDetail } = useSearchDetail()

const handleChangeFollow = async (fn, id) => {
  await fn(id)
  handleCheckTab()
}

const handleChangePage = (value) => {
  current.value = value
  searchList.length = 0
  searchSubmit(route.query.keyword, status, current, size, total)
}

const handleGoToArticle = (id) => {
  router.push({
    name: 'ArticleDetail',
    query: {
      article_id: id
    }
  })
}

const handleGoToUserDetail = (id) => {
  router.push({
    name: 'UserDetail',
    query: {
      user_id: id
    }
  })
}

// 点击选项卡切换数据重渲染
const handleClick = (tab, event) => {
  searchList.length = 0
  handleCheckTab()
}

// 每次检测选项卡
const handleCheckTab = () => {
  activeName.value === 'user' ? searchDetail(route.query.keyword) : searchSubmit(route.query.keyword, status, current, size, total)
}

// 监听关键字变动
watch(() => route.query.keyword, (val) => {
  if (val != '') handleCheckTab()
})

onMounted(() => {
  if (route.query.keyword) {
    handleCheckTab()
  }
})
</script>

<style lang="scss" scoped>
:deep(.el-tabs__header) {
  background: #fff;
}
:deep(.el-tabs__nav-wrap) {
  padding: 10px;
}
:deep(.el-tabs__content) {
  background: #fff;
}
.search-item {
  padding: 20px;
  display: flex;
  align-items: center;
}
.article-item {
  text-align: left;
  padding: 20px;
  cursor: pointer;
  &:hover {
    background: rgb(240, 238, 238);
  }
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.3);
  }
}
.search-item-name {
  flex: 1;
  text-align: left;
}
.account {
  font-size: 14px;
  color: #999;
}
.item-content-box {
  display: flex;
  align-items: center;
}
.item-content {
  flex: 1;
  margin-top: 10px;
}
.cover-img {
  width: 50px;
  height: 50px;
  margin-left: 20px;
}
.item-header {
  font-size: 14px;
  color: #999;
}
.item-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  &:hover {
    text-decoration: underline;
  }
}
.item-summary {
  font-size: 14px;
  color: #999;
}
.item-view {
  margin-top: 10px;
}
.view {
  margin-right: 10px;
  color: #999;
  font-size: 14px;
}
.user-name {
  cursor: pointer;
}
.user-name:hover {
  color: #517fff;
}
:deep(.el-pagination.is-background .el-pager li:not(.disabled).active) {
  background-color: #626aef !important;
}
:deep(.el-pagination.is-background .el-pager li:not(.disabled).number) {
  background: transparent;
  margin: 0px;
  border-radius: 10px;
  transition: all 0.2s;
  cursor: pointer;
}
:deep(.el-pagination.is-background .el-pager li:not(.disabled).number:active) {
  background-color: #626aef !important;
  transform: scale(0.5);
  color: white;
}
:deep(.el-pagination.is-background .el-pager li:not(.disabled).more) {
  margin: 0px;
}
:deep(.el-pagination.is-background .el-pager) {
  background: #f4f4f5;
  border-radius: 15px;
  padding: 2px;
}
:deep(.el-pagination.is-background .btn-next) {
  border-radius: 50px;
}
:deep(.el-pagination.is-background .btn-prev) {
  border-radius: 50px;
}
</style>