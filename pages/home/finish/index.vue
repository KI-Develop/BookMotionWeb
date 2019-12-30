<template>
  <p>hoge</p>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Index extends Vue {
  mounted() {
    this.$nuxt.$emit('updatePageName', [
      { name: 'ホーム', path: '', openName: '1' },
      { name: '読了', path: '/home/finish', activeName: '1-3' }
    ])
  }
}
</script>
