<template>
  <div class="new-view-wrapper">
    <div class="view-heard">
      <span class="title">
        <span
          class="el-icon-message-solid"
          style="color: #dc0000; margin-right: 10px"
        />
        我的消息
      </span>
    </div>
    <NewViewContent />
  </div>
</template>

<script>
import NewViewContent from './NewViewContent'
export default {
  name: 'NewView',
  components: { NewViewContent }
}
</script>

<style lang="scss" scoped>
.new-view-wrapper {
  overflow-y: scroll;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #f6f6f6;
  padding: 30px 20px;
}
.view-heard {
  padding: 29px 28px;
  color: #262626;
  line-height: 30px;
  font-size: 20px;
  background-color: #fff;
}
</style>
