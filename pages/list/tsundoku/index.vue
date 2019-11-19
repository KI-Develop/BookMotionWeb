<template>
  <Tsundoku :tsundoku-data="items" />
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Tsundoku from '~/components/organisms/Tsundoku.vue'
import { TsundokuData } from '@/types/book'
import { db } from '~/plugins/firebase'

@Component({
  components: {
    Tsundoku
  }
})
export default class Index extends Vue {
  items: TsundokuData[] = []
  achievementRate: number = 0

  created() {
    this.getTsundokuData()
  }
  fromTimeStampToDate(date: any): string {
    const d = new Date(date.seconds * 1000)
    const year = d.getFullYear()
    const month = `0${d.getMonth() + 1}`.slice(-2)
    const day = `0${d.getDate()}`.slice(-2)
    return `${year}-${month}-${day}`
  }

  async getTsundokuData() {
    const snapShot = await db
      .collection('books')
      .where('userId', '==', this.$store.state.auth.uid)
      .where('bookStatus', '==', 'tsundoku')
      .get()
    snapShot.forEach(doc => {
      const data = doc.data()

      this.items.push({
        id: doc.id,
        title: data.items.title,
        authors: data.items.authors,
        description: data.items.description,
        bookImage: data.items.bookImage,
        publishedDate: data.items.publishedDate,
        publisher: data.items.publisher,

        readingStartDate: this.fromTimeStampToDate(data.readingStartDate),
        readingEndDate: '',
        readingEndExpectedDate: this.fromTimeStampToDate(data.readingEndDate),
        currentPageCount: data.currentPageCount,
        totalPageCount: data.items.totalPageCount
      })
    })
  }
}
</script>
