<template>
  <div>
    <Row>
      <Finish
        v-if="finishData.length"
        :finish-data="finishData"
        @updateFinishBook="getBookData"
      />
      <i-col>
        <Spin v-if="spinShow" size="large" fix>
          <Icon type="ios-loading" size="18" class="demo-spin-icon-load" />
          <div>Loading...</div>
        </Spin>
      </i-col>
      <template v-if="!finishData.length && spinShow == false">
        <Alert show-icon closable style="width:350px; margin:0 auto">
          読み終えた本はありません。
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
import { getFinishBookData } from '~/api'
import { TsundokuData } from '@/types/book'
import Finish from '~/components/organisms/FinishBook.vue'

@Component({
  components: {
    Finish
  }
})
export default class Index extends Vue {
  // TODO: 型変える
  finishData: TsundokuData[] = []
  spinShow: boolean = false

  created() {
    this.getBookData()
  }

  mounted() {
    this.$nuxt.$emit('updatePageName', [
      { name: 'ホーム', path: '', openName: '1' },
      { name: '読み終えた本', path: '/home/finish', activeName: '1-3' }
    ])
  }

  async getBookData() {
    this.spinShow = true
    this.finishData = []

    await getFinishBookData(this.$store.state.auth.uid)
      .then(res => {
        res.docs.map(snapShot => {
          const data = snapShot.data()
          this.finishData.push({
            id: snapShot.id,
            title: data.items.title,
            authors: data.items.authors,
            description: data.items.description,
            bookImage: data.items.bookImage,
            publishedDate: data.items.publishedDate,
            publisher: data.items.publisher,
            readingStartDate: data.readingStartDate,
            readingEndExpectedDate: data.readingEndExpectedDate,
            currentPageCount: data.currentPageCount,
            totalPageCount: data.items.totalPageCount,
            createdAt: data.createdAt
          })
        })
      })
      .catch(err => {
        console.log(err)
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
