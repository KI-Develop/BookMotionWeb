<template>
  <p>hoge</p>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Index extends Vue {
  mounted() {
    this.$nuxt.$emit('updatePageName', [
      { name: 'アカウント', path: '' },
      { name: '基本設定', path: '/account/setting' }
    ])
  }
}
</script>
