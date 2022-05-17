<template>
  <div class="users">
    <el-dialog v-show="dialogFormVisible" v-model="dialogFormVisible" title="修改密码" width="300px">
      <el-form :model="form" label-position="left" style="max-width: 300px">
        <el-form-item label="用户名">
          <el-input v-model="form.user_name" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.passwd" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="setDialogVisible(false)">取消</el-button>
          <el-button type="primary" @click="setUserPasswd">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 文章数据 -->
    <!-- <div class="list-exspose">
      <div class="exspose-item" @click="handleSwitchChange('1')">
        <div class="exspose-text">
          <div class="article-num">{{ post_count }}</div>
          <div class="article-text">正常用户</div>
        </div>
        <el-icon class="iconfont">
          <user />
        </el-icon>
      </div>
      <div class="exspose-item" @click="handleSwitchChange('0')">
        <div class="exspose-text">
          <div class="article-num">{{ shield_count }}</div>
          <div class="article-text">违规用户</div>
        </div>
        <el-icon class="iconfont illegal">
          <user />
        </el-icon>
      </div>
    </div> -->

    <div class="user-list">
      <div class="users-title">用户列表</div>
      <el-table :data="user_list" v-loading="loading" @selection-change="handleSelectionChange">

        <el-table-column label="用户名">
          <template #default="scope">
            <div class="user-info" @click="handleUserDetail(scope.row.id)">
              <img class="user-avator" :src="scope.row.img" />
              <span>{{ scope.row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column property="city" label="所在地" />
        <el-table-column label="状态">
          <template #default="scope">
            <el-tag
              effect="dark"
              :type="scope.row.is_active ? '' : 'danger'"
            >{{ scope.row.is_active ? '正常' : '封禁' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-dropdown>
              <span class="el-dropdown-link">
                <el-icon>
                  <more-filled />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item ><span @click="setDialogVisible(true, scope.row.user_name)">修改密码</span></el-dropdown-item>
                  <el-dropdown-item
                    v-if="scope.row.is_active"
                    
                  ><span @click="handleUpdate(scope.row.user_name, false)">封禁</span></el-dropdown-item>
                  <el-dropdown-item v-else ><span @click="handleUpdate(scope.row.user_name, true)">解封</span></el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex;margin-top: 10px;justify-content: center;">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="100"
          :page-size="size"
          :current-page="page"
          @current-change="handleChangePage"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { MoreFilled, User } from '@element-plus/icons-vue'
import { useSetUserStatus } from './composables/useSetUserStatus';
import { useSetUserPasswd } from './composables/useSetUserPasswd';
import { useGetUserList } from './composables/lists/useGetUserList';
const router = useRouter()
const is_active = ref('1')
const { setUserStatus } = useSetUserStatus()
const { page, size, user_list, getUserList } = useGetUserList()
const { form, dialogFormVisible, setDialogVisible, setUserPasswd } = useSetUserPasswd()


const handleUserEdit = (user_name) => {
  dialogFormVisible.value = true
}

const handleChangePage = (val) => {
  page.value = val
  getUserList(is_active)
}

const handleUpdate = async (user_name, status) => {
  await setUserStatus(user_name, status)
  getUserList(is_active)
}

// 切换文章分类
const handleSwitchChange = (value) => {
  let obj = {
    '0': '封禁用户',
    '1': '正常用户',
  }
  is_active.value = value
  page.value = 1
  user_list.length = 0
  getUserList(is_active)
}

const handleUserDetail = (user_id) => {
  router.push({
    name: 'UserDetail',
    query: {
      user_id,
    },
  })
}

onMounted(() => {
  getUserList(is_active)
})
</script>

<style lang="scss" scoped>
.users {
  padding: 20px;
}
.user-list {
  background: #fff;
  border-radius: 15px;
  padding: 20px;
}
.users-title {
  text-align: left;
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 20px;
}
.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.user-info:hover {
  text-decoration: underline;
}
.user-avator {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 5px;
}
:deep(.el-dropdown-link .el-icon) {
  transform: rotate(90deg);
  cursor: pointer;
}

.list-exspose {
  display: flex;
  align-items: center;
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
  &:not(:last-child) {
    margin-right: 10px;
  }
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