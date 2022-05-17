<template>
  <div class="article-detail" v-loading="loading">
    <!-- {{ $route.query.article_id }} -->
    <div class="article-detail-content">
      <div class="bg">
        <div class="article-detail-content-title">
          <h1>{{ article_detail.value.title }}</h1>
        </div>
        <div class="article-detail-user">
          <div
            class="article-detail-user-avatar"
            @click="handleUserDetail(article_detail.value.user_id)"
          >
            <img class="avatar" :src="article_detail.value.avator" alt />
          </div>
          <div class="article-detail-user-info">
            <div
              class="article-detail-user-info-name"
              @click="handleUserDetail(article_detail.value.user_id)"
            >
              <span>{{ article_detail.value.name }}</span>
            </div>
            <div class="article-detail-user-info-time">
              <span>发表于 {{ article_detail.value.createdAt }}</span>
            </div>
          </div>
        </div>
        <div class="article-detail-content-summary">
          <div class="summary-title">文章摘要</div>
          <div class="summary-content">{{ article_detail.value.summary }}</div>
        </div>
        <div class="article-detail-content-image" v-show="article_detail.value.cover_url">
          <el-image :src="article_detail.value.cover_url" lazy></el-image>
        </div>

        <div class="article-detail-content-content">
          <div class="article-detail-content-content-text">
            <mavon-editor
              :subfield="false"
              defaultOpen="preview"
              :toolbarsFlag="false"
              :boxShadow="false"
              :previewBackground="'#ffffff'"
              v-model="article_detail.value.content"
              :editable="false"
              style="height: 100%"
            ></mavon-editor>
          </div>
        </div>
        <div class="article-detail-update">最后编辑时间：{{ article_detail.value.updatedAt }}</div>
        <div class="article-detail-footer">
          <div class="article-detail-operate">
            <div
              class="article-detail-operate-item"
              @click="handleLikesChange(article_detail.value.isLiked ? cancelLike : addLike, 'article', article_detail.value.id)"
            >
              <el-icon>
                <caret-top />
              </el-icon>
              {{ article_detail.value.likes }}
              <span>{{ article_detail.value.isLiked ? '取消' : '添加' }}赞同</span>
            </div>
            <div class="article-detail-operate-item">
              <el-icon>
                <chat-dot-round />
              </el-icon>
              <span>
                <a
                  href="#input"
                  class="go-comment"
                >{{ article_detail.value.comments ? article_detail.value.comments : '添加' }}评论</a>
              </span>
            </div>
            <div class="article-detail-operate-item" @click="handleCollectChange(article_detail.value.isCollectioned ? cancelCollect  : collectArticle, article_detail.value.id)">
              <el-icon>
                <collection-tag />
              </el-icon>
              {{article_detail.value.collections}}
              <span>{{ article_detail.value.isCollectioned ? '取消' : '添加' }}收藏</span>
            </div>
            <div class="article-detail-operate-item">
              <el-icon>
                <view />
              </el-icon>
              <span>{{ article_detail.value.visits || '-' }}人看过</span>
            </div>
            <div
              class="article-detail-operate-item"
              @click="handleAlterArticle(article_detail.value.id)"
            >
              <el-icon>
                <edit-pen />
              </el-icon>
              <span>修改</span>
            </div>
            <div
              class="article-detail-operate-item"
              @click="handleOperateAfter(article_detail.value.id, delArticleByAdmin)"
            >
              <el-icon>
                <delete />
              </el-icon>
              <span>删除</span>
            </div>
            <div
              class="article-detail-operate-item"
              @click="handleOperateAfter(article_detail.value.id, shieldArticleByAdmin)"
              v-if="article_detail.value.status === 0"
            >
              <el-icon>
                <remove />
              </el-icon>
              <span>屏蔽</span>
            </div>
            <div
              class="article-detail-operate-item"
              @click="handleOperateAfter(article_detail.value.id, restoreArticleByAdmin)"
              v-else
            >
              <el-icon>
                <refresh />
              </el-icon>
              <span>恢复</span>
            </div>
          </div>
          <div class="article-detail-tag">
            <div class="article-detail-tag-item">{{ article_detail.value.partition_name }}</div>
          </div>
        </div>
      </div>
      <div class="article-detail-comment bg">
        <div class="article-detail-comment-title">
          <div class="comment-total-title">{{ commentList.length }} 条评论</div>
          <div class="comment-rank">
            <el-icon>
              <switch />
            </el-icon>
            <!-- <span>切换为时间排序</span> -->
          </div>
        </div>
        <div class="comment-box">
          <div class="comment-list">
            <div class="comment-list-item" v-for="item in commentList" :key="item.id">
              <div class="comment-list-item-header">
                <div class="comment-user-info">
                  <img
                    class="avatar mini-avatar"
                    :src="item.comment_user.avatar"
                    alt
                    @click="handleUserDetail(item.user_id)"
                  />
                  <div
                    class="comment-username"
                    @click="handleUserDetail(item.user_id)"
                  >{{ item.comment_user.name }}</div>
                </div>

                <div class="comment-release-time">{{ moment(item.createdAt).format('MM-DD') }}</div>
              </div>
              <div class="comment-list-item-content">
                <div class="comment-list-item-content-text">{{ item.comment_content }}</div>
                <div class="comment-operate">
                  <div class="comment-operate-list">
                    <div
                      :style="{ 'color': item.comment_isGood ? '#0066ff' : '' }"
                      class="comment-operate-item"
                      @click="handleLikesChange(item.comment_isGood ? cancelLike : addLike, 'comment', item.id)"
                    >
                      <el-icon>
                        <caret-top />
                      </el-icon>
                      <span>{{ item.comment_good }}</span>
                    </div>
                    <div
                      class="comment-operate-item"
                      @click="commentIsShow = commentIsShow == item.id ? null : item.id"
                    >
                      <el-icon>
                        <chat-dot-round />
                      </el-icon>
                      <span>{{ commentIsShow == item.id ? '取消回复' : '回复' }}</span>
                    </div>
                  </div>
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      <el-icon class="rotate">
                        <more-filled />
                      </el-icon>
                    </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item>
                          <span
                            @click="handleOptCommentAfter(delComment, item.id, article_detail.value.id)"
                          >删除</span>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
                <div class="input-box" v-if="commentIsShow === item.id">
                  <el-input
                    v-model="comment_reply_content"
                    :autosize="{ minRows: 1, maxRows: 3 }"
                    resize="none"
                    type="textarea"
                    placeholder="说点什么吧"
                  />
                  <el-button
                    type="primary"
                    :icon="Promotion"
                    circle
                    @click="handleReplyCommentAfter(item.id, item.user_id)"
                  ></el-button>
                </div>
                <div class="reply-list">
                  <div class="reply-item" v-for="reply in item.reply_list">
                    <div class="comment-list-item-header">
                      <div class="comment-user-info">
                        <img class="avatar mini-avatar" :src="reply.from_user.avatar" alt />
                        <div>
                          <span
                            class="comment-username"
                            @click="handleUserDetail(reply.from_user_id)"
                          >{{ reply.from_user.name }}</span>
                          <span>回复</span>
                          <span
                            class="comment-username"
                            @click="handleUserDetail(reply.to_user_id)"
                          >{{ reply.to_user.name }}</span>
                        </div>
                      </div>
                      <div
                        class="comment-release-time"
                      >{{ moment(reply.createdAt).format('MM-DD') }}</div>
                    </div>
                    <div class="comment-list-item-content">
                      <div class="comment-list-item-content-text">{{ reply.comment_reply_content }}</div>
                      <div class="comment-operate">
                        <div class="comment-operate-list">
                          <div
                            :style="{ 'color': reply.reply_isGood ? '#0066ff' : '' }"
                            class="comment-operate-item"
                            @click="handleLikesChange(reply.reply_isGood ? cancelLike : addLike, 'comment_reply', reply.id)"
                          >
                            <el-icon>
                              <caret-top />
                            </el-icon>
                            <span>{{ reply.reply_good }}</span>
                          </div>
                          <div
                            class="comment-operate-item"
                            @click="commentIsShow = commentIsShow == reply.id ? null : reply.id"
                          >
                            <el-icon>
                              <chat-dot-round />
                            </el-icon>
                            <span>{{ reply.comments }}{{ commentIsShow == reply.id ? '取消回复' : '回复' }}</span>
                          </div>
                        </div>
                        <el-dropdown>
                          <span class="el-dropdown-link">
                            <el-icon class="rotate">
                              <more-filled />
                            </el-icon>
                          </span>
                          <template #dropdown>
                            <el-dropdown-menu>
                              <el-dropdown-item>删除</el-dropdown-item>
                            </el-dropdown-menu>
                          </template>
                        </el-dropdown>
                      </div>
                    </div>
                    <div class="input-box" v-if="commentIsShow === reply.id">
                      <el-input
                        v-model="comment_reply_content"
                        :autosize="{ minRows: 1, maxRows: 3 }"
                        resize="none"
                        type="textarea"
                        placeholder="说点什么吧"
                      />
                      <el-button
                        type="primary"
                        :icon="Promotion"
                        circle
                        @click="handleReplyCommentAfter(item.id, reply.from_user_id, reply.comment_reply_id)"
                      ></el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="input-box" id="input">
          <el-input
            v-model="comment_content"
            :autosize="{ minRows: 1, maxRows: 3 }"
            resize="none"
            type="textarea"
            placeholder="说点什么吧"
          />
          <el-button
            type="primary"
            :icon="Promotion"
            circle
            @click="handleOptCommentAfter(addComment, 1, article_detail.value.id)"
          ></el-button>
        </div>
      </div>
    </div>
    <div class="article-sidebar">
      <div class="user-info">
        <!-- {{user_detail.value}}
        {{user_detail.follows}}-->
        <div class="user-info-header">
          <img
            class="avatar"
            :src="user_detail.value.img"
            alt
            @click="handleUserDetail(user_detail.value.id)"
          />
          <div class="user">
            <div class="user-name">{{ user_detail.value.name }}</div>
            <div class="user-city">来自{{ user_detail.value.city }}</div>
          </div>
        </div>
        <div class="other-info">
          <div class="other-item">性别 {{ user_detail.value.sex }}</div>
          <div class="other-item">关注了 {{ user_detail.follows.length }} 人</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import moment from 'moment'
import {
  View,
  Switch,
  CaretTop,
  ChatDotRound,
  EditPen,
  Delete,
  Remove,
  Refresh,
  MoreFilled,
  ChatDotSquare,
  CollectionTag,
  Promotion
} from '@element-plus/icons-vue'
import 'mavon-editor/dist/css/index.css'
import { useGetUserDetail } from '@/pages/users/composables/useGetUserDetail'
import { useGetArticleDetail } from './composables/useGetArticleDetail'
import { mavonEditor } from 'mavon-editor'
import { useCollectArticle } from './composables/collect/useCollectArticle'
import { useCancelCollect } from './composables/collect/useCancelCollect'
import { useDelArticle } from './composables/useDelArticle';
import { useShieldArticle } from './composables/useShieldArticle';
import { useRestoreArticle } from './composables/useRestoreArticle';
import { useCurdArticle } from './composables/useCurdArticle';
import { useGetArticleComment } from './composables/useGetArticleComment';
import { useAddComment } from './composables/comment/useAddComment';
import { useDelComment } from './composables/comment/useDelComment';
import { useCancelLike } from './composables/likes/useCancelLike'
import { useAddLike } from './composables/likes/useAddLike'
import { useAddReply } from './composables/comment/useAddReply'
import { useRouter } from 'vue-router'

const commentIsShow = ref(null)
const { delComment } = useDelComment()
const { collectArticle } = useCollectArticle()
const { cancelCollect } = useCancelCollect()
const { delArticleByAdmin } = useDelArticle()
const { shieldArticleByAdmin } = useShieldArticle()
const { restoreArticleByAdmin } = useRestoreArticle()
const { comment_content, addComment } = useAddComment()
const { comment_reply_content, addReply } = useAddReply()
const { user_detail, getUserDetail } = useGetUserDetail()
const { addLike } = useAddLike()
const { cancelLike } = useCancelLike()
const { handleAlterArticle, curdArticleOperation } = useCurdArticle()
const { pageNo, pageSize, commentList, getArticleComment, getArticleCommentCount } = useGetArticleComment()
const { loading, article_detail, getArticleDetail } = useGetArticleDetail()
const route = useRoute()
const router = useRouter()


const handleCollectChange = async (fn, article_id) => {
  await fn(article_id)
  getArticleDetail(article_id)
}

const handleLikesChange = async (fn, type, target_id) => {
  await fn(type, target_id)
  if (type.includes('comment')) {
    getArticleComment(route.query.article_id, pageNo.value, pageSize.value)
    return;
  }
  getArticleDetail(route.query.article_id)
}

// 进行评论操作
const handleReplyCommentAfter = async (comment_id, to_user_id, comment_reply_id) => {
  await addReply(comment_id, to_user_id, comment_reply_id)
  commentIsShow.value = null
  comment_reply_content.value = ''
  getArticleComment(route.query.article_id, pageNo.value, pageSize.value)
}

// 进行文章操作之后执行
const handleOperateAfter = async (article_id, fn) => {
  let fnAfter = {
    shieldArticleByAdmin: () => {
      pageNo.value = 1
      getArticleDetail(article_id)
      getArticleComment(article_id)
    },
    delArticleByAdmin: () => {
      router.push({ name: 'ArticleList' })
    }
  }
  await curdArticleOperation(article_id, fn)
  fnAfter[fn.name === 'restoreArticleByAdmin' ? 'shieldArticleByAdmin' : fn.name]()
}

// 评论\删除之后刷新评论
const handleOptCommentAfter = async (fn, id, article_id) => {
  fn.name === 'delComment' ? await fn(id) : await fn(article_id)
  getArticleComment(article_id)
}


// 点击文章作者或者评论用户跳转查看个人主页
const handleUserDetail = (user_id) => {
  router.push({
    name: 'UserDetail',
    query: {
      user_id: user_id
    }
  })
}

// 生命周期挂载时同步获取文章详情和评论
onMounted(async () => {
  await getArticleDetail(route.query.article_id)
  await getArticleComment(route.query.article_id, pageNo.value, pageSize.value)
  await getUserDetail(article_detail.value.user_id)
  // await getArticleCommentCount(route.query.article_id)
})


</script>

<style lang="scss" scoped>
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}
.mini-avatar {
  width: 30px;
  height: 30px;
}
.article-detail {
  margin-top: 20px;
  display: flex;
  align-items: cecnter;
}
.article-detail-content {
  width: 70%;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
}
.article-sidebar {
  width: 30%;
}
.article-detail-content-image {
  justify-content: start;
}
.cover_img {
  width: 80%;
  height: 100%;
}
.article-detail-comment {
  margin-top: 20px;
}
.article-detail-content-title {
  text-align: left;
  border-bottom: 1px solid #dfdede;
}
.article-detail-content-content {
  margin-top: 20px;
  flex: 1;
}
.bg {
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 15px;
}
.article-detail-user {
  display: flex;
  align-items: center;
  text-align: left;
}
.article-detail-user-avatar {
  margin: 10px 20px;
}
.article-detail-user-info-time {
  margin-top: 5px;
  font-size: 14px;
  color: #999;
}
.article-detail-content-summary {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 20px;
  background: #f8f8f8;
  text-align: left;
  color: #b3b3b3;
}
.article-detail-content-summary .summary-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
.article-detail-operate {
  display: flex;
  align-items: center;
  &-item {
    margin-right: 20px;
    &:last-child {
      margin-right: 0;
    }
  }
}
.article-detail-user-info-name {
  cursor: pointer;
}
.article-detail-user-info-name:hover {
  color: #1890ff;
}
.article-detail-operate-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  &:first-child {
    background: #e5efff;
    color: #0066ff;
    padding: 10px 10px;
    border-radius: 3px;
  }

  &:first-child:hover {
    background: #d9e8ff;
  }

  &:not(:first-child) {
    color: #aaa9a9;
  }

  &:not(:first-child):hover {
    color: #0066ff;
  }
}
.article-detail-tag {
  text-align: left;
  & > .article-detail-tag-item {
    display: inline-block;
    padding: 5px 10px 5px 10px;
    border-radius: 15px;
    margin: 10px 10px 10px 0px;
    background: #e5efff;
    color: #0066ff;
  }
}
.article-detail-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}
.el-icon {
  margin-right: 3px;
}
.comment-box {
  margin-top: 20px;
}
.article-detail-comment-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.comment-username {
  margin-left: 10px;
  color: #0066ff;
  cursor: pointer;
}
.comment-username:hover {
  color: #adceff;
}
.comment-list-item-header {
  display: flex;
  align-items: center;
}
.comment-release-time {
  text-align: right;
  width: 20%;
  color: #aaa9a9;
}
.comment-user-info {
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.comment-list-item-content {
  margin: 0px 0px 0px 40px;
  text-align: left;
}
.comment-list-item {
  font-size: 14px;
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
  padding-bottom: 10px;
}
.comment-operate {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.comment-operate-list {
  display: flex;
  align-items: center;
  margin-top: 10px;
  & > .comment-operate-item {
    margin-right: 10px;
    cursor: pointer;
    &:last-child {
      margin-right: 0;
    }
  }

  & > .comment-operate-item:hover {
    color: #0066ff;
  }
}
.rotate {
  transform: rotate(90deg);
  cursor: pointer;
}
.reply-list {
  margin-top: 10px;
}
:deep(.el-image__inner) {
  margin: 10px 0px;
}
.input-box {
  display: flex;
  align-items: center;
}
.article-detail-update {
  margin-top: 10px;
  text-align: left;
  color: #aaa9a9;
}
:deep(.el-textarea) {
  margin-right: 5px;
}
.v-note-wrapper {
  z-index: 1;
}
.user-info {
  background: #fff;
  padding: 20px;
  border-radius: 15px;
}
.user-info-header {
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  & > img {
    margin-right: 10px;
  }
}
.user,
.other-info {
  text-align: left;
}
.other-info {
  margin-top: 10px;
  font-size: 14px;
  color: #868686;
  & .other-item {
    margin-bottom: 10px;
  }
}
.user-city {
  margin-top: 5px;
  font-size: 14px;
  color: #868686;
}
.go-comment {
  color: #868686;
  text-decoration: none;
  &:hover {
    color:#1890ff;
  }
  &:visited{
    color: #868686;
  }
  &:active {
    color: #868686;
  }
}
</style>