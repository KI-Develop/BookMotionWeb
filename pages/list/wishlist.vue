<template>
  <div>
    hi
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapsed: false
    }
  },
  mounted() {
    this.$nuxt.$emit('updatePageName', ['書籍一覧', '気になる本'])
  }
}
</script>
