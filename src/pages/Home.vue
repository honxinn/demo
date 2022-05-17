<template>
  <div class="home">
    <div class="chart-box">
      <!-- <div class="chart-header">
        <div class="chart-card">
          <el-icon class="iconfont">
            <user />
          </el-icon>
          <div class="chart-num">2.5K</div>
          <div class="chart-name">用户数</div>
        </div>
        <div class="chart-card">
          <el-icon class="iconfont">
            <user />
          </el-icon>
          <div class="chart-num">1.5K</div>
          <div class="chart-name">文章数</div>
        </div>
      </div> -->
      <div class="chart-main">
        <ApexCharts
          style="background-color: white; padding: 20px;border-radius: 15px;"
          :chartOptions="getUserNumByAllCampus.chartOptions"
          :chartSeries="getUserNumByAllCampus.series"
          chartType="area"
          :chartHeight="400"
          chartWidth="100%"
        />
      </div>
      <div class="article-rank">
        <div class="article-header">校园热帖</div>
        <div
          class="article-item"
          v-for="item in article_rank"
          :key="item.id"
          @click="handleGoToArticle(item.id)"
        >
          <div class="article-author">
            <el-popover
              :width="300"
              placement="top"
              popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
            >
              <template #reference>
                <el-avatar
                  @click.stop="handleGoToUserCenter(item.user_id)"
                  :size="50"
                  :src="item.avator"
                  style="cursor:pointer"
                />
              </template>
              <template #default>
                <div
                  class="demo-rich-conent"
                  style="display: flex; align-items: center; gap: 16px;"
                >
                  <el-avatar
                    @click.stop="handleGoToUserCenter(item.user_id)"
                    :size="60"
                    :src="item.avator"
                    style="margin-bottom: 8px;cursor:pointer"
                  />
                  <div>
                    <p
                      class="demo-rich-content__name"
                      style="margin: 0; font-weight: 500;cursor:pointer"
                      @click.stop="handleGoToUserCenter(item.user_id)"
                    >{{ item.name }}</p>
                    <p
                      class="demo-rich-content__mention"
                      style="margin:0px; font-size: 12px; color: var(--el-color-info)"
                    >@{{ item.user_name }}</p>
                  </div>
                  <el-button
                    color="#626aef"
                    plain
                    @click.stop="handleGoToUserCenter(item.user_id)"
                  >Ta的主页</el-button>
                </div>
              </template>
            </el-popover>
            <div style="margin-left: 10px;">
              <div class="author-name">{{ item.name }}</div>
              <span class="author-time">{{ moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss') }}</span>
              <span class="author-tag">{{ item.partition_name }}</span>
            </div>
          </div>
          <div class="article">
            <div class="article-content">
              <div class="article-title">{{ item.title }}</div>
              <div class="article-summary">{{ item.summary }}</div>
            </div>
            <img v-if="item.cover_url" class="cover-img" :src="item.cover_url" />
          </div>
          <div class="article-info">
            <span class="info-data">浏览 {{ item.visits }}</span>
            <span class="info-data">喜欢 {{ item.likes }}</span>
            <span class="info-data">评论 {{ item.comments }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="chart-sidebar">
      <div class="sidebar-header">
        <img class="decore decore-left" src="@/assets/images/decore_left.png" alt />
        <img class="decore decore-right" src="@/assets/images/decore_right.png" alt />
        <div class="header-user">
          <img class="avatar" :src="store.userInfo.user.img" alt />
          <div class="user-info">
            <div class="user-name">{{ store.userInfo.user.name }}</div>
            <div class="welcome">上午好~</div>
          </div>
          <el-button
            color="#626aef"
            style="margin-left: 20px;"
            plain
            @click="handleGoToUserCenter(store.userInfo.user.id)"
          >个人中心</el-button>
        </div>
        <div>当前在线人数：{{onlineUser}}</div>
      </div>
      <div class="user-rank">
        <div class="rank-title">社区红人</div>
        <div class="user-item" v-for="item in user_rank" :key="item.id">
          <el-popover
            :width="300"
            placement="left"
            popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
          >
            <template #reference>
              <el-avatar :src="item.img" style="margin-right: 10px;cursor:pointer" />
            </template>
            <template #default>
              <div class="demo-rich-conent" style="display: flex; align-items: center; gap: 16px;">
                <el-avatar
                  @click="handleGoToUserCenter(item.id)"
                  :size="60"
                  :src="item.img"
                  style="margin-bottom: 8px;cursor:pointer"
                />
                <div>
                  <p
                    class="demo-rich-content__name"
                    style="margin: 0; font-weight: 500;cursor:pointer"
                    @click="handleGoToUserCenter(item.id)"
                  >{{ item.name }}</p>
                  <p
                    class="demo-rich-content__mention"
                    style="margin:0px; font-size: 12px; color: var(--el-color-info)"
                  >@{{ item.user_name }}</p>
                  <p
                    style="margin:0px; font-size: 12px; color: var(--el-color-info)"
                  >性别 {{ item.sex }}</p>
                  <p
                    style="margin:0px; font-size: 12px; color: var(--el-color-info)"
                  >关注 {{ item.follows_cnt }}</p>
                </div>
                <el-button color="#626aef" plain @click="handleGoToUserCenter(item.id)">Ta的主页</el-button>
              </div>
            </template>
          </el-popover>
          <div class="user-item-info">
            <div class="item-info-name">{{ item.name }}</div>
            <div class="item-info-city">
              <span v-if="item.city">来自{{ item.city }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useStore } from '@/store';
import { onMounted, reactive } from 'vue';
import moment from 'moment'
import { useRouter } from 'vue-router'
import ApexCharts from '@/components/ApexCharts.vue';
import { getDay, getOneDayData } from '@/utils/index';
import { useGetArticleListTotal } from './article/composables/useGetArticleListTotal';
import { useGetTotalData } from './useGetTotalData.js'
import { useGetOnlineUser } from './useGetOnlineUser.js'

const router = useRouter()
const store = useStore()
const { total_status, total_partition_id, timeList,  totalList, getArticleListTotal } = useGetArticleListTotal()
const { onlineUser, getOnlineUser } = useGetOnlineUser()
const { user_rank, article_rank, getArticleRank, getUserRank } = useGetTotalData()

const handleGetArticleTotal = async () => {
  total_status.value = '0'
  total_partition_id.value = null
  timeList.value = [getDay(-6) + ' 00:00:00', getDay(0) + ' 00:00:00']
  await getArticleListTotal()
}


const handleGoToUserCenter = (user_id) => {
  router.push({
    name: 'UserDetail',
    query: {
      user_id: user_id
    }
  })
}

const handleGoToArticle = (article_id) => {
  router.push({
    name: 'ArticleDetail',
    query: {
      article_id: article_id
    }
  })
}

const getUserNumByAllCampus = reactive({
  series: [ {
    name: '发帖数',
    data: [11, 32, 45, 32, 34, 52, 41]
  }],
  chartOptions: {
    chart: {
      toolbar: false,
      height: 500,
      type: 'area'
    },
    dataLabels: {
      enabled: false
    },
    title: {
      text: '近七天文章增长趋势',
      align: 'left'
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: [getDay(-6) + ' 00:00:00', getDay(-5) + ' 00:00:00', getDay(-4) + ' 00:00:00', getDay(-3) + ' 00:00:00', getDay(-2) + ' 00:00:00', getDay(-1) + ' 00:00:00', getDay(0) + ' 00:00:00']
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    },
  },
})


onMounted(async () => {
  getArticleRank()
  getUserRank()
  getOnlineUser()
  await handleGetArticleTotal()
  getUserNumByAllCampus.series.data = [getOneDayData(totalList, getDay(-6), getDay(-5)), getOneDayData(totalList, getDay(-5), getDay(-4)), getOneDayData(totalList, getDay(-4), getDay(-3)), getOneDayData(totalList, getDay(-3), getDay(-2)), getOneDayData(totalList, getDay(-2), getDay(-1)), getOneDayData(totalList, getDay(-1), getDay(0))]
})

</script>

<style scoped lang="scss">
.home {
  display: flex;
}
.chart-box {
  width: 70%;
  margin-right: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.chart-sidebar {
  width: 30%;
}
.chart-header {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}
.chart-card {
  width: 30%;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 15px;
  box-shadow: 0 20px 25px -5px rgb(0, 0, 0, 0.1),
    0 10px 10px -5px rgb(0, 0, 0, 0.04);
  &:not(:last-child) {
    margin-right: 10px;
  }
}
.chart-main {
  width: 100%;
}
.el-icon,
.chart-num,
.chart-name {
  margin-left: 20px;
}
.chart-num,
.chart-name {
  text-align: left;
}
.el-icon {
  margin-top: 20px;
}
.chart-num {
  font-size: 30px;
  font-weight: bold;
  margin-top: 20px;
}
.chart-name {
  color: $textgrey;
}
.iconfont {
  background: #eae8fd !important;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 5px;
}
.sidebar-header {
  padding: 24px 0px 24px 20px;
  position: relative;
  border-radius: 15px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(
    to right,
    rgb(115, 103, 240, 1),
    rgba(152, 143, 242, 0.7)
  );
}
.decore {
  width: 20%;
  top: 0px;
  position: absolute;
}
.decore-left {
  left: 0;
}
.decore-right {
  right: 0;
}
.header-user {
  display: flex;
  align-items: center;
  text-align: left;
  font-size: 14px;
  margin-bottom: 5px;
}
.user-rank {
  margin-top: 20px;
  border-radius: 15px;
  background: white;
  text-align: left;
  padding: 20px;
}
.rank-title {
  padding-bottom: 10px;
  border-bottom: 1px solid #d6d6d6;
  margin-bottom: 20px;
  font-weight: bold;
}
.user-item {
  display: flex;
  align-items: center;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
}
.item-info-name {
  color: #ff3d55;
}
.item-info-city {
  font-size: 14px;
  color: #adadad;
  & > span {
    margin-right: 10px;
  }
}
.article-rank {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  background: #fff;
  border-radius: 15px;
}
.article-item {
  text-align: left;
  padding: 20px;
  cursor: pointer;
  &:hover {
    background: #f1f1f1;
  }
}
.article-author {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #adadad;
}
.author-name {
  color: #626262;
  cursor: pointer;
  &:hover {
    color: #1683f6;
  }
}
.author-time {
  margin-right: 10px;
}
.article-header {
  padding: 20px;
  border-bottom: 1px solid #e6e5e5;
  text-align: left;
  font-size: 18px;
  font-weight: bold;
}
.article {
  display: flex;
  align-items: center;
  margin-top: 10px;
  & .article-content {
    flex: 1;
    & .article-title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 5px;
    }

    & .article-summary {
      font-size: 14px;
      color: #909090;
      margin: 15px 0px;
    }
  }
}
.cover-img {
  width: 100px;
  height: 100px;
}
.article-info {
  color: #adadad;
  font-size: 14px;

  & .info-data:not(:last-child) {
    margin-right: 10px;
  }
}
</style>