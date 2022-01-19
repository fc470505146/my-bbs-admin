<template>
  <el-pagination
    style="text-align: center"
    background
    layout="prev, pager, next"
    :page-size="pagination.pageNum"
    :total="pagination.total"
    @current-change="emitChange"
  />
</template>

<script>
export const pagination = { pageNum: 10, total: 10, currentPage: 1 }
export default {
  name: 'BasePagination',
  props: { pagination: Object },
  methods: {
    emitChange(currentPage) {
      this.$emit('current-change', currentPage)
    }
  }
}
</script>

<style lang="scss" scoped></style>
