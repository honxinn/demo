<template>
  <div class="article-list">
    <!-- 文章数据 -->
    <div class="list-exspose">
      <div class="exspose-item" @click="handleSwitchChange('0')">
        <div class="exspose-text">
          <div class="article-num">{{ post_count }}</div>
          <div class="article-text">已发布文章</div>
        </div>
        <el-icon class="iconfont">
          <document />
        </el-icon>
      </div>
      <div class="exspose-item" @click="handleSwitchChange('1')">
        <div class="exspose-text">
          <div class="article-num">{{ shield_count }}</div>
          <div class="article-text">违规文章</div>
        </div>
        <el-icon class="iconfont illegal">
          <document />
        </el-icon>
      </div>
      <div class="exspose-item" @click="handleSwitchChange('2')">
        <div class="exspose-text">
          <div class="article-num">{{ delete_count }}</div>
          <div class="article-text">回收站</div>
        </div>
        <el-icon class="iconfont delete">
          <delete />
        </el-icon>
      </div>
      <div class="exspose-item" @click="handleSwitchChange('3')">
        <div class="exspose-text">
          <div class="article-num">{{ pending_count }}</div>
          <div class="article-text">待审核</div>
        </div>
        <el-icon class="iconfont clock">
          <clock />
        </el-icon>
      </div>
    </div>

    <!-- 搜索框 -->
    <!-- <div class="search-box">
      <div class="search-title">搜索筛选</div>
      <div class="search-card">
        <el-select v-model="partition_id" class="m-2" placeholder="按文章分类搜索" size="large">
          <el-option
            v-for="item in articlePartition"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>

        <el-input v-model="searchUser" placeholder="按用户名搜索" size="large" />
        <el-input v-model="searchArticleTitle" placeholder="按文章标题搜索" size="large" />
        <el-button
          color="#626aef"
          style="color: white"
          size="large"
          @click="searchSubmit(status, current, size, articleList)"
        >点我搜索</el-button>
      </div>
    </div>-->
    <!-- 文章列表 -->
    <!-- :default-sort="{ prop: 'date', order: 'descending' }" -->
    <div class="article-table">
      <div class="article-head-tools">
        <div class="article-title">{{ title }}</div>
        <el-date-picker
          :disabled="loading"
          size="large"
          v-model="articleTime"
          type="datetimerange"
          range-separator="To"
          :clearable="true"
          start-placeholder="起始日期"
          end-placeholder="结束日期"
          :shortcuts="shortcuts"
          @change="handleDateChange"
        ></el-date-picker>
      </div>

      <div class="tool-operate">
        <transition
          enter-active-class="animate__animated animate__bounceInLeft animate__faster"
          leave-active-class="animate__animated animate__bounceOutLeft animate__faster"
          mode="out-in"
        >
          <el-button
            v-show="selectList.value.length"
            color="#626aef"
            style="color: white;width:100px"
            size="small"
            @click="delSelectItem"
          >批量删除 ({{ selectList.value.length }})</el-button>
        </transition>
      </div>
      <el-table
        :data="articleList"
        style="width: 100%"
        v-loading="loading"
        @select="handleSelectItem"
        @select-all="handleSelectAllItem"
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ textAlign: 'center' }"
      >
        <!-- <el-table-column type="selection" fixed="left" /> -->
        <el-table-column label="文章名称" width="300">
          <template v-slot="scope">
            <div
              class="author-title"
              @click="handleArticleDetaile(scope.row.id)"
            >{{ scope.row.title }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="作者" />
        <el-table-column prop="comments" label="评论数" sortable />
        <el-table-column prop="likes" label="点赞数" sortable />
        <el-table-column prop="collections" label="收藏数" sortable />
        <el-table-column prop="visits" label="浏览数" sortable />
        <el-table-column prop="exec" label="操作" fixed="right" width="180">
          <template v-slot="scope">
            <el-dropdown>
              <span class="el-dropdown-link">
                <el-icon>
                  <more-filled />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item v-if="title != '回收站文章'">
                    <span @click="handleAlterArticle(scope.row.id)">编辑文章</span>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <span @click="handleOperate(scope.row.id, delArticleByAdmin, getTotalArticle, getArticleList)">删除文章</span>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="title == '已发布文章'">
                    <span @click="handleOperate(scope.row.id, shieldArticleByAdmin, getTotalArticle, getArticleList)">屏蔽文章</span>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="title != '已发布文章' && title != '待审核文章'">
                    <span @click="handleOperate(scope.row.id, restoreArticleByAdmin, getTotalArticle, getArticleList)">恢复文章</span>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="title == '待审核文章'">
                    <span @click="handleRefresh(3, scope.row.id, true)">通过审核</span>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="title == '待审核文章'">
                    <span @click="handleRefresh(3, scope.row.id, false)">不通过审核</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="articleTotal"
        :page-size="size"
        :current-page="current"
        @current-change="handleChangePage"
      ></el-pagination>
    </div>
  </div>
</template>
<script setup>
import {
  Document,
  Delete,
  MoreFilled,
  Clock,
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { shortcuts } from './exportData';
import { formatTime } from '@/utils/index';
import { useDelArticle } from './composables/useDelArticle';
import { useShieldArticle } from './composables/useShieldArticle';
import { useRestoreArticle } from './composables/useRestoreArticle';
import { useGetArticleList } from './composables/useGetArticleList';
import { useCurdArticle } from './composables/useCurdArticle';
import { useSelectTableItem } from './composables/useSelectTableItem';
import { useArticleListSearch } from './composables/useArticleListSearch';
import { useAuditArticle } from './composables/articles/useAuditArticle'
import { useGetArticlePartition } from './composables/useGetArticlePartition';
import { useGetTotalArticle } from './composables/useGetTotalArticle';

const router = useRouter()
const title = ref('已发布文章')
const partition_id = ref(null)
const status = ref(0)
const { auditArticleByAdmin } = useAuditArticle()
const { handleAlterArticle, curdArticleOperation } = useCurdArticle()
const { delArticleByAdmin } = useDelArticle()
const { shieldArticleByAdmin } = useShieldArticle()
const { restoreArticleByAdmin } = useRestoreArticle()
const { post_count, shield_count, delete_count, pending_count, getTotalArticle } = useGetTotalArticle()
const { select_status, selectList, delSelectItem, handleSelectItem, handleSelectAllItem } = useSelectTableItem()

const { searchArticleTitle, searchSubmit } = useArticleListSearch()
const { articlePartition, getArticlePartition } = useGetArticlePartition()
const { current, size, articleTime, articleList, articleTotal, articlePages, loading, getArticleList } = useGetArticleList()

// 获取指定时间段内的文章
const handleDateChange = () => {
  current.value = 1
  articleTime.value = articleTime.value && [formatTime(articleTime.value[0]), formatTime(articleTime.value[1])]
  getArticleList(partition_id, status)
}

// 执行完成后刷新列表
const handleRefresh = async (value, id, pass) => {
  await auditArticleByAdmin(id, pass)
  handleSwitchChange(value)
}

const handleOperate = (id, fn1, fn2, fn3) => {
  curdArticleOperation(id, fn1, fn2, fn3, partition_id, status)
}

// 切换文章分类
const handleSwitchChange = (value) => {
  let obj = {
    '0': '已发布文章',
    '1': '违规文章',
    '2': '回收站文章',
    '3': '待审核文章',
  }
  select_status.value = value === '2' ? true : false
  title.value = obj[value]
  status.value = value
  partition_id.value = null
  current.value = 1
  articleTime.value = []
  getArticleList(partition_id, status)
  getTotalArticle()
}

// 切换页数
const handleChangePage = (value) => {
  current.value = value
  getArticleList(partition_id, status)
}

// 查看文章详细页面
const handleArticleDetaile = (article_id) => {
  router.push({
    name: 'ArticleDetail',
    query: {
      article_id,
    },
  })
}

onMounted(() => {
  getTotalArticle()
  getArticleList(partition_id, status)
  getArticlePartition()
})

</script>

<style lang="scss" scoped>
.list-exspose {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.exspose-item {
  width: 19%;
  background: white;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.5s;
}
.exspose-item:hover {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}
@media (min-width: 1024px) {
  .exspose-item {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

.exspose-text {
  text-align: left;
}
.article-num {
  font-size: 30px;
}
.article-text {
  color: $textgrey;
}
.iconfont {
  background: #e3e1fc !important;
  color: #7367f0 !important;
}
.illegal {
  background: #fbdddd !important;
  color: #ea595a !important;
}
.delete {
  background: #ccf3e2 !important;
  color: #42b983 !important;
}
.clock {
  background: #ffefd5 !important;
  color: #f0a733 !important;
}
.search-box {
  background: #fff;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 15px;
}
.search-title {
  text-align: left;
  color: $textgrey;
  font-weight: bold;
}
.search-card {
  margin-top: 10px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  & > * {
    margin: 10px 20px 0px 0px;
  }
}
.el-input {
  width: 20%;
}
.el-button {
  width: 15%;
  transition: transform 0.3s;
}
.el-button:active {
  transform: translateY(5px);
}
.el-button:focus {
  background: #626aef !important;
}
.el-button:visited {
  background: #626aef !important;
  transform: translateY(-5px);
}
.article-table {
  background: #ffffff;
  text-align: left;
  padding: 20px;
}
.article-head-tools {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.article-title {
  font-size: 25px;
  font-weight: bold;
}
.el-pagination {
  margin-top: 20px;
  justify-content: end;
}
.operation {
  display: inline-block;
  margin-right: 15px;
  cursor: pointer;
}
.operation:hover {
  color: #626aef;
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
.author-title {
  cursor: pointer;
}
.author-title:hover {
  text-decoration: underline;
}
.tool-operate {
  display: flex;
  align-items: center;
}
:deep(.el-dropdown-link .el-icon) {
  transform: rotate(90deg);
  cursor: pointer;
}
</style>