<template>
  <div>
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search ||
            data.boardName.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="板块名称" prop="boardName" />
      <el-table-column label="介绍" prop="description" />
      <el-table-column label="优先级(数值越大优先级越高)" prop="priority" />
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
          <el-button
            type="primary"
            size="mini"
            @click="clickShowAdd"
          >添加板块</el-button>
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
      </el-table-column></el-table>
    <!-- 分页 -->
    <el-pagination
      style="text-align: center"
      background
      layout="prev, pager, next"
      :page-size="pagination.pageNum"
      :total="pagination.total"
      @current-change="handlePagination"
    />
    <!-- 修改对话表单 -->
    <el-dialog
      :append-to-body="true"
      :center="true"
      top="50"
      title="修改板块"
      :visible.sync="updateBoard.show"
    >
      <el-form :model="updateBoard">
        <el-form-item label="板块名称">
          <el-input v-model="updateBoard.boardName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="介绍">
          <el-input v-model="updateBoard.description" autocomplete="off" />
        </el-form-item>
        <el-form-item label="优先级">
          <el-input v-model="updateBoard.priority" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clickShowUpdate">取 消</el-button>
        <el-button
          type="primary"
          @click="clickShowUpdate(), subUpdateBoard()"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加板块 -->
    <el-dialog
      :append-to-body="true"
      :center="true"
      top="50"
      title="添加板块"
      :visible.sync="addBoard.show"
    >
      <el-form :model="addBoard">
        <el-form-item label="板块名称">
          <el-input v-model="addBoard.boardName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="介绍">
          <el-input v-model="addBoard.description" autocomplete="off" />
        </el-form-item>
        <el-form-item label="优先级">
          <el-input v-model="addBoard.priority" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clickShowAdd">取 消</el-button>
        <el-button
          type="primary"
          @click="clickShowAdd(), subAddBoard()"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addBoardAPI,
  deleteBoardAPI,
  getListByPage,
  updateBoardAPI
} from '@/api/bbs'
import { Message } from 'element-ui'
export default {
  name: 'BoardAdmin',
  data() {
    return {
      addBoard: {
        show: false,
        description: '',
        priority: '',
        boardName: ''
      },
      search: '',
      pagination: {
        pageNum: 9,
        currentPage: 1,
        total: 100
      },
      tableData: [],
      updateBoard: {
        show: false,
        description: '',
        priority: 1,
        boardName: '',
        _id: ''
      }
    }
  },
  created() {
    this.getBoardDateList()
  },
  methods: {
    // 处理分页
    handlePagination(currentPage) {
      this.pagination.currentPage = currentPage
      console.log(currentPage)
      this.getBoardDateList()
    }, // 处理添加板块
    clickShowAdd() {
      this.addBoard.show = !this.addBoard.show
    },
    async subAddBoard() {
      const { show, ...data } = this.addBoard
      data.priority = Number(data.priority)
      const res = await addBoardAPI(data)
      if (res.code === 0) {
        Message({
          message: res.message,
          type: 'success',
          showClose: true
        })
      }
      this.getBoardDateList()
    },
    // 处理管理员修改板块
    clickShowUpdate() {
      this.updateBoard.show = !this.updateBoard.show
    },
    handleEdit(index, row) {
      this.clickShowUpdate()
      const { description, priority, boardName, _id } = row
      Object.assign(this.updateBoard, {
        description,
        priority,
        boardName,
        _id
      })
    },
    async subUpdateBoard() {
      const { show, ...data } = this.updateBoard
      data.priority = Number(data.priority)
      const res = await updateBoardAPI(data)
      if (res.code === 0) {
        Message({
          message: res.message,
          type: 'success',
          showClose: true
        })
        this.getBoardDateList()
      }
    },
    // 处理删除板块
    async handleDelete(index, row) {
      const { _id, boardName } = row
      const res = await deleteBoardAPI({ id: _id, boardName })
      if (res.code === 0) {
        Message({
          message: res.message,
          type: 'success',
          showClose: true
        })
        this.getBoardDateList()
      }
    },
    // 获得面板信息
    async getBoardDateList() {
      const { total, ...data } = this.pagination
      const res = await getListByPage(data)
      if (res.code === 0) {
        this.tableData = res.result.data
        this.pagination.total = res.result.total
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
