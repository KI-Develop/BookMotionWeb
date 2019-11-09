<template>
  <!-- TODO: 中央寄せ or 二列にする -->
  <Card>
    <List item-layout="vertical">
      <ListItem v-for="(item, index) in items" :key="index">
        <ListItemMeta
          :title="item.title"
          :description="descriptionLength(item.description)"
        />
        <template v-if="item.authors">
          <span v-for="author in item.authors" :key="author.id">
            {{ author }}
          </span>
        </template>
        <p>{{ item.publishedDate }}</p>
        <template v-if="flag === 'tsundoku'">
          <template slot="action">
            <Progress
              :percent="item.achievementRate"
              :stroke-color="['#108ee9', '#87d068']"
            />
            <li>
              <Poptip trigger="hover" placement="right">
                <Icon type="ios-bookmark-outline" /> しおり:
                {{ item.currentPageCount }}
                <div slot="content">
                  <Input v-model="item.currentPageCount" type="number" />
                </div>
              </Poptip>
            </li>
            <li>
              <Icon type="ios-book-outline" /> 総ページ数:
              {{ item.totalPageCount }}
            </li>
            <li>
              <Icon type="md-create" />
              <nuxt-link :to="'tsundoku/' + item.id">
                編集
              </nuxt-link>
            </li>
          </template>
          <br />
          <br />
          <p>読書開始日: {{ item.readingStartDate }}</p>
          <p>読書終了日: {{ item.readingEndDate }}</p>
          <p>読書終了予定日: {{ item.readingEndExpectedDate }}</p>
        </template>
        <template v-if="flag === 'wishlist'">
          <br /><br />
          <p>メモ: {{ item.memo }}</p>
          <br />
          <p>追加日: {{ item.createdAt }}</p>
          <template slot="action">
            <!-- TODO: 気になる本からは消えることを警告する -->
            <li><Icon type="md-add" /> 積み本に追加</li>
            <li><Icon type="md-create" /> 編集</li>
            <li><Icon type="ios-remove-circle-outline" /> 削除</li>
          </template>
        </template>
        <template v-if="flag === 'search'">
          <template slot="action">
            <li @click="addTsundoku(item)">
              <Icon type="md-add" /> 積み本に追加
            </li>
            <li @click="addTsundoku(item)">
              <Icon type="md-add" /> 気になる本に追加
            </li>
          </template>
        </template>
        <template slot="extra">
          <img :src="item.bookImage" style="width: 170px" />
        </template>
      </ListItem>
    </List>
  </Card>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { BookData } from '@/types/book'

@Component
export default class BookList extends Vue {
  @Prop({ default: {} })
  items!: BookData[]
  @Prop({ default: '' })
  flag!: string

  value8: number = 300

  descriptionLength(description: string): string {
    if (description) {
      return description.length >= 200
        ? description.slice(0, 150) + '...'
        : description
    }
    return description
  }

  addWishlist(item: any): void {
    // TODO: dbに追加
    alert(item.selfLink)
  }

  addTsundoku(item: any): void {
    // TODO: dbに追加
    alert(item.selfLink)
  }
}
</script>
