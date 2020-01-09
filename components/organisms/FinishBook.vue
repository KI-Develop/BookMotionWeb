<template>
  <div>
    <Refine
      :display-criteria="bookCriteria"
      :default-criteria="defaultBookCriteria"
    />
    <br />
    <br />
    <BookList
      :items="finishData"
      flag="finish"
      :loading-flag="false"
      @archive="archive"
    />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { updateFinishBookArchive } from '~/api'
import BookList from '~/components/molecules/BookList.vue'
import Refine from '~/components/molecules/Refine.vue'
@Component({
  components: {
    BookList,
    Refine
  }
})
export default class FinishBook extends Vue {
  @Prop({ default: {} })
  finishData!: any
  bookCriteria: Array<string> = ['すべて表示', 'アーカイブ済']
  defaultBookCriteria: string = 'すべて表示'
  archive(item: any) {
    updateFinishBookArchive(item.id)
      .then(() => {
        this.$emit('updateFinishBook')
        this.$Notice.success({ title: 'アーカイブしました。' })
      })
      .catch(err => {
        console.log(err)
        this.$Notice.success({ title: 'アーカイブに失敗しました。' })
      })
  }
}
</script>
