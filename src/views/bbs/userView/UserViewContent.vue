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
      <div v-for="item in showList" :key="item._id" class="item">
        <div class="item-title ellipsis">
          <router-link :to="`/bbs/post/${item._id}`">
            <span class="title">{{ item.title }}</span>
            <span
              v-if="item.recommend"
              class="title"
              style="color: #7b7e86"
            >{{ item.recommend }}推荐</span>
          </router-link>
        </div>
        <div class="item-date">{{ item.lastDate }}</div>
      </div>

      <div v-if="loading" class="disabled-warning">加载中...</div>
      <div v-if="controlDisabled" class="disabled-warning">
        没有更多了
      </div>
    </div>
  </div>
</template>

<script>
import {
  getCollectionByUserIdAPI,
  getPostByUserIdAPI,
  getRecommendByUserIdAPI
} from '@/api/detail'
import moment from 'moment'
export default {
  name: 'UserViewContent',
  data() {
    return {
      buttonList: [
        { title: '发帖', clickMethod: this.getPostByUserId },
        { title: '推荐', clickMethod: this.getRecommendByUserId },
        { title: '收藏', clickMethod: this.getCollectionByUserId }
      ],
      currentTabNum: 0,
      dataList: [],
      showCount: 15,
      loading: false
    }
  },
  computed: {
    showList() {
      return this.dataList.slice(0, this.showCount)
    },
    controlDisabled() {
      return this.showCount >= this.dataList.length
    }
  },
  created() {
    this.getPostByUserId()
  },
  methods: {
    // 处理load
    handleLoad() {
      this.loading = true
      setTimeout(() => {
        this.showCount += 5
        this.loading = false
      }, 1000)
    },

    // 获得收藏
    async getCollectionByUserId() {
      const res = await getCollectionByUserIdAPI({
        _id: this.$route.params.id
      })
      if (res.code === 0) {
        res.result.data.postList.map(item => {
          item.lastDate = moment(item.lastModified).format(
            'YYYY-MM-DD'
          )
        })
        res.result.data.postList.sort((x, y) => {
          return (
            Date.parse(y.lastModified) - Date.parse(x.lastModified)
          )
        })
        this.dataList = res.result?.data.postList
      }
    },
    // 获取所有推荐
    async getRecommendByUserId() {
      const res = await getRecommendByUserIdAPI({
        _id: this.$route.params.id
      })
      if (res.code === 0) {
        res.result.data.postList.map(item => {
          item.lastDate = moment(item.lastModified).format(
            'YYYY-MM-DD'
          )
        })
        res.result.data.postList.sort((x, y) => {
          return (
            Date.parse(y.lastModified) - Date.parse(x.lastModified)
          )
        })
        this.dataList = res.result?.data.postList
        console.log(this.dataList)
      }
    },
    // 点击切换
    handleClickButton(index) {
      this.currentTabNum = index
    },
    // 获取用户发出的所有帖子信息
    async getPostByUserId() {
      const res = await getPostByUserIdAPI({
        _id: this.$route.params.id
      })
      if (res.code === 0) {
        res.result.data.map(item => {
          item.lastDate = moment(item.lastModified).format(
            'YYYY-MM-DD'
          )
        })
        this.dataList = res.result.data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.user-view-content {
  margin-top: 20px;
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
.item {
  display: flex;
  justify-content: space-between;
  line-height: 50px;
  font-size: 14px;
  border-bottom: 1px solid #f6f6f6;
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
