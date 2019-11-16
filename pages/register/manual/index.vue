<template>
  <ManualInput />
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ManualInput from '~/components/molecules/ManualInput.vue'

@Component({
  components: {
    ManualInput
  }
})
export default class index extends Vue {
  mounted() {
    this.$nuxt.$emit('updatePageName', [
      { name: '書籍登録', path: '' },
      { name: '手動入力', path: '/register/manual' }
    ])
  }
}
</script>
