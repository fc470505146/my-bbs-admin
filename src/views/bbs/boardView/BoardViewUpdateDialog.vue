<template>
  <el-dialog
    :center="true"
    top="50"
    title="修改帖子"
    :visible.sync="show"
    @close="$emit('close')"
  >
    <el-form :model="updatePost">
      <el-form-item label="帖子名称">
        <el-input v-model="updatePost.title" autocomplete="off" />
      </el-form-item>

      <el-form-item label="优先级">
        <el-input v-model="updatePost.priority" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="clickShowUpdate">取 消</el-button>
      <el-button
        type="primary"
        @click="clickShowUpdate(), subUpdatePost()"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { updatePostOneAPI } from '@/api/bbs'
import { Message } from 'element-ui'
export default {
  name: 'BoardViewUpdateDialog',
  props: {
    updateItem: {
      type: Object,
      default: () => {
        return {}
      }
    },
    showUpdatePost: Boolean
  },
  data() {
    return {
      updatePost: this.updateItem,
      show: this.showUpdatePost
    }
  },
  watch: {
    showUpdatePost() {
      this.show = this.showUpdatePost
    },
    updateItem() {
      this.updatePost = { ...this.updateItem }
    }
  },

  created() {},
  methods: {
    clickShowUpdate() {
      this.$emit('close')
    },
    async subUpdatePost() {
      const data = {
        _id: this.updatePost._id,
        title: this.updatePost.title,
        priority: Number(this.updatePost.priority)
      }
      const res = await updatePostOneAPI(data)
      if (res.code === 0) {
        Message({ message: '修改成功', type: 'success' })
        console.log(res)
        this.$emit('updatePostOk')
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
