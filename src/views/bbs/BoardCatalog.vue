<template>
  <div>
    <el-row :gutter="40">
      <template v-for="(item, index) in boardList">
        <el-col :key="item._id" :span="12" :xs="24">
          <div
            class="catalogContent"
            :style="{
              'border-top': `5px solid ${indexColorList[index % 4]}`,
            }"
          >
            <router-link
              :to="`/bbs/${item._id}`"
            ><div class="BoardTitle">
              <span
                class="BoardIndex"
                :style="{
                  'background-color': indexColorList[index % 4],
                }"
              >{{ index }}区</span>
              <span class="BoardName">{{ item.boardName }}</span>
              <i class="el-icon-arrow-right" /></div></router-link>

            <el-divider />
            <div class="boardDescription">
              <span
                style="color: #191c22; font-weight: 500"
              >简介:</span>
              <span style="color: #4e5158">
                {{ item.description }}
              </span>
            </div>
          </div>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script>
import { getListByPage } from '@/api/bbs'
export default {
  name: 'BoardCatalog',
  data() {
    return {
      indexColorList: ['#FFA558', '#2AB09A', '#81B2B7', '#FD755A'],
      boardList: []
    }
  },
  created() {
    this.getBoardList()
  },
  methods: {
    async getBoardList() {
      const res = await getListByPage({ pageNum: 20, currentPage: 1 })
      if (res.code === 0) {
        this.boardList = res.result.data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.catalogContent {
  border: 1px solid #eeeeee;
  padding: 10px 15px;
  .BoardTitle {
    display: flex;
    line-height: 30px;
    margin: 10px 0;
    .BoardIndex {
      padding: 0 5px;
      color: #fff;
      border-radius: 8px;
      margin-right: 5px;
    }
    .BoardName {
      font-weight: bold;
    }
    .el-icon-arrow-right {
      text-align: right;
      flex: 1;
      line-height: 30px;
    }
  }
  .boardDescription {
    font-size: 12px;
    margin-top: -10px;
  }
}
.el-row {
  padding: 10px 40px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
  margin-bottom: 10px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
