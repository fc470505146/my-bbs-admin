<template>
  <div class="el-upload-contain">
    <el-upload
      ref="upload"
      class="upload-demo"
      action="0"
      :on-remove="handleRemove"
      :auto-upload="false"
      :multiple="false"
      :http-request="uploadFile"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        @click="submitUpload"
      >上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">
        上传excel文件必须包含username、password、nickname等字段
      </div>
    </el-upload>
  </div>
</template>

<script>
import { uploadExcel } from '@/api/user'
import { Message } from 'element-ui'
export default {
  name: 'UserAddList',
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    async uploadFile(params) {
      const res = await uploadExcel(params.file)
      if (res.code === 0) {
        Message({ showClose: true, message: res.message, type: 'success' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-upload-contain {
  width: 20%;
  margin: 0 auto;
}
.el-upload__tip {
  text-align: center;
}
</style>
