<template>
  <div class="post-heard">
    <div class="post-title">
      <span class="post-name">{{ currentPost.title }}</span>
    </div>
    <div class="post-landlord">
      <div class="landloard-user">
        <el-avatar
          :key="currentPost.User.avatar"
          :size="50"
          :src="`${currentPost.User.avatar}`"
        />
        <div class="landloard-info">
          <div>
            <span class="nickname">
              <router-link :to="`/bbs/user/${currentPost.User._id}`">
                {{ currentPost.User.nickname }}</router-link>
            </span>
            <span class="createtime">{{ currentPost.lastModified }}</span>
          </div>
          <div style="font-size: 14px">{{ currentPost.title }}</div>
        </div>
      </div>
      <div class="post-desc">
        <el-row>
          <el-col :span="18"> {{ currentPost.description }}</el-col>
        </el-row>
      </div>
      <div class="post-button">
        <span
          :class="{ 'button-recommend': true, red: isRecommend }"
          @click="handleRecommend"
        ><svg-icon icon-class="recommend" />{{
          isRecommend ? '已' : ''
        }}推荐({{ currentPost.recommend || 0 }})</span>
        <span
          class="el-icon-chat-round"
          @click="handleClickFocus"
        >评论</span>
        <span @click="handleClickCollection">
          <svg-icon
            icon-class="collection"
            :class="{ yellow: isInCollection }"
          />
          {{ isInCollection ? '已' : '' }}收藏</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { addCollectionAPI, delCollectionAPI } from '@/api/bbs'
import { addRecommendAPI, delRecommendAPI } from '@/api/detail'
export default {
  name: 'PostViewHeard',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['currentPost', 'isInCollection', 'isRecommend'])
  },
  created() {
    this.getCurrentPost()
  },
  methods: {
    // 获取当前Post
    getCurrentPost() {
      this.$store.dispatch(
        'bbs/getCurrentPost',
        this.$route.params.id
      )
    },
    // 处理推荐
    async handleRecommend() {
      const postId = this.$route.params.id
      let res = null
      if (this.isRecommend) {
        res = await delRecommendAPI({ postId })
      } else {
        res = await addRecommendAPI({ postId })
      }
      if (res.code === 0) {
        this.$store.dispatch('likeAndCollection/getRecommend')
        this.$store.dispatch('bbs/getCurrentPost', postId)
      }
    },

    // 通过用户ID获得用户头像
    // async getAvatar() {
    //   const res = await getAvatarAPI({
    //     _id: this.currentPost.User._id
    //   })
    //   if (res.code === 0) {
    //     this.avatar = res.result.data.avatar
    //   }
    // },
    handleClickFocus() {
      this.$emit('focus')
    },
    // 收藏功能
    async handleClickCollection() {
      let res = null
      if (this.isInCollection) {
        res = await delCollectionAPI({ postId: this.currentPost._id })
      } else {
        res = await addCollectionAPI({ postId: this.currentPost._id })
      }
      if (res.code === 0) {
        this.$store.dispatch('likeAndCollection/getCollection')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.post-heard {
  background-color: #fff;
  padding: 0 20px 10px 20px;
}
.post-title {
  line-height: 50px;
}
.post-name {
  font-size: 20px;
  font-weight: bold;
  color: #2d3137;
}
.post-landlord {
  padding: 20px 0 30px 20px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  .landloard-user {
    display: flex;
    line-height: 25px;
  }
  .landloard-info {
    margin-left: 10px;
  }
  .nickname {
    font-size: 14px;
    color: #4b8dc3;
    &:hover {
      cursor: pointer;
      color: #40a9ff;
    }
  }
  .createtime {
    margin-left: 50px;
    font-size: 14px;
    color: #96999f;
  }
  .post-desc {
    margin: 36px 0 36px 40px;
  }
  .post-button {
    margin-left: 40px;
    color: #7b7e86;
    .button-recommend {
      &:hover {
        color: #aa1020;
      }
    }
    span {
      margin-left: 20px;
      &:hover {
        cursor: pointer;
        color: #48494a;
      }
    }
  }
}
.yellow {
  color: #efa803;
}
.red {
  color: #aa1020;
}
</style>
