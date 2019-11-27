<template>
  <SearchDb />
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SearchDb from '~/components/organisms/SearchDb.vue'

@Component({
  components: {
    SearchDb
  }
})
export default class index extends Vue {
  mounted() {
    this.$nuxt.$emit('updatePageName', [
      { name: '本の登録', path: '', openName: '2' },
      {
        name: 'データベース検索',
        path: '/register/searchdb',
        activeName: '2-1'
      }
    ])
  }
}
</script>
