<template>
  <div>
    <Card>
      <List item-layout="vertical">
        <ListItem v-for="(item, index) in items" :key="index">
          <ListItemMeta
            :title="item.title"
            :description="descriptionLength(item.description)"
          />
          <template v-if="item.authors">
            著者:
            <span v-for="author in item.authors" :key="author.id">
              {{ author }}
            </span>
          </template>
          <template v-if="item.publisher">
            <p>出版社: {{ item.publisher }}</p>
          </template>
          <template v-if="item.publishedDate">
            <p>出版日: {{ item.publishedDate }}</p>
          </template>
          <template v-if="flag === 'tsundoku'">
            <template slot="action">
              <Progress
                v-if="item.totalPageCount"
                :percent="
                  achievementRate(item.currentPageCount, item.totalPageCount)
                "
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
            <br />
            <p>追加日: {{ item.createdAt }}</p>
            <template slot="action">
              <!-- TODO: 気になる本からは消えることを警告する -->
              <li @click="addTsundoku(item)">
                <Icon type="md-add" /> 積み本に追加
              </li>
              <li><Icon type="md-create" /> 編集</li>
              <li @click="removeWishlist(item)">
                <Icon type="ios-remove-circle-outline" />
                削除
              </li>
            </template>
          </template>
          <template v-if="flag === 'search'">
            <template slot="action">
              <li @click="addTsundoku(item)">
                <Icon type="md-add" /> 積み本に追加
              </li>
              <li @click="addWishlist(item)">
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
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { BookData, SearchData } from '@/types/book'

@Component
export default class BookList extends Vue {
  @Prop({ default: {} })
  items!: BookData[]
  @Prop({ default: '' })
  flag!: string

  achievementRate(currentPageCount: number, totalPageCount: number) {
    return Math.round((currentPageCount / totalPageCount) * 100)
  }

  descriptionLength(description: string): string {
    if (description) {
      return description.length >= 200
        ? description.slice(0, 150) + '...'
        : description
    }
    return description
  }

  addTsundoku(item: any): void {
    if (this.flag === 'search') {
      this.$emit('searchAddTsundoku', item)
    }
    if (this.flag === 'wishlist') {
      this.$emit('wishAddTsundoku', item)
    }
  }
  addWishlist(item: SearchData): void {
    if (this.flag === 'search') {
      this.$emit('searchAddWishlist', item)
    }
  }
  removeWishlist(item: any): void {
    if (this.flag === 'wishlist') {
      this.$emit('wishRemoveWishlist', item)
    }
  }
}
</script>
