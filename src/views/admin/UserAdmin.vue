<template>
  <div style="marigin-top: 1px">
    <el-table
      v-loading="listLoading"
      :data="
        list.filter(
          (data) =>
            !search ||
            data.username.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="账号" prop="username" />
      <el-table-column label="密码" prop="password" />
      <el-table-column label="昵称" prop="nickname" />
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入账号搜索">
            <el-button
              slot="append"
              size="mini"
              @click="handleSearch(scope.$index, scope.row)"
            >全局搜索</el-button>
          </el-input>
          <el-button
            class=""
            size="mini"
            @click="formAddUser.show = true"
          >添加用户</el-button>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >修改</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="fy"
      background
      layout="prev, pager, next"
      :page-size="pagination.pageNum"
      :total="total"
      @current-change="handelChangePage"
    />
    <el-dialog
      :append-to-body="true"
      :center="true"
      top="50"
      title="添加用户"
      :visible.sync="formAddUser.show"
    >
      <el-form :model="formAddUser">
        <el-form-item label="用户名">
          <el-input v-model="formAddUser.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="formAddUser.nickname" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formAddUser.password" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formAddUser.show = false">取 消</el-button>
        <el-button
          type="primary"
          @click="(formAddUser.show = false), handeAddOneUser()"
        >确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :append-to-body="true"
      :center="true"
      top="50"
      title="修改用户信息"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="formUpdate">
        <el-form-item label="_id">
          <el-input
            v-model="formUpdate._id"
            :disabled="true"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input
            v-model="formUpdate.username"
            :disabled="true"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="formUpdate.nickname" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formUpdate.password" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="(dialogFormVisible = false), handleUpdateUser()"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const useHandleUpdateUser = {
  handleEdit(index, row) {
    const { username, password, nickname, _id } = row
    this.dialogFormVisible = true
    this.formUpdate.username = username
    this.formUpdate.password = password
    this.formUpdate.nickname = nickname
    this.formUpdate._id = _id
  },
  async handleUpdateUser() {
    const res = await updateUserById(this.formUpdate)
    if (res.code === 0) {
      this.fetchData()
    }
  }
}
import {
  addUser,
  deleteUserById,
  getList,
  getListByUsername,
  updateUserById
} from '@/api/user'
import { Message } from 'element-ui'
export default {
  name: 'UseAdmin',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      search: '',
      list: [],
      listLoading: false,
      dialogFormVisible: false,
      formUpdate: {
        username: '',
        password: '',
        nickname: '',
        _id: ''
      },
      pagination: { pageNum: 9, currentPage: 1 },
      total: 0,
      formAddUser: {
        show: false,
        username: '',
        password: '',
        nickname: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handelChangePage(currentPage) {
      this.pagination.currentPage = currentPage
      console.log(this.pagination.currentPage)
      this.fetchData()
    },
    async handleSearch(index, row) {
      this.listLoading = true
      try {
        const res = await getListByUsername({ username: this.search })
        if (res.code === 0) {
          this.list = res.result.data
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.listLoading = false
      }
    },
    // 处理用户信息更新
    ...useHandleUpdateUser,
    async handeAddOneUser() {
      const { show, ...data } = this.formAddUser
      console.log(show, data)
      const res = await addUser({ ...data })
      if (res.code === 0) {
        Message({
          message: '添加成功',
          type: 'success',
          showClose: true
        })
      }
    },
    async handleDelete(index, row) {
      const res = await deleteUserById({ id: row._id })
      if (res.code === 0) {
        this.list.splice(index, 1)
      }
    },
    fetchData() {
      this.listLoading = true
      getList({ ...this.pagination }).then((response) => {
        this.list = response.result.data
        this.total = response.result.total
        this.listLoading = false
      })
    }
  }
}
</script>
<style lang="scss">
.fy {
  text-align: center;
}
</style>
