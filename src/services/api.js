import req from './request.js';
import {
  ElMessage
} from 'element-plus';
import request from './request.js';

// 登录
const login = (data) => {
  const res = req.post('/users/login', data);
  return res;
}

// 注册
const reg = (data) => {
  const res = req.post('/users/register', data);
  res.then(res => {
    ElMessage.success('注册成功');
  })
  return res;
}

// 获取文章列表
const getArticleList = (params) => {
  const res = req.authGet('/articles/page', params);
  return res;
}

// 获取文章内容
const getArticleDetail = (params) => {
  const res = req.authGet('/articles/getbyid', params);
  return res
}

// 恢复屏蔽文章
const restoreArticleById = (data) => {
  const res = req.authPost('/articles/restore', data);
  return res;
}

// 屏蔽文章
const shieldArticleById = (data) => {
  const res = req.authDelete('/articles/shield', data);
  return res;
}

// 管理员发表文章
const releaseArticleByAdmin = (data) => {
  const res = req.authPost('/articles/create', data);
  return res;
}

// 更新文章内容
const alterArticleById = (data) => {
  const res = req.authPatch('/articles/update', data);
  return res;
}

// 文章获取评论
const getArticleCommentByAdmin = (params) => {
  const res = req.authGet('/comment/queryCommentByArticleId', params);
  return res;
}

// 获取评论数量
const getArticleCommentCountByAdmin = (params) => {
  const res = req.authGet('/comment/queryCommentCountByArticleId', params);
  return res;
}

// 发布评论
const releaseComment = (data) => {
  const res = req.authPost('/comment/createComment', data)
  return res;
}

// 删除文章评论
const delArticleCommentByAdmin = (data) => {
  const res = req.authDelete('/comment/deleteComment', data);
  return res;
}

// 删除文章
const deleteArticleById = (data) => {
  const res = req.authDelete('/articles/delete', data);
  return res;
}

// 获取文章总数
const getArticleCountByAdmin = (params) => {
  const res = req.authGet('/articles/count', params);
  return res;
}

// 审核文章
const auditArticleByAdmin = (data) => {
  const res = req.authPost('/articles/review', data);
  return res
}

// 发布文章头图上传
const uploadArticleImg = (data) => {
  const res = req.authPost('/articles/uploads', data);
  return res;
}

// 获取所有分区
const getArticlePartitionByAdmin = () => {
  const res = req.authGet('/partition/queryAllPartition');
  return res;
}

// 创建新分区
const createArticlePartitionByAdmin = (data) => {
  const res = req.authPost('/partition/insertPartition', data);
  return res;
}

// 删除分区
const delArticlePartitionByAdmin = (data) => {
  const res = req.authDelete('/partition/deletePartition', data);
  return res;
}

// 搜索用户
const searchArticleList = (params) => {
  const res = req.authGet('/search/byword', params);
  return res;
}

// 针对用户权限
const userBlockByAdmin = (data) => {
  const res = req.authPost('/users/blockadeornot', data);
  return res;
}

// 上传头像
const userAvatarUpload = (data) => {
  const res = req.authPost('/users/upload', data);
  return res;
}

// 修改用户密码
const setUserPasswdByAdmin = (data) => {
  const res = req.authPost('/users/reset', data);
  return res;
}

// 模糊搜索用户名
const searchUserByName = (params) => {
  const res = req.authGet('/search/byname', params);
  return res;
}

// 查询用户详细信息
const getUserDetailByAdmin = (params) => {
  const res = req.authGet('/users/searchbyid', params);
  return res;
}

// 获取用户所发布文章
const getUserReleaseArticle = (params) => {
  const res = req.authGet('/search/byuser', params);
  return res;
}

// 更新用户token
const updateToken = (params) => {
  const res = req.authGet('/users/updatetoken', params);
  return res;
}

// 修改用户信息
const updateUserInfo = (data) => {
  const res = req.authPatch('/users/change', data)
  return res;
}

// 查询用户关注
const getUserFollows = (params) => {
  const res = req.authGet('/follows/findfollow', params);
  return res;
} 

// 取消关注
const cancelFollow = (data) => {
  const res = req.authPost('/follows/delfollow', data);
  return res;
}
// 添加关注
const addFollow = (data) => {
  const res = req.authPost('/follows/addfollow', data);
  return res;
}

// 获取热帖前十
const getArticleRank = () => {
  const res = req.authGet('/search/post_rank')
  return res;
}

// 获取用户前十
const getUserRank = () => {
  const res = req.authGet('/search/user_rank')
  return res;
}

//获取各状态文章数
const getTotalArticle = () => {
  const res = req.authGet('/search/status_count')
  return res;
}

// 分页获取用户信息
const getUserList = (params) => {
  const res = req.authGet('/users/active', params)
  return res;
}

// 文章点赞
const addLikes = (data) => {
  const res = req.authPost('/likes/add', data)
  return res;
}

// 文章取消点赞
const cancelLikes = (data) => {
  const res = req.authDelete('/likes/delete', data)
  return res;
}

// 评论回复
const replyComment = (data) => {
  const res = req.authPost('/commentReply/insertCommentReply', data)
  return res;
}

// 上传分区图片
const uploadPartitionImg = (data) => {
  const res = req.authPost('/partition/uploadIcon', data);
  return res;
}

// 修改分区信息
const uploadPartition = (data) => {
  const res = req.authPatch('/partition/updatePartitionById', data);
  return res;
}

// 获取在线用户
const getOnlineUser = () => {
  const res = req.authGet('/ws/getAllOnlineUser')
  return res;
}

// 删除文章到回收站
const delArticleList = (data) => {
  const res = req.authDelete('/articles/delete/list', data);
  return res;
}

// 清除回收站文章
const delCleanArticleList = (data) => {
  const res = req.authDelete('/articles/clear/list', data);
  return res;
}

//收藏
const collectArticle = (data) => {
  const res = req.authPost('/collections/add', data)
  return res;
} 

//取消收藏
const cancelCollectArticle = (data) => {
  const res = req.authDelete('/collections/cancel', data)
  return res;
} 

// 获取自己的收藏列表
const getSelfCollection = () => {
  const res = req.authGet('/collections/getlist')
  return res;
}

// 获取用户粉丝列表
const getUserAllFans = (params) => {
  const res = req.authGet('/follows/allfollow', params)
  return res;
}

// 获取用户点赞数
const getLikesCount = (params) => {
  const res = req.authGet('/likes/count', params)
  return res;
}

export default {
  login,
  reg,
  getLikesCount,
  getUserAllFans,
  collectArticle,
  cancelCollectArticle,
  getSelfCollection,
  getOnlineUser,
  addLikes,
  cancelLikes,
  replyComment,
  delArticleList,
  delCleanArticleList,
  getTotalArticle,
  getArticleRank,
  getUserRank,
  getUserList,
  updateToken,
  uploadPartition,
  userBlockByAdmin,
  userAvatarUpload,
  searchUserByName,
  updateUserInfo,
  getUserFollows,
  cancelFollow,
  addFollow,
  uploadPartitionImg,
  setUserPasswdByAdmin,
  getUserDetailByAdmin,
  getUserReleaseArticle,
  auditArticleByAdmin,
  getArticleList,
  getArticleDetail,
  uploadArticleImg,
  shieldArticleById,
  restoreArticleById,
  searchArticleList,
  releaseArticleByAdmin,
  alterArticleById,
  deleteArticleById,
  releaseComment,
  getArticleCountByAdmin,
  getArticleCommentByAdmin,
  getArticleCommentCountByAdmin,
  delArticleCommentByAdmin,
  getArticlePartitionByAdmin,
  delArticlePartitionByAdmin,
  createArticlePartitionByAdmin,
}