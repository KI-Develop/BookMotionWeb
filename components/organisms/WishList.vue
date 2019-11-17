<template>
  <div>
    <Refine
      :display-criteria="bookCriteria"
      :default-criteria="defaultBookCriteria"
    />
    <br /><br />
    <BookList :items="tsundokuData" :flag="flag" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import BookList from '@/components/molecules/BookList.vue'
import Refine from '@/components/molecules/Refine.vue'
import { WishlistData } from '@/types/book'

@Component({
  components: { BookList, Refine }
})
export default class WishList extends Vue {
  @Prop({ default: {} })
  tsundokuData!: WishlistData

  flag: string = 'wishlist'

  bookCriteria: Array<string> = [
    'すべて表示',
    '論文',
    '同人誌',
    '書籍登録が早い順'
  ]
  defaultBookCriteria: string = 'すべて表示'

  mounted() {
    this.$nuxt.$emit('updatePageName', [
      { name: 'ホーム', path: '' },
      { name: '気になる本', path: '/list/wishlist' }
    ])
  }
}
</script>
