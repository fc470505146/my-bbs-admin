<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <span>你好,<router-link :to="`/bbs/user/${_id}`">{{
        name
      }}</router-link></span>
      <span class="line">|</span>
      <span class="news">
        <el-badge value="20"><router-link :to="`/bbs/new/${_id}`">消息 </router-link></el-badge>
      </span>
      <span class="line">|</span>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img
            :src="'http://localhost:8081' + avatar"
            class="user-avatar"
          >
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item> 首页 </el-dropdown-item>
          </router-link>
          <el-dropdown-item
            divided
            @click.native="clickShowChangePassword"
          >
            修改密码
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog
      :center="true"
      title="修改密码"
      :visible.sync="showChangePassword"
    >
      <el-form
        ref="passwordCheck"
        :rules="rules"
        :model="PasswordItem"
      >
        <el-form-item label="原密码" prop="originPassword">
          <el-input
            v-model="PasswordItem.originPassword"
            type="password"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item label="新密码" prop="newPassword">
          <el-input
            v-model="PasswordItem.newPassword"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            v-model="PasswordItem.confirmPassword"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clickShowChangePassword">取 消</el-button>
        <el-button
          type="primary"
          @click="subChangePassword()"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { changePasswordAvatarAPI } from '@/api/user'
import { Message } from 'element-ui'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    const rulePassword = [
      {
        required: true,
        message: '请输入密码',
        trigger: 'blur'
      },
      {
        min: 6,
        max: 16,
        message: '长度应在8-16个字符',
        trigger: 'blur'
      }
    ]
    const handleConfirmPassword = (rule, value, callback) => {
      if (value !== this.PasswordItem.newPassword) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      showChangePassword: false,
      PasswordItem: {
        originPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        originPassword: [...rulePassword],
        newPassword: [...rulePassword],
        confirmPassword: [
          ...rulePassword,
          { validator: handleConfirmPassword, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['_id', 'sidebar', 'avatar', 'name'])
  },
  methods: {
    // 处理密码修改
    subChangePassword() {
      this.$refs.passwordCheck.validate(async valid => {
        if (valid) {
          const res = await changePasswordAvatarAPI({
            password: this.PasswordItem.originPassword,
            changePassword: this.PasswordItem.newPassword
          })
          if (res.code === 0) {
            Message({ message: '修改成功', type: 'success' })
            this.clickShowChangePassword()
          }
        }
      })
    },
    clickShowChangePassword() {
      for (const key in this.PasswordItem) {
        this.PasswordItem[key] = ''
      }
      this.showChangePassword = !this.showChangePassword
    },
    //
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    display: flex;
    > span {
      box-sizing: border-box;
      font-size: 15px;
      margin-right: 10px;
    }
    .line {
      color: #ebeef1;
    }
    .news:hover {
      cursor: pointer;
    }
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.el-badge {
  ::v-deep .el-badge__content{
    top: 10px;
  }

}

</style>
