<template>
  <div>
    <Refine
      :display-criteria="bookCriteria"
      :default-criteria="defaultBookCriteria"
    />
    <br />
    <br />
    <Scroll :on-reach-bottom="handleReachBottom" :height="height - 180">
      <BookList :items="tsundokuData" :flag="flag" />
    </Scroll>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import BookList from '@/components/molecules/BookList.vue'
import Refine from '@/components/molecules/Refine.vue'
import { TsundokuData } from '@/types/book'

@Component({
  components: {
    BookList,
    Refine
  }
})
export default class Index extends Vue {
  @Prop({ default: {} })
  tsundokuData!: TsundokuData

  flag: string = 'tsundoku'
  height: number = window.innerHeight
  bookCriteria: Array<string> = [
    'すべて表示',
    '論文',
    '同人誌',
    '読書終了予定日が近い順',
    '読了達成率が高い順',
    '読了達成率が低い順',
    '読書開始日が早い順'
  ]
  defaultBookCriteria: string = 'すべて表示'

  mounted() {
    this.$nuxt.$emit('updatePageName', [
      { name: '書籍一覧', path: '' },
      { name: '積み本', path: '/list/tsundoku' }
    ])
    window.addEventListener('resize', this.handleResize)
  }

  handleResize() {
    this.height = window.innerHeight
  }

  handleReachBottom() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, 2000)
    })
  }
}
</script>
