<template>
  <Tsundoku :tsundoku-data="item" />
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Tsundoku from '~/components/organisms/Tsundoku.vue'
import { TsundokuData } from '@/types/book'

@Component({
  components: {
    Tsundoku
  }
})
export default class Index extends Vue {
  item: TsundokuData[] = [
    {
      id: 1234,
      title: 'Reactビギナーズガイド',
      authors: ['Stoyan Stefanov', 'ストヤンステファノフ'],
      description: 'コンポーネントベースのフロントエンド開発入門',
      bookImage:
        'https://www.oreilly.co.jp/books/images/picture_large978-4-87311-788-1.jpeg',
      readingStartDate: '2019/7/1',
      readingEndDate: '読書中',
      readingEndExpectedDate: '2019/10/25',
      achievementRate: 80.64,
      currentPageCount: 200,
      totalPageCount: 248
    },
    {
      id: 5678,
      title: 'Vue.js入門',
      authors: ['川口和也', '喜多啓介', '野田陽平', '手島拓也', '片山真也'],
      description: '基礎から実践アプリケーション開発まで',
      bookImage:
        'https://images-na.ssl-images-amazon.com/images/I/81UcbR4B0YL.jpg',
      readingStartDate: '2019/7/1',
      readingEndDate: '読書中',
      readingEndExpectedDate: '2019/10/25',
      achievementRate: 43.19,
      currentPageCount: 200,
      totalPageCount: 463
    },
    {
      id: 5678,
      title: '銀髪赤眼の後輩と学ぶ競技プログラミング',
      description: 'C++よくわからん',
      authors: ['碧黴(あおかび)'],
      bookImage:
        'https://booth.pximg.net/6d9c74b6-6c2b-43e7-8986-a7803573b1ef/i/1318168/9810d720-5474-4da1-b46d-63ff4970cd5a_base_resized.jpg',
      readingStartDate: '2019/7/1',
      readingEndDate: '読書中',
      readingEndExpectedDate: '2019/10/25',
      achievementRate: 75.75,
      currentPageCount: 50,
      totalPageCount: 66
    },
    {
      id: 5678,
      title: 'Unity5 3D/2Dゲーム開発実践入門',
      authors: ['吉谷幹人'],
      description: '作りながら覚えるスマートフォンゲーム制作',
      bookImage:
        'https://images-na.ssl-images-amazon.com/images/I/61A1oINIeWL._SX258_BO1,204,203,200_.jpg',
      readingStartDate: '2019/7/1',
      readingEndDate: '2019/10/25',
      readingEndExpectedDate: '2019/10/25',
      achievementRate: 100,
      currentPageCount: 391,
      totalPageCount: 391
    },
    {
      id: 5678,
      title:
        '幼稚園教育場面にみる学校的相互行為─第二次的社会化の原初形態としての「学校的社会化」という観点から─',
      authors: ['山田 鋭生', '小野 奈生子'],
      description:
        '本稿の目的は，幼稚園における実践を「学校的社会化」という観点からとらえることにある。...',
      bookImage: '',
      readingStartDate: '2019/7/1',
      readingEndDate: '読書中',
      readingEndExpectedDate: '2019/10/25',
      achievementRate: 0,
      currentPageCount: 0,
      totalPageCount: 124
    },
    {
      id: 5678,
      title: 'Selection and interpretation of diagnostic tests and procedures',
      authors: [
        'P. F. Griner',
        'R. J. Mayewski',
        'A. I. Mushlin',
        'P. Greenland'
      ],
      description:
        'The proper selection and interpretation of diagnostic tests and procedures can be guided by the...',
      bookImage: '',
      readingStartDate: '2019/7/1',
      readingEndDate: '読書中',
      readingEndExpectedDate: '2019/10/25',
      achievementRate: 10.63,
      currentPageCount: 10,
      totalPageCount: 94
    }
  ]
}
</script>
