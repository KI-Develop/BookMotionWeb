<template>
  <p>testPage</p>
</template>
<script>
export default {
  validate({ params }) {
    // 数値でなければならない
    return /^\d+$/.test(params.id)
  },
  mounted() {
    // TODO: パンくずリストは本のタイトルを
    this.$nuxt.$emit('updatePageName', [
      { name: '書籍一覧', path: '' },
      { name: '積み本', path: '/list/tsundoku' },
      {
        name: this.$route.params.id,
        path: `/list/tsundoku/${this.$route.params}`
      }
    ])
  }
}
</script>
