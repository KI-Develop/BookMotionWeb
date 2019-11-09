<template>
  <div>
    <Refine
      :display-criteria="bookCriteria"
      :default-criteria="defaultBookCriteria"
    />
    <br />
    <br />
    <!-- <Scroll :on-reach-bottom="handleReachBottom" :height="height - 180"> -->
    <BookList :items="tsundokuData" :flag="flag" />
    <!-- </Scroll> -->
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
  // height: number = window.innerHeight

  bookCriteria: Array<string> = [
    'すべて表示',
    '論文',
    '同人誌',
    '書籍登録が早い順'
  ]
  defaultBookCriteria: string = 'すべて表示'

  // handleResize() {
  //   this.height = window.innerHeight
  // }

  handleReachBottom() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, 2000)
    })
  }

  mounted() {
    this.$nuxt.$emit('updatePageName', [
      { name: '書籍一覧', path: '' },
      { name: '気になる本', path: '/list/wishlist' }
    ])
    // window.addEventListener('resize', this.handleResize)
  }
}
</script>
