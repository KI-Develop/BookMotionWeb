<template>
  <div>
    <WishList :tsundoku-data="items" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import WishList from '@/components/organisms/WishList.vue'
import { WishlistData } from '@/types/book'

@Component({
  components: {
    WishList
  }
})
export default class Index extends Vue {
  items: WishlistData[] = [
    {
      id: 1234,
      title: 'Reactビギナーズガイド',
      authors: ['Stoyan Stefanov', 'ストヤンステファノフ'],
      description: 'コンポーネントベースのフロントエンド開発入門',
      bookImage:
        'https://www.oreilly.co.jp/books/images/picture_large978-4-87311-788-1.jpeg',
      memo: 'あればメモの機能でも追加しようか',
      createdAt: '2019/10/1'
    },
    {
      id: 5678,
      title: 'Vue.js入門',
      authors: ['川口和也', '喜多啓介', '野田陽平', '手島拓也', '片山真也'],
      description: '基礎から実践アプリケーション開発まで',
      bookImage:
        'https://images-na.ssl-images-amazon.com/images/I/81UcbR4B0YL.jpg',
      memo: 'あればメモの機能でも追加しようか',
      createdAt: '2019/10/1'
    },
    {
      id: 5678,
      title: '銀髪赤眼の後輩と学ぶ競技プログラミング',
      description: 'C++よくわからん',
      authors: ['碧黴(あおかび)'],
      bookImage:
        'https://booth.pximg.net/6d9c74b6-6c2b-43e7-8986-a7803573b1ef/i/1318168/9810d720-5474-4da1-b46d-63ff4970cd5a_base_resized.jpg',
      memo: 'あればメモの機能でも追加しようか',
      createdAt: '2019/10/1'
    }
  ]
  flag: string = 'wishlist'
}
</script>
