<template>
  <div class="board-view-wrapper">
    <div class="view-column">
      <el-row
        type="flex"
        justify="start"
        align="middle"
        class="column-title"
      >
        <el-col :span="5"> #{{ board.boardName }} </el-col>
        <el-col :span="4">
          <el-button
            class="block"
            type="danger"
            size="mini"
            icon="el-icon-edit"
            @click="handleAddPostClick"
          >发帖</el-button>
        </el-col>
      </el-row>
      <el-row class="column-description">
        <el-col :span="24">
          话题介绍:
          <span class="description-content">{{
            board.description
          }}</span>
        </el-col>
      </el-row>
    </div>
    <div class="view-content">
      <el-row
        type="flex"
        justify="space-between"
        class="content-header"
      >
        <el-col :span="10">标题</el-col>
        <el-col :span="3">作者</el-col>
        <el-col :span="3">时间</el-col>
        <el-col
          v-if="isAdmin"
          :span="4"
          class="text-center"
        >操作</el-col>
      </el-row>
      <el-divider class="header-divider" />
      <div class="itemlist_wrapper">
        <div
          v-for="item in postList"
          :key="item._id"
          class="item_wrapper"
        >
          <el-row
            type="flex"
            justify="space-between"
            class="content-post post-item"
          >
            <el-col :span="10" class="ellipsis post_title" style="">
              <router-link
                :to="`/bbs/post/${item._id}`"
              ><span>{{ item.title }}</span></router-link>
            </el-col>
            <el-col
              class="fs-12"
              :span="true ? 3 : 6"
              style="color: #1d8fc3"
            ><router-link :to="`/bbs/user/${item.User._id}`">{{
              item.User.nickname
            }}</router-link>
            </el-col>
            <el-col
              style="color: #9599b4"
              class="fs-12"
              :span="true ? 3 : 6"
            >{{ item.lastDate }}
            </el-col>
            <el-col v-if="isAdmin" :span="4" class="text-center">
              <el-button-group>
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-edit"
                  @click="handleUpdatePost(item)"
                />
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-delete"
                  @click="handleDeletePost(item._id)"
                />
              </el-button-group>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>

    <BasePagination
      :pagination="pagination"
      @current-change="handlePagination"
    />
    <el-row>
      <el-col class="foot_placeholder" :span="24" />
    </el-row>
    <el-dialog
      :center="true"
      top="50"
      title="发帖"
      :visible.sync="AddPost.show"
    >
      <el-form :model="PostItem">
        <el-form-item label="帖子名称">
          <el-input v-model="PostItem.title" autocomplete="off" />
        </el-form-item>

        <el-form-item label="内容">
          <el-input
            v-model="PostItem.description"
            type="textarea"
            :rows="3"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleAddPostClick">取 消</el-button>
        <el-button
          type="primary"
          @click="handleAddPostClick(), subAddPost()"
        >确 定</el-button>
      </div>
    </el-dialog>

    <BoardViewUpdateDialog
      :update-item="updateItem"
      :show-update-post="showUpdatePost"
      @close="showUpdatePost = false"
      @updatePostOk="getPostList"
    />
  </div>
</template>

<script>
import {
  addPostAPI,
  deletePostAPI,
  getBoardInfoAPI,
  getPostList
} from '@/api/bbs'
import { mapGetters } from 'vuex'
import BasePagination from '@/components/BasePagination'
import BoardViewUpdateDialog from './BoardViewUpdateDialog'
import { Message } from 'element-ui'
export default {
  name: 'BoardView',
  components: { BasePagination, BoardViewUpdateDialog },
  data() {
    return {
      board: { boardName: '', description: '' },
      postList: [],
      // 处理分页
      pagination: { pageNum: 10, total: 10, currentPage: 1 },
      // 处理修改
      updateItem: {},
      showUpdatePost: false,
      // 发帖
      AddPost: {
        show: false
      },
      PostItem: {
        boardId: this.$route.params.id,
        title: '',
        description: ''
      }
    }
  },
  computed: {
    ...mapGetters(['isAdmin'])
  },
  created() {
    this.getBoardInfo()
    this.getPostList()
  },
  methods: {
    // 处理修改
    handleUpdatePost(item) {
      this.updateItem = item
      this.showUpdatePost = true
    },
    // 处理分页
    handlePagination(currentPage) {
      this.pagination.currentPage = currentPage
      this.getPostList()
    },
    // 获得初始数据
    async getBoardInfo() {
      const _id = this.$route.params.id
      const res = await getBoardInfoAPI({ _id })
      if (res.code === 0) {
        this.board = res.result.data
      }
    },
    async getPostList() {
      const _id = this.$route.params.id
      const res = await getPostList({
        _id,
        pageNum: this.pagination.pageNum,
        currentPage: this.pagination.currentPage
      })
      if (res.code === 0) {
        const data = res.result.data
        this.pagination.total = res.result.total
        this.postList = data
      }
    },
    // 处理删除
    async handleDeletePost(_id) {
      const res = await deletePostAPI({ _id })
      if (res.code === 0) {
        Message({ message: '删除成功', type: 'success' })
        this.getPostList()
      }
    },
    // 处理发帖
    handleAddPostClick() {
      this.AddPost.show = !this.AddPost.show
    },
    async subAddPost() {
      const res = await addPostAPI(this.PostItem)
      if (res.code === 0) {
        Message({ message: '发帖成功', type: 'success' })
        this.getPostList()
      }
    },
    // 处理信息存储
    async handleClickToPost(item) {
      await this.$store.commit('bbs/UPDATE_CURRENT_POST', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.board-view-wrapper {
  overflow-y: scroll;
  position: absolute;
  padding: 0 18px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f9f9f9;
}
.view-column {
  margin-top: 20px;
  padding: 20px 20px;
  background-color: #fff;
}
.column-title {
  display: flex;
  text-align: left;
  line-height: 35px;
  font-weight: bold;
  font-size: 20px;
}
.content-header {
  padding: 12px 0;
  line-height: 20px;
  margin-top: 20px;
}
.el-divider {
  margin: 0;
}
.text-center {
  text-align: center;
}
.fs-12 {
  font-size: 12px;
}
.column-description {
  margin-top: 30px;
}
.content-post {
  line-height: 35px;
}
.post-item {
  padding: 12px 0;
  line-height: 25px;
  border-bottom: 1px solid #dbdfe6;
}
.post_title {
  font-size: 14px;
  :hover {
    color: #e00042;
  }
}
.item_wrapper {
  :hover {
    background-color: #f1f1f1;
  }
}
.foot_placeholder {
  height: 50px;
}
.block {
  display: inline-block;
}
</style>
