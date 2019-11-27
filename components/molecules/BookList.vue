<template>
  <div>
    <Card>
      <List item-layout="vertical">
        <ListItem v-for="(item, index) in items" :key="index">
          <ListItemMeta
            :title="item.title"
            :description="descriptionLength(item.description)"
          />
          <template v-if="item.authors[0]">
            著者:
            <span v-for="author in item.authors" :key="author.id">
              {{ author }}
            </span>
          </template>
          <template v-if="item.publisher">
            <p>出版社: {{ item.publisher }}</p>
          </template>
          <template v-if="item.publishedDate">
            <p>出版: {{ item.publishedDate }}</p>
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
                <Dropdown trigger="click">
                  <Icon type="ios-settings" />
                  <Icon type="ios-arrow-down" size="8" />
                  <DropdownMenu slot="list">
                    <div @click="editTsundoku(item)">
                      <DropdownItem name="edit">
                        <Icon type="md-create" />
                        編集
                      </DropdownItem>
                    </div>
                    <DropdownItem name="delete">
                      <div @click="removeTsundoku(item)">
                        <Icon type="ios-trash" />
                        削除
                      </div>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </li>
            </template>
            <br />
            <br />
            <p>読書開始日: {{ _fromTimeStampToDate(item.readingStartDate) }}</p>
            <p>
              読書終了予定日:
              {{ _fromTimeStampToDate(item.readingEndExpectedDate) }}
            </p>
          </template>
          <template v-if="flag === 'wishlist'">
            <br />
            <p>追加日: {{ _fromTimeStampToDate(item.createdAt) }}</p>
            <template slot="action">
              <li @click="addTsundoku(item)">
                <Icon type="md-add" /> 積み本に追加
              </li>
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
    <br />
    <Button
      v-if="items.length % 10 === 0"
      type="primary"
      long
      :loading="loadingFlag"
      @click="loadMore"
    >
      <span v-if="!loadingFlag">さらに読み込む</span>
      <span v-else>Loading...</span>
    </Button>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { BookData, SearchData } from '@/types/book'
import { fromTimeStampToDate } from '~/api/index'

@Component
export default class BookList extends Vue {
  @Prop({ default: {} })
  items!: BookData[]
  @Prop({ default: '' })
  flag!: string
  @Prop({ default: false })
  loadingFlag!: boolean

  _fromTimeStampToDate(date: any) {
    return fromTimeStampToDate(date)
  }

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
  removeTsundoku(item: any): void {
    if (this.flag === 'tsundoku') {
      this.$emit('tsunRemoveTsundoku', item)
    }
  }
  editTsundoku(item: any): void {
    if (this.flag === 'tsundoku') {
      this.$emit('tsunEditTsundoku', item)
    }
  }
  dropdownItemClick(name: any) {
    console.log(name)
  }

  loadMore() {
    if (this.flag === 'tsundoku') {
      this.$emit('tsunLoadMore', this.items.slice(-1)[0])
    }
    if (this.flag === 'wishlist') {
      this.$emit('wishLoadMore', this.items.slice(-1)[0])
    }
  }
}
</script>
