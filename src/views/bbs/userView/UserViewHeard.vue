<template>
  <div class="user-view-heard">
    <el-avatar
      :key="UserInfo.avatar"
      :src="UserInfo.avatar"
      :size="120"
    />
    <div class="user-info">
      <div class="user-nickname">{{ UserInfo.nickname }}</div>
      <div v-if="$route.params.id === _id" class="user-button">
        <el-button
          plain
          type="small"
          @click="
            handleClickShowUserInfo(), handleClickUpdateUserInfo()
          "
        >编辑信息</el-button>

        <el-button
          plain
          type="small"
          @click="handleClickShowAvatar(), handleClickAvatarPass()"
        >修改头像</el-button>
      </div>
    </div>
    <el-dialog
      :center="true"
      title="编辑个人信息"
      :visible.sync="userItem.show"
    >
      <el-form :model="userItem">
        <el-form-item label="昵称">
          <el-input v-model="userItem.nickname" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClickShowUserInfo">取 消</el-button>
        <el-button
          type="primary"
          @click="handleClickShowUserInfo(), subUpdateUserInfo()"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 上传头像 -->
    <el-dialog
      :center="true"
      title="修改头像"
      :visible.sync="avatarShow"
    >
      <el-upload
        ref="uploardAvatar"
        class="avatar-uploader"
        :show-file-list="false"
        :http-request="uploadAvatar"
        action="0"
        :before-upload="beforeAvatarUpload"
        :auto-upload="false"
        :on-change="freshImg"
      >
        <el-avatar
          v-if="avatar"
          :key="avatar"
          :size="100"
          :src="avatar"
        />
        <i v-else class="el-icon-plus avatar-uploader-icon" />
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClickShowAvatar">取 消</el-button>
        <el-button
          type="primary"
          @click="handleClickShowAvatar(), subUpdateAvatar()"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserInfoByUserIdAPI } from '@/api/detail'
import { mapGetters } from 'vuex'
import { updateUserInfoAPI, uploadAvatarAPI } from '@/api/user'
import { Message } from 'element-ui'
export default {
  name: 'UserViewHeard',
  data() {
    return {
      UserInfo: { _id: '', avatar: '', nickname: '' },
      userItem: {
        show: false,
        _id: '',
        nickname: ''
      },
      avatarShow: false,
      avatar: '',
      headTip: '点击上传头像'
    }
  },
  computed: {
    ...mapGetters(['_id'])
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    // 头像上传处理
    async uploadAvatar(file) {
      const res = await uploadAvatarAPI(file.file)
      if (res.code === 0) {
        Message({ message: '上传成功', type: 'success' })
        this.getUserInfo()
        this.$store.dispatch('user/getInfo')
      }
    },
    beforeAvatarUpload(file) {
      const isImage = file.type?.includes('image')
      const isLt5M = file.size / 1024 / 1024 <= 5
      if (!isImage) {
        this.avatar = this.UserInfo.avatar
        this.$message.error('请上传图片类型的文件')
      }
      if (!isLt5M) {
        this.$message.error('上传文件大小必须小于5MB')
      }
      return isImage && isLt5M
    },
    freshImg(file) {
      this.imgObj = file.raw
      const fr = new FileReader()
      fr.onload = () => {
        this.avatar = fr.result
      }
      fr.readAsDataURL(this.imgObj)
    },
    subUpdateAvatar() {
      this.$refs.uploardAvatar.submit()
    },
    handleClickShowAvatar() {
      this.avatarShow = !this.avatarShow
    },
    handleClickAvatarPass() {
      this.avatar = this.UserInfo.avatar
    },
    // 修改个人信息
    handleClickShowUserInfo() {
      this.userItem.show = !this.userItem.show
    },
    handleClickUpdateUserInfo() {
      this.userItem._id = this._id
      this.userItem.nickname = this.UserInfo.nickname
    },
    async subUpdateUserInfo() {
      const res = await updateUserInfoAPI({
        nickname: this.userItem.nickname
      })
      if (res.code === 0) {
        Message({ message: '修改成功', type: 'success' })
        this.getUserInfo()
        this.$store.dispatch('user/getInfo')
      }
    },
    // 获取用户信息
    async getUserInfo() {
      const res = await getUserInfoByUserIdAPI({
        _id: this.$route.params.id
      })
      if (res.code === 0) {
        this.UserInfo = res.result.data
        this.UserInfo.avatar = `${this.UserInfo.avatar}`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.user-view-heard {
  padding: 20px 20px;
  display: flex;
  background-color: #fff;
}
.user-info {
  margin-left: 24px;
  flex: 1;
  font-size: 22px;
  font-weight: bold;
  line-height: 60px;
}
.avatar-uploader {
  text-align: center;
}
</style>
