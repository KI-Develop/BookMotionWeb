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
      { name: '本の登録', path: '' },
      { name: '手動入力', path: '/register/manual' }
    ])
  }
}
</script>
