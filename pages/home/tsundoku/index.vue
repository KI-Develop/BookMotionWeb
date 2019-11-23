<template>
  <div>
    <Row>
      <Tsundoku v-if="items.length" :tsundoku-data="items" />
      <i-col>
        <Spin v-if="spinShow" size="large" fix>
          <Icon type="ios-loading" size="18" class="demo-spin-icon-load" />
          <div>Loading...</div>
        </Spin>
      </i-col>
      <template v-if="!items.length && spinShow == false">
        <Alert show-icon closable style="width:350px; margin:0 auto">
          積み本はありません。
          <span slot="desc">
            積みたい本を
            <nuxt-link to="/register/searchdb"> データベース </nuxt-link>
            から登録する
          </span>
        </Alert>
        <br />
        <Alert
          type="warning"
          show-icon
          closable
          style="width:350px; margin:0 auto"
        >
          Sorry ...
          <span slot="desc">
            ページを再リロードすると表示されないエラーが起きています。
            <br />
            全力でバグを潰しますので少々お待ちください。
          </span>
        </Alert>
      </template>
    </Row>
  </div>
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
  spinShow: boolean = false

  created() {
    this.getTsundokuData()
  }

  mounted() {
    this.$nuxt.$emit('updatePageName', [
      { name: 'ホーム', path: '' },
      { name: '積み本', path: '/home/tsundoku' }
    ])
  }

  fromTimeStampToDate(date: any): string {
    const d = new Date(date.seconds * 1000)
    const year = d.getFullYear()
    const month = `0${d.getMonth() + 1}`.slice(-2)
    const day = `0${d.getDate()}`.slice(-2)
    return `${year}-${month}-${day}`
  }

  async getTsundokuData() {
    this.spinShow = true
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
        readingEndExpectedDate: this.fromTimeStampToDate(
          data.readingEndExpectedDate
        ),
        currentPageCount: data.currentPageCount,
        totalPageCount: data.items.totalPageCount
      })
    })
    this.spinShow = false
  }
}
</script>
<style scoped>
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
</style>
