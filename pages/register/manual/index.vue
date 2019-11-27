<template>
  <Manual />
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Manual from '~/components/organisms/Manual.vue'

@Component({
  components: {
    Manual
  }
})
export default class index extends Vue {
  mounted() {
    this.$nuxt.$emit('updatePageName', [
      { name: '本の登録', path: '', openName: '2' },
      { name: '手動入力', path: '/register/manual', activeName: '2-2' }
    ])
  }
}
</script>
