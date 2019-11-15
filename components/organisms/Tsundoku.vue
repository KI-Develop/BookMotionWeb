<template>
  <div>
    <Refine
      :display-criteria="bookCriteria"
      :default-criteria="defaultBookCriteria"
    />
    <br />
    <br />
    <BookList :items="tsundokuData" :flag="flag" />
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
  }
}
</script>
