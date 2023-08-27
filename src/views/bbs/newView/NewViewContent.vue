<template>
  <div class="user-view-content">
    <div class="content-button-list">
      <span
        v-for="(item, index) in buttonList"
        :key="index"
        :class="{ selected: currentTabNum === index }"
        @click="handleClickButton(index), item.clickMethod()"
      >
        {{ item.title }}
      </span>
    </div>
    <div
      v-infinite-scroll="handleLoad"
      class="content-item-list"
      :infinite-scroll-disabled="controlDisabled"
    >
      <div
        v-for="item in showList"
        :key="item._id"
        class="item"
      >
        <el-avatar
          :key="item.reviewItem.User._id"
          :src="item.reviewItem.User.avatar"
          :size="48"
        />
        <div class="item-info">
          <div class="user-info">
            <span
              class="nickname"
            >{{ item.reviewItem.User.nickname }}
            </span>
            <span class="date">{{ item.reviewItem.createDate }}</span>
          </div>
          <div class="post-info">
            <div style="font-size: 14px; margin-bottom: 12px">
              在帖子
              <router-link
                style="color: #2f6eeb"
                :to="`/bbs/post/${item.postId}`"
              >《{{ item.postName }}》</router-link>
              中回复了你{{ currentTabNum === 1 ? '' : '的回复' }}
            </div>
            <div class="quote-content">
              {{ item.reviewItem.quoteContent }}
            </div>
            {{ item.reviewItem.content }}
          </div>
        </div>
      </div>
      <div v-if="loading" class="disabled-warning">加载中...</div>
      <div v-if="noMore" class="disabled-warning">没有更多了</div>
    </div>

  </div>
</template>

<script>
import { getAllNoticeAPI } from '@/api/detail'
import moment from 'moment'
const useNewContent = () => {
  async function getAllNotice() {
    const res = await getAllNoticeAPI()
    if (res.code === 0) {
      const data = res.result.data
      if (data.noticeByReview) {
        data.noticeByReview.map(item => {
          item.reviewItem.User.avatar = `${item.reviewItem.User.avatar}`
          item.reviewItem.createDate = moment(
            item.reviewItem.createTime
          ).format('YYYY-MM-DD HH:mm:ss')
        })
        data.noticeByReview.sort(
          (x, y) =>
            Date.parse(y.reviewItem.createTime) - Date.parse(x.reviewItem.createTime)
        )
      }
      if (data.noticeByPost) {
        data.noticeByPost.sort(
          (x, y) =>
            Date.parse(y.reviewItem.createTime) - Date.parse(x.reviewItem.createTime)
        )
        data.noticeByPost.map(item => {
          item.reviewItem.User.avatar = `${item.reviewItem.User.avatar}`
          item.reviewItem.createDate = moment(
            item.reviewItem.createTime
          ).format('YYYY-MM-DD HH:mm:ss')
        })
      }
      this.noticeByPost = res.result.data.noticeByPost ?? []
      this.noticeByReview = res.result.data.noticeByReview
      this.lookNoticeReview()
    }
  }
  function lookNoticeReview() {
    this.dataList = this.noticeByReview
  }
  function lookNoticePost() {
    this.dataList = this.noticeByPost
  }
  return { getAllNotice, lookNoticeReview, lookNoticePost }
}

export default {
  name: 'NewViewContent',
  data() {
    return {
      buttonList: [
        { title: '提到我的', clickMethod: this.lookNoticeReview },
        { title: '评论', clickMethod: this.lookNoticePost }
      ],
      currentTabNum: 0,
      dataList: [],
      showCount: 5,
      loading: false,
      noticeByPost: [],
      noticeByReview: []
    }
  },
  computed: {
    noMore() {
      return this.showCount >= this.dataList.length
    },
    showList() {
      return this.dataList.slice(0, this.showCount)
    },
    controlDisabled() {
      return this.loading || this.noMore
    }
  },
  created() {
    this.getAllNotice()
  },
  methods: {
    ...useNewContent(),
    // 处理load
    handleLoad() {
      this.loading = true
      setTimeout(() => {
        this.showCount += 5
        this.loading = false
      }, 1000)
    },
    // 点击切换
    handleClickButton(index) {
      this.currentTabNum = index
    }
  }
}
</script>

<style lang="scss" scoped>
.user-view-content {
  padding-top: 20px;
  padding: 8px 20px;
  background-color: #fff;
}
.content-button-list {
  margin-bottom: 10px;
  font-size: 16px;
  color: #191c22;
  line-height: 22px;
  span {
    margin-right: 40px;
    &:hover {
      cursor: pointer;
    }
  }
}
.selected {
  color: #2d3137;
  padding-bottom: 10px;
  font-weight: bold;
  border-bottom: 2px solid #dc0000;
}
.content-item-list {
  margin-top: 30px;
}
.item {
  display: flex;
  padding: 10px 0;
  font-size: 14px;
  border-bottom: 1px solid #f6f6f6;
  .el-avatar {
    margin-right: 20px;
  }
  .item-info {
    font-size: 16px;
    flex: 1;
    .user-info {
      margin-bottom: 8px;
      font-size: 14px;
      line-height: 21px;
    }
    .post-info {
      line-height: 24px;
      .quote-content {
        margin-bottom: 12px;
        padding-left: 8px;
        border-left: 1px solid #eeeeee;
        color: #7b7e86;
      }
    }
  }
  &:hover {
    background-color: #f6f6f6;
  }
}
.item-title {
  span {
    margin-right: 20px;
    &:hover {
      cursor: pointer;
      color: #d50018;
    }
  }
}
.item-date {
  color: #7b7e86;
}
.disabled-warning {
  margin-top: 5px;
  text-align: center;
  font-size: 14px;
  line-height: 20px;
  color: #7b7e86;
}
.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.title {
  box-sizing: border-box;
  display: inline-block;
  max-width: 500px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  vertical-align: middle;
}
</style>
