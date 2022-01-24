<template>
  <div class="user-view-wrapper">
    <UserViewHeard />
    <UserViewContent />
  </div>
</template>

<script>
import UserViewHeard from './UserViewHeard'
import UserViewContent from './UserViewContent'
export default {
  name: 'UserView',
  components: { UserViewHeard, UserViewContent }
}
</script>

<style lang="scss" scoped>
.user-view-wrapper{
  overflow-y: scroll;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 20px 24px;
  background-color: #f6f6f6;
}
</style>
