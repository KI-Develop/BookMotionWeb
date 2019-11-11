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
export default class index extends Vue {}
</script>
