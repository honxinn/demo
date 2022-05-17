<template>
  <div class="user">
    <!-- {{$route.query}} -->
    <div class="user-box">
      <div class="user-left">
        <div class="user-detail">
          <div class="detail-left">
            <div class="detail-avatar">
              <img
                v-if="user_detail.value.id != store.userInfo.user.id"
                :src="user_detail.value.img"
                class="avatar"
                alt
              />
              <el-upload
                v-else
                class="avatar-uploader preview"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :http-request="uploadAvatar"
              >
                <img :src="user_detail.value.img" class="avatar" />
              </el-upload>
            </div>
            <div class="detail-name">
              <span>{{ user_detail.value.name }}</span>
            </div>

            <div class="detail-account">
              <span
                style="color: #8b8b8b;font-size: 14px; font-weight: normal;"
              >{{ user_detail.value.user_name }}</span>
            </div>
            <div class="detail-num">
              <div class="detail-num-item" @click="getUserFollow(user_detail.value.id)">
                <div class="num-bold">{{ user_detail.follows_cnt }}</div>
                <div class="num-light">关注数</div>
              </div>
              <div class="detail-num-item"  @click="handelShowFans(true)">
                <div class="num-bold">{{ user_detail.befollowed_cnt }}</div>
                <div class="num-light">粉丝数</div>
              </div>
              <div class="detail-num-item">
                <div class="num-bold">{{ likeTotal }}</div>
                <div class="num-light">收到的赞</div>
              </div>
              <div class="detail-num-item" @click="handelShowHide(true)" v-if="user_detail.value.id === store.userInfo.user.id">
                <div class="num-bold">{{ selfCollect.length }}</div>
                <div class="num-light">收藏文章</div>
              </div>
            </div>
            <div class="detail-operate" v-if="user_detail.value.id === store.userInfo.user.id">
              <el-button style="width:100%" color="#626aef" plain @click="isEdit.value = true">编辑资料</el-button>
            </div>
            <div class="detail-operate" v-else>
              <el-row>
                <el-col :span="12">
                  <el-button
                    color="#626aef"
                    style="color: white"
                    v-if="!user_detail.value.isfollow"
                    @click="handleGetNewData(addFollow, user_detail.value.id)"
                  >关注</el-button>
                  <el-button
                    color="#626aef"
                    plain
                    v-else
                    @click="handleGetNewData(cancelFollow, user_detail.value.id)"
                  >取关</el-button>
                </el-col>
                <el-col :span="12">
                  <el-button color="#f56c6c" plain v-if="user_detail.value.is_active" @click="setUserStatus(user_detail.value.user_name, false)">封禁</el-button>
                  <el-button color="#626aef" plain v-else @click="setUserStatus(user_detail.value.user_name, true)">解封</el-button>
                </el-col>
              </el-row>
              <el-row></el-row>
            </div>
          </div>
          <div class="detail-right" v-if="isEdit.value">
            <el-form
              label-position="right"
              label-width="100px"
              :model="user_copy"
              style="max-width: 460px"
            >
              <el-form-item label="昵称">
                <el-input v-model="user_copy.name"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="user_copy.sex">
                  <el-radio label="男">男</el-radio>
                  <el-radio label="女">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="城市">
                <el-select v-model="user_copy.city" class="m-2" placeholder="请选择所在地">
                  <el-option
                    v-for="item in provinceFilter"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="alterUserInfo(user_copy, user_detail, isEdit)"
                >确认修改</el-button>
                <el-button @click="isEdit.value = false">返回</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="detail-right" v-else>
            <div class="detail-item">
              <div class="item-title">
                <span class="item-name">性别</span>
              </div>
              <div class="item-content">
                <span>{{ user_detail.value.sex }}</span>
              </div>
            </div>
            <div class="detail-item">
              <div class="item-title">
                <span class="item-name">城市</span>
              </div>
              <div class="item-content">
                <span>{{ user_detail.value.city }}</span>
              </div>
            </div>
            <div class="detail-item">
              <div class="item-title">
                <span class="item-name">状态</span>
              </div>
              <div class="item-content">
                <span>{{ user_detail.value.is_active ? '正常' : '封禁中' }}</span>
              </div>
            </div>
            <div class="detail-item">
              <div class="item-title">
                <span class="item-name">身份</span>
              </div>
              <div class="item-content">
                <span>{{ user_detail.value.is_admin ? '管理员' : '普通用户' }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="user-process">
          <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="文章" name="article">
              <ul ref="articleScroll" class="article-box" style="overflow: auto">
                <li class="article-item" v-for="item in resultList" :key="item.id">
                  <div class="article-user">
                    <div class="user-avatar">
                      <img class="avatar" :src="item.avator" alt />
                    </div>
                    <div class="user-name">
                      <div class="artilce-author">{{ user_detail.value.name }}</div>
                      <div
                        class="article-time"
                      >{{ moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss') }}</div>
                    </div>
                  </div>
                  <div class="article-main" @click="handleGoArticleDetail(item.id)">
                    <div class="article-left">
                      <div class="article-title">{{ item?.title }}</div>
                      <div class="article-content">{{ item.summary }}</div>
                    </div>

                    <img v-if="item.cover_url" class="article-img" :src="item.cover_url" alt />
                  </div>
                  <div class="article-operation">
                    <div class="article-operate-item">
                      <span class="operation-num">{{ item.likes }}</span>
                      <span class="operation-name">喜欢</span>
                    </div>
                    <div class="article-operate-item">
                      <span class="operation-num">{{ item.comments }}</span>
                      <span class="operation-name">评论</span>
                    </div>
                    <div class="article-operate-item">
                      <span class="operation-num">{{ item.visits }}</span>
                      <span class="operation-name">浏览</span>
                    </div>
                  </div>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="评论" name="comment">
              <ul ref="commentScroll" class="article-box comments" style="overflow: auto">
                <li class="article-item" v-for="item in resultList" :key="item.id">
                  <div class="article-user">
                    <div class="user-avatar">
                      <img class="avatar" :src="user_detail.value.img" alt />
                    </div>
                    <div class="user-name">
                      <div class="artilce-author">{{ user_detail.value.name }}</div>
                      <div
                        class="article-time"
                      >{{ moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss') }}</div>
                    </div>
                  </div>
                  <div class="article-comment">{{ item.comment_content }}</div>
                  <div class="article-main" @click="handleGoArticleDetail(item.id)">
                    <div class="article-title">
                      <span
                        class="author-name"
                        @click.stop="handleUserDetail(item.article.user_id)"
                      >{{ item.article?.name }}:</span>
                      <span></span>
                      {{ item.article?.title }}
                    </div>
                  </div>
                  <div class="article-operation">
                    <div class="article-operate-item">
                      <span class="operation-num">{{ item.article?.likes }}</span>
                      <span class="operation-name">喜欢</span>
                    </div>
                    <div class="article-operate-item">
                      <span class="operation-num">{{ item.article?.comments }}</span>
                      <span class="operation-name">评论</span>
                    </div>
                    <div class="article-operate-item">
                      <span class="operation-num">{{ item.article?.visits }}</span>
                      <span class="operation-name">浏览</span>
                    </div>
                  </div>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="点赞" name="like">
              <ul ref="likeScroll" class="article-box likes" style="overflow: auto">
                <li class="article-item" v-for="item in resultList" :key="item.article_id">
                  <div class="article-user">
                    <div class="user-avatar">
                      <img class="avatar" :src="user_detail.value.img" alt />
                    </div>
                    <div class="user-name">
                      <div class="artilce-author">{{ user_detail.value.name }}</div>
                      <div
                        class="article-time"
                      >{{ moment(item.releaseAt).format('YYYY-MM-DD HH:mm:ss') }}</div>
                    </div>
                  </div>
                  <div class="article-comment">赞了这篇文章</div>
                  <div class="article-main">
                    <div class="article-title" @click="handleGoArticleDetail(item.article_id)">
                      <span
                        class="title-author"
                        @click.stop="handleUserDetail(item.author_id)"
                      >{{ item.author_name }}:</span>
                      <span class="title-name">{{ item.title }}</span>
                    </div>
                  </div>
                  <div class="article-operation">
                    <div class="article-operate-item">
                      <span class="operation-num">{{ item.likes }}</span>
                      <span class="operation-name">喜欢</span>
                    </div>
                    <div class="article-operate-item">
                      <span class="operation-num">{{ item.comments }}</span>
                      <span class="operation-name">评论</span>
                    </div>
                    <div class="article-operate-item">
                      <span class="operation-num">{{ item.visits }}</span>
                      <span class="operation-name">浏览</span>
                    </div>
                  </div>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="user-right">
        <div class="hot-article"></div>
      </div>
    </div>

    <el-dialog v-model="dialogVisible" :title="user_detail.value.name + '的关注列表'" width="30%" center>
      <ul v-if="user_follows.length">
        <li class="follow-item" v-for="item in user_follows">
          <div class="follow-user">
            <img class="avatar" :src="item.follow_pic" alt />
            <div class="follow-name" @click="handleUserDetail(item.follow_id)">{{ item.follow_name }}</div>
          </div>
          <el-button
            v-if="user_detail.value.id == store.userInfo.user.id"
            color="#626aef"
            plain
            @click="handleGetNewData(cancelFollow, item.follow_id)"
          >取关</el-button>
        </li>
      </ul>
      <div v-else style="text-align: center;">暂无关注哦~</div>
    </el-dialog>

    <el-dialog
      v-model="collectVisibal"
      :title="user_detail.value.name + '的收藏列表'"
      width="30%"
      center
    >
      <ul v-if="selfCollect.length">
        <li class="article-item" v-for="item in selfCollect" :key="item.id">
          <div class="article-user">
            <div class="user-avatar">
              <img  @click="handleUserDetail(item.articleInfo.user_id)" class="avatar" :src="item.articleInfo.avator" alt />
            </div>
            <div class="user-name">
              <div class="artilce-author" style="cursor:pointer" @click="handleUserDetail(item.articleInfo.user_id)">{{ item.articleInfo.name }}</div>
              <div class="article-time">{{ moment(item.articleInfo.createdAt).format('YYYY-MM-DD HH:mm:ss') }}</div>
            </div>
          </div>
          <div class="article-main" @click="handleGoArticleDetail(item.articleInfo.id)">
            <div class="article-left">
              <div class="article-title">{{ item.articleInfo?.title }}</div>
              <div class="article-content">{{ item.articleInfo.summary }}</div>
            </div>

            <img v-if="item.articleInfo.cover_url" class="article-img" :src="item.articleInfo.cover_url" alt />
          </div>
          <div class="article-operation">
            <div class="article-operate-item">
              <span class="operation-num">{{ item.articleInfo.likes }}</span>
              <span class="operation-name">喜欢</span>
            </div>
            <div class="article-operate-item">
              <span class="operation-num">{{ item.articleInfo.comments }}</span>
              <span class="operation-name">评论</span>
            </div>
            <div class="article-operate-item">
              <span class="operation-num">{{ item.articleInfo.visits }}</span>
              <span class="operation-name">浏览</span>
            </div>
            <div class="article-operate-item cancel" @click="handleGetNewData(cancelCollect, user_detail.value.id)">
              <span class="operation-name">取消收藏</span>
            </div>
          </div>
        </li>
      </ul>
      <div v-else style="text-align: center;">暂无收藏哦~</div>
    </el-dialog>

     <el-dialog v-model="fansVisibal" :title="user_detail.value.name + '的粉丝列表'" width="30%" center>
      <ul v-if="fansList.length">
        <li class="follow-item" v-for="item in fansList">
          <div class="follow-user">
            <img style="cursor: pointer;" class="avatar" :src="item.img" @click="handleUserDetail(item.id)" alt />
            <div style="cursor: pointer;" class="follow-name" @click="handleUserDetail(item.id)">{{ item.name }}</div>
          </div>
        </li>
      </ul>
      <div v-else style="text-align: center;">暂无粉丝~</div>
    </el-dialog>
  </div>
</template>

<script setup>
import _ from 'lodash';
import { ref, reactive, onMounted, watch } from 'vue'
import moment from 'moment'
import { useStore } from '@/store/'
import { provinceFilter } from './province'
import { useRouter, useRoute } from 'vue-router'
import { beforeAvatarUpload } from '@/utils/index'
import { useGetUserFans} from './composables/fans/useGetUserFans'
import { useAlterUserInfo } from './composables/useAlterUserInfo'
import { useGetUserRelease } from './composables/useGetUserRelease'
import { useGetUserDetail } from './composables/useGetUserDetail'
import { useUploadAvatar } from './composables/useUploadAvatar'
import { useGetUserFollows } from './composables/useGetUserFollows'
import { useAddFollow } from './composables/follow/useAddFollow'
import { useCancelFollow } from './composables/follow/useCancelFollow'
import { useGetSelfCollect } from './composables/collect/useGetSelfCollect';
import { useCancelCollect } from '../article/composables/collect/useCancelCollect';
import { useGetUserLikes } from './composables/likes/useGetUserLikes'
import { useSetUserStatus} from './composables/useSetUserStatus'

const store = useStore()
const route = useRoute()
const router = useRouter()
const { setUserStatus} = useSetUserStatus()
const { likeTotal, getLikesCount} = useGetUserLikes()
const { cancelCollect} = useCancelCollect()
const isEdit = reactive({ value: false })
const { fansVisibal, fansList, getUserAllFans } = useGetUserFans()
const { collectVisibal, selfCollect, getSelfCollect } = useGetSelfCollect()
const activeName = ref('article')
const user_copy = reactive({ name: '', sex: '', city: '' })
const articleScroll = ref(null)
const commentScroll = ref(null)
const likeScroll = ref(null)
const isReachBottom = ref(false)

const { addFollow } = useAddFollow()
const { cancelFollow } = useCancelFollow()
const { alterUserInfo } = useAlterUserInfo()
const { dialogVisible, user_follows, getUserFollow } = useGetUserFollows()
const { user_id, page, type, total, page_num, resultList, load, getUserReleases } = useGetUserRelease()
const { user_detail, getUserDetail } = useGetUserDetail()
const { uploadAvatar } = useUploadAvatar(user_detail, user_id, page, type, total, page_num, resultList, activeName, getUserReleases)


const handleGetNewData = async (fn, id) => {
  await fn(id)
  getUserDetail(user_detail.value.id)
  dialogVisible.value && getUserFollow(user_detail.value.id)
  collectVisibal.value && getSelfCollect(user_detail.value.id)
}

const handelShowFans = async (value) => {
  await getUserAllFans(user_detail.value.id)
  fansVisibal.value = value
}

const handelShowHide = (value) => {
  collectVisibal.value = value
}

const handleScroll = (scrollContainer) => {
  let scrollTop = scrollContainer.value.scrollTop
  let currentHeight = scrollTop + Math.ceil(scrollContainer.value.getBoundingClientRect().height)
  let scrollHeight = scrollContainer.value.scrollHeight - 50
  if (page.value + 1 > page_num.value) {
    isReachBottom.value = true
  }
  if (isReachBottom.value) return
  if (currentHeight >= scrollHeight) {
    load()
  }
}

const handleUserDetail = (user_id) => {
  collectVisibal.value = false
  dialogVisible.value = false
  fansVisibal.value = false
  router.push({
    name: 'UserDetail',
    query: {
      user_id,
    },
  })
}

const handleClick = (val) => {
  type.value = val.props.name
  page.value = 1
  resultList.length = 0
  isReachBottom.value = false
  getUserReleases()
}

const handleGoArticleDetail = (article_id) => {
  router.push({
    name: 'ArticleDetail',
    query: {
      article_id: article_id
    }
  })
}
watch(() => route.query.user_id, (val) => {
  if (!val) return;
  user_id.value = val
  page.value = 1
  resultList.length = 0
  type.value = activeName.value = 'article'
  isReachBottom.value = false
  getUserDetail(route.query.user_id)
  getUserReleases()
  getLikesCount(route.query.user_id)
})


onMounted(async () => {
  user_id.value = route.query.user_id
  await getUserDetail(route.query.user_id)
  getLikesCount(route.query.user_id)
  getSelfCollect()
  getUserReleases()
  user_copy.name = user_detail.value.name
  user_copy.sex = user_detail.value.sex
  user_copy.city = user_detail.value.city
  articleScroll.value.onscroll = _.debounce(() => handleScroll(articleScroll), 300)
  commentScroll.value.onscroll = _.debounce(() => handleScroll(commentScroll), 300)
  likeScroll.value.onscroll = _.debounce(() => handleScroll(likeScroll), 300)
})
</script>

<style lang="scss" scoped>
.user {
  margin-top: 20px;
}
.user-box {
  display: flex;
  align-items: center;
}
.user-left {
  width: 70%;
}
.user-right {
  width: 30%;
}
.user-detail {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 10px;
}
.user-process {
  padding: 20px;
  margin-top: 10px;
  background: #fff;
  border-radius: 10px;
}
.detail-left,
.detail-right {
  padding: 20px;
}
.detail-left {
  width: 30%;
}
.detail-right {
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  border-left: 5px solid #f5f5f5;
}
.detail-avatar {
  margin-top: 20px;
  & > img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
}
.detail-name {
  font-size: 18px;
  font-weight: bold;
}
.detail-account {
  font-size: 12px;
  color: #a5a4a4;
  margin-top: 10px;
}
.detail-num {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
}
.detail-num-item {
  width: 45%;
  &:nth-child(odd) {
    margin-right: 10px;
  }
}
.detail-num-item:not(:nth-child(3)) {
  cursor: pointer;
  &:hover {
    color: #1890ff;
  }
}

.detail-num-item:nth-child(odd) {
  border-right: 3px solid #ebe9e9;
  margin-bottom: 10px;
}
.num-bold {
  font-size: 20px;
  font-weight: bold;
}
.num-light {
  color: #a5a4a4;
  font-size: 12px;
}
.detail-item {
  width: 20%;
  padding: 20px;
  text-align: left;
  border-bottom: 1px solid #f1f0f0;
}
.item-name {
  display: inline-block;
  color: #949ea7;
  margin: 10px 0px;
}

:deep(.el-tabs__content) {
  background: #eff1f7;
}
.author-name {
  font-weight: bold;
  margin-right: 5px;
}
.author-name:hover {
  color: #2d8cf0;
  text-decoration: underline;
}
.article-item {
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  background: #fff;
  list-style: none;
}
.article-title {
  font-size: 20px;
  font-weight: bold;
  text-align: left;
}
.article-user {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.user-avatar img {
  margin-right: 10px;
}

.user-name {
  text-align: left;
}
.artilce-author {
  font-size: 16px;
  font-weight: bold;
}
.article-time {
  font-size: 12px;
  color: #a5a4a4;
}
.article-box {
  padding-inline-start: 0px;
  height: 500px;
  margin: 0;
  margin-bottom: 10px;
  padding: 0;
}
.article-content {
  color: #a5a4a4;
  margin-top: 5px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.article-operation {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.article-operate-item {
  display: flex;
  align-items: center;
  margin: 0 10px;
  color: #949ea7;
  font-size: 14px;
}
.article-main {
  cursor: pointer;
  padding: 10px;
  transition: all 0.5s ease;
  display: flex;
  align-items: center;
}
.article-left {
  flex: 1;
}
.article-img {
  width: 100px;
  height: 100px;
}
.article-main:hover {
  background: #f5f5f5;
  border-radius: 10px;
}
.comments .article-main,
.likes .article-main {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
}
.comments .article-title,
.likes .article-title {
  font-weight: normal;
  font-size: 14px;
}
.article-comment {
  text-align: left;
  margin: 5px 0px;
}
.title-author {
  font-weight: bold;
  margin-right: 10px;
  &:hover {
    color: #2d8cf0;
  }
}
.title-name {
  color: #a5a4a4;
  &:hover {
    text-decoration: underline;
    color: #2d8cf0;
  }
}
:deep(.el-upload:hover) {
  position: relative;
  &::after {
    content: "+";
    position: absolute;
    top: 0;
    bottom: 3px;
    left: 0;
    right: 0;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
  }
}
.follow-item {
  display: flex;
  align-items: center;
  margin: 10px 10px;
  color: #949ea7;
  font-size: 14px;
}
.follow-user {
  display: flex;
  align-items: center;
  flex: 1;
  & > img {
    margin-right: 5px;
  }
}
.detail-operate {
  margin-top: 10px;
}
.cancel {
    cursor: pointer;
    &:hover {
      color:#1890ff;
    }
}
</style>