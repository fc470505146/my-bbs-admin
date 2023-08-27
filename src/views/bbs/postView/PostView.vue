<template>
  <div class="post-view-wrapper">
    <!-- 帖子头 -->
    <post-view-heard @focus="handleClickFocus" />
    <!-- 帖子评论 -->
    <post-view-review :is-focus="isFocus" @focus="isFocus = false" />
  </div>
</template>

<script>
import PostViewHeard from './PostViewHeard'
import PostViewReview from './PostViewReview'
export default {
  name: 'PostView',
  components: { PostViewHeard, PostViewReview },
  data() {
    return {
      isFocus: false
    }
  },
  created() {
    this.getConnection()
  },
  mounted() {
    // window.addEventListener('beforeunload', setStateToLocal)
    // window.addEventListener(
    //   'beforeunload',
    //   setLikeAndCollectionStateToLocal
    // )
  },
  methods: {
    getConnection() {
      this.$store.dispatch('likeAndCollection/getCollection')
      this.$store.dispatch('likeAndCollection/getRecommend')
      this.$store.dispatch('likeAndCollection/getLike', {
        postId: this.$route.params.id
      })
    },
    handleClickFocus() {
      this.isFocus = !this.isFocus
    }
  }
}
</script>

<style lang="scss" scoped>
.post-view-wrapper {
  overflow-y: auto;
  padding: 18px 20px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #e9e9e9;
}
</style>
