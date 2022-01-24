<template>
  <div class="dashboard-container">
    <el-row class="board-list">
      <el-col
        v-for="(item, index) in dataList"
        :key="item._id"
        :span="12"
        :xs="24"
      >
        <div
          class="board-item"
          :style="{
            'border-top': `5px solid ${indexColorList[index % 4]}`,
          }"
        >
          <div class="item-title">
            <span>
              <router-link :to="`/bbs/${item._id}`">
                {{ item.boardName }}
              </router-link>
            </span>
            <span
              class="title-more"
            ><router-link :to="`/bbs/${item._id}`">
              更多
            </router-link></span>
          </div>
          <div class="item-postlist">
            <div
              v-for="postItem in item.postList"
              :key="postItem._id"
              class="post-item ellipsis"
            >
              <router-link :to="`/bbs/post/${postItem._id}`">
                {{ postItem.title }}
              </router-link>
              <span v-if="postItem.recommend" class="recommend">
                {{ postItem.recommend }}亮
              </span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getIndexAPI } from '@/api/detail'
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      indexColorList: ['#FFA558', '#2AB09A', '#81B2B7', '#FD755A'],
      dataList: []
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  created() {
    this.getIndex()
  },
  methods: {
    async getIndex() {
      const res = await getIndexAPI()
      if (res.code === 0) {
        this.dataList = res.result.data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  overflow-y: auto;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 30px;
  background-color: #e6e6e6;
}
.board-list {
}
.el-col {
  margin-bottom: 25px;
}
.board-item {
  min-height: 310px;
  margin-right: 15px;
  padding: 10px 13px;
  background-color: #fff;
}
.item-title {
  position: relative;
  line-height: 30px;
  font-size: 16px;
  border-bottom: 1px solid #e3e3e4;
  span:hover {
    color: #dc0000;
    cursor: pointer;
  }
  .title-more {
    position: absolute;
    right: 0;
    font-size: 12px;
    color: #d8d8d8;
  }
}
.item-postlist {
  padding-top: 10px;
  font-size: 14px;
  .post-item {
    padding: 5px 5px;
    &:hover {
      color: #dc0000;
    }
  }
}
.recommend{
  margin-left: 15px;
  color:#7b7e86;
}
</style>
