<template>
  <BookInput />
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BookInput from '~/components/molecules/BookInput.vue'

@Component({
  components: {
    BookInput
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
