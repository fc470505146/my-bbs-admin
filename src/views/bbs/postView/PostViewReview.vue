<template>
  <div class="post-review-wrapper">
    <!-- 全部评论 -->
    <div class="review-list">
      <div class="list-title">
        <span class="title">全部回帖</span>
      </div>
      <div
        v-for="item in reviewListCurrent"
        :key="item._id"
        class="review-item"
      >
        <!-- 评论的用户头像 -->
        <el-avatar
          :size="40"
          :src="`http://localhost:8081${item.User.avatar}`"
        />
        <div class="item-content">
          <!--评论的用户信息  -->
          <div class="item-heard">
            <span class="heard-nickname">
              <router-link :to="`/bbs/user/${item.User._id}`">
                {{
                  item.User.nickname
                }}</router-link>
            </span>
            <span class="heard-date">{{ item.createTime }}</span>
          </div>
          <!-- 评论的内容 -->
          <div class="item-content">
            <!-- 引用的评论 -->
            <div v-if="item.quoteId !== '0'" class="review-quote">
              <div class="quote-user">
                引用@<span class="quote-nickname">
                  <router-link :to="`/bbs/user/${item.quote.User._id}`">{{
                    item.quote.User.nickname
                  }}</router-link>
                </span>发表的发表的:
              </div>
              <el-row>
                <el-col :span="18">
                  {{ item.quote.content }}
                </el-col>
              </el-row>
            </div>
            <!-- 该用户的评论 -->
            <el-row>
              <el-col :span="18">
                {{ item.content }}
              </el-col>
              <el-col
                v-if="isAdmin"
                :span="6"
                style="text-align: center"
              >
                <!-- 管理面板 -->
                <el-button-group>
                  <el-button
                    type="danger"
                    size="mini"
                    icon="el-icon-edit"
                    @click="handleClickUpdateReview(item)"
                  >修改</el-button>
                  <el-button
                    type="danger"
                    size="mini"
                    icon="el-icon-delete"
                    @click="handleDeleteReview(item._id)"
                  >删除
                  </el-button>
                </el-button-group>
              </el-col>
            </el-row>
          </div>
          <!-- 评论相关按钮 -->
          <div class="item-button">
            <span :class="{'button-light':true,red:item.isLight}" @click="handleLike(item)">
              <span
                style="margin-right: 0"
                class="el-icon-s-opportunity"
              />
              亮了({{ item.like }})</span>

            <span
              class="button-reply el-icon-connection"
              @click="handleClickFocus(item._id, item)"
            >回复</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <base-pagination
      :pagination="pagination"
      @current-change="handlePagination"
    />
    <!-- 回复框 -->
    <div class="reply-content">
      <!-- 引用的评论 -->
      <div class="reply-quote">
        <div class="quote-title">Re:{{ currentPost.title }}</div>
        <div v-if="reviewItem.quoteId" class="review-quote">
          <div class="quote-user">
            引用@<span class="quote-nickname">{{
              quoteItem.User.nickname
            }}</span>发表的发表的:
          </div>
          <el-row>
            <el-col :span="18">
              {{ quoteItem.content }}
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="reply-input">
        <el-input
          ref="reply"
          v-model="reviewItem.content"
          style="margin-top: 10px"
          :autosize="{ minRows: 3, maxRows: 5 }"
          type="textarea"
          placeholder="留下你的评论"
          @blur="$emit('focus')"
        />
      </div>
      <div class="reply-button">
        <el-button type="danger" @click="addReview">回复</el-button>
      </div>
    </div>
    <el-dialog :center="true" title="修改评论" :visible.sync="show">
      <el-form :model="updateReview">
        <el-form-item label="内容">
          <el-input
            v-model="updateReview.content"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clickShowUpdate">取 消</el-button>
        <el-button
          type="primary"
          @click="clickShowUpdate(), subUpdateReview()"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BasePagination, {
  pagination
} from '@/components/BasePagination'
import { mapGetters } from 'vuex'
import {
  addReviewAPI,
  deleteReviewAPI,
  getAllReviewAPI,
  updateReviewAPI
} from '@/api/bbs'
import { Message } from 'element-ui'
import moment from 'moment'
import { addLikeAPI, delLikeAPI } from '@/api/detail'
export default {
  name: 'PostViewReview',
  components: { BasePagination },
  props: { isFocus: Boolean },
  data() {
    return {
      user: { avatar: '' },
      pagination,
      reviewItem: { quoteId: '', content: '' },
      reviewList: [],
      quoteItem: {},
      updateReview: { _id: '', content: '' },
      show: false
    }
  },

  computed: {
    ...mapGetters(['isAdmin', 'currentPost', 'isLight']),
    reviewListCurrent() {
      const currentPage = this.pagination.currentPage
      const pageNum = this.pagination.pageNum
      const start = (currentPage - 1) * pageNum
      const end = currentPage * pageNum
      return this.reviewList.slice(start, end)
    }
  },
  watch: {
    isFocus() {
      if (this.isFocus) {
        this.$refs.reply.focus()
      }
    }
  },
  created() {
    this.getAllReview()
  },
  methods: {
    // 亮了
    async handleLike(item) {
      let res = null
      if (item.isLight) {
        res = await delLikeAPI({
          postId: item.postId,
          reviewId: item._id
        })
      } else {
        res = await addLikeAPI({
          postId: item.postId,
          reviewId: item._id
        })
      }
      if (res.code === 0) {
        this.$store.dispatch('likeAndCollection/getLike', {
          postId: item.postId
        })
        this.getAllReview()
      }
    },
    // 修改评论
    async subUpdateReview() {
      const data = { ...this.updateReview }
      const res = await updateReviewAPI(data)
      if (res.code === 0) {
        Message({ message: '修改成功', type: 'success' })
        this.getAllReview()
      }
    },
    handleClickUpdateReview(item) {
      this.updateReview.content = item.content
      this.updateReview._id = item._id
      this.show = true
    },
    clickShowUpdate() {
      this.show = !this.show
    },
    // 删除评论
    async handleDeleteReview(_id) {
      const res = await deleteReviewAPI({ _id })
      if (res.code === 0) {
        Message({ message: '删除成功', type: 'success' })
        this.getAllReview()
      }
    },
    // 跳转到评论
    handleClickFocus(_id, item) {
      this.quoteItem = item
      this.reviewItem.quoteId = _id
      this.$refs.reply.focus()
    },
    // 添加评论
    async addReview() {
      const data = {
        ...this.reviewItem,
        postId: this.$route.params.id
      }
      if (!data.quoteId) {
        data.quoteId = '0'
      }
      const res = await addReviewAPI(data)
      if (res?.code === 0) {
        Message({ message: '回复成功', type: 'success' })
        this.reviewItem.content = ''
        this.getAllReview()
      }
    },
    // 获取所有评论
    async getAllReview() {
      const res = await getAllReviewAPI({
        postId: this.$route.params.id
      })
      if (res.code === 0) {
        // 预处理
        res.result.data.map(item => {
          if (item.quoteId !== '0') {
            item.quote = res.result.data.find(
              findItem => findItem._id === item.quoteId
            )
          }
          item.isLight = this.isLight(item._id)
          item.createTime = moment(item.createTime).format(
            'MM-DD HH:mm'
          )
        })
        this.reviewList = res.result.data
        this.pagination.total = this.reviewList.length
      }
    },
    // 处理分页
    handlePagination(currentPage) {
      this.pagination.currentPage = currentPage
    }
  }
}
</script>

<style lang="scss" scoped>
.post-review-wrapper {
  padding: 0 21px;
  background-color: #fff;
}
.review-list {
  padding: 20px 30px 0 30px;
  margin-bottom: 20px;
  background-color: #f2f3f4;
  font-size: 14px;
}
.review-item {
  display: flex;
  padding-bottom: 5px;
  margin-top: 20px;
  border-bottom: 1px solid #dddddd;
  .item-content {
    margin-left: 10px;
    flex: 1;
  }
  .item-heard {
    line-height: 18px;
    font-size: 14px;
    margin-bottom: 11px;
    .heard-nickname,
    .quote-nickanme {
      color: #4b8dc3;
      &:hover {
        cursor: pointer;
        color: #40a9ff;
      }
    }
    .heard-date {
      margin-left: 12px;
      font-size: 12px;
      color: #96999f;
    }
  }
  .item-button {
    margin-top: 10px;
    line-height: 32px;
    color: #7b7e86;
    span {
      margin-right: 12px;
      &:hover {
        cursor: pointer;
        color: #dc0000;
      }
    }
  }
}
.list-title {
  font-size: 20px;
  font-weight: bold;
}
.red {
  color: #c60100;
}
.review-quote {
  padding: 14px 10px;
  margin-bottom: 22px;
  background-color: #ddd;
  .quote-user {
    padding: 0 14px 14px 14px;
  }
}

.reply-content {
  margin-bottom: 20px;
  padding: 20px 20px;
  font-size: 14px;
  background-color: #f9f9f9;
}
.reply-button {
  text-align: right;
}
.quote-nickname {
  color: #4b8dc3;
  &:hover {
    cursor: pointer;
    color: #40a9ff;
  }
}
</style>
