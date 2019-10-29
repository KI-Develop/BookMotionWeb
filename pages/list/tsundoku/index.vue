<template>
  <div>
    <Select v-model="model10" style="width:260px" placeholder="絞り込み">
      <Option
        v-for="item in displayCriteria"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </Option>
    </Select>
    <br />
    <br />
    <Scroll :on-reach-bottom="handleReachBottom" :height="height - 180">
      <Card>
        <List item-layout="vertical">
          <ListItem v-for="item in data" :key="item.title">
            <ListItemMeta :title="item.title" :description="item.description" />
            <template slot="action">
              <Progress
                :percent="item.achievementRate"
                :stroke-color="['#108ee9', '#87d068']"
              />
              <li>
                <Icon type="ios-bookmark-outline" /> しおり:
                {{ item.currentPageCount }}
              </li>
              <li>
                <Icon type="ios-book-outline" /> 総ページ数:
                {{ item.totalPageCount }}
              </li>
              <br />
              <li>
                <Icon type="ios-build-outline" />
                <nuxt-link :to="'tsundoku/' + item.id">
                  編集
                </nuxt-link>
              </li>
            </template>
            <template>
              著者名:
              <span
                v-for="author in item.authors"
                :key="author.id"
                style="opacity:0.7"
              >
                {{ author }}
              </span>
            </template>
            <br />
            <br />
            <p>読書開始日: {{ item.readingStartDate }}</p>
            <p>読書終了日: {{ item.readingEndDate }}</p>
            <p>読書終了予定日: {{ item.readingEndExpectedDate }}</p>
            <template slot="extra">
              <img :src="item.bookImage" style="width: 180px" />
            </template>
          </ListItem>
        </List>
      </Card>
    </Scroll>
  </div>
</template>

<script>
export default {
  data() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      data: [
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
          title:
            'Selection and interpretation of diagnostic tests and procedures',
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
      ],
      kariData: [{}],
      displayCriteria: [
        {
          value: 'すべて表示',
          label: 'すべて表示'
        },
        {
          value: '論文',
          label: '論文'
        },
        {
          value: '同人誌',
          label: '同人誌'
        },
        {
          value: '読書終了予定日が近い順',
          label: '読書終了予定日が近い順'
        },
        {
          value: '読了達成率が高い順',
          label: '読了達成率が高い順'
        },
        {
          value: '読了達成率が低い順',
          label: '読了達成率が低い順'
        },
        {
          value: '読書開始日が早い順',
          label: '読書開始日が早い順'
        }
      ],
      model10: 'すべて表示'
    }
  },
  computed: {
    hogemaru() {
      return window.innerHeight
    }
  },
  mounted() {
    this.$nuxt.$emit('updatePageName', [
      { name: '書籍一覧', path: '' },
      { name: '積み本', path: '/list/tsundoku' }
    ])
    window.addEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.width = window.innerWidth
      this.height = window.innerHeight
    },

    handleReachBottom() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, 2000)
      })
    }
  }
}
</script>
