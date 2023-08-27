<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in levelList"
        :key="item.path"
      >
        <span
          v-if="
            item.redirect === 'noRedirect' ||
              index == levelList.length - 1
          "
          class="no-redirect"
        >{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{
          item.meta.title
        }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      levelList: null
    }
  },
  computed: {
    ...mapGetters(['currentPost'])
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    },
    currentPost() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    async getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(
        item => item.meta && item.meta.title
      )
      // 添加特殊情况单独增加

      if (this.$route.meta.title === '帖子') {
        if (!this.currentPost.boardId) {
          await this.$store.dispatch(
            'bbs/getCurrentPost',
            this.$route.params.id
          )
        }
        matched = [
          matched[0],
          {
            path: `/bbs/${this.currentPost.boardId}`,
            meta: { title: '板块' }
          },
          matched[1]
        ]
      }
      const first = matched[0]

      if (!this.isDashboard(first)) {
        matched = [
          { path: '/dashboard', meta: { title: '首页' }}
        ].concat(matched)
      }

      this.levelList = matched.filter(
        item =>
          item.meta &&
          item.meta.title &&
          item.meta.breadcrumb !== false
      )
    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return (
        name.trim().toLocaleLowerCase() ===
        'Dashboard'.toLocaleLowerCase()
      )
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
