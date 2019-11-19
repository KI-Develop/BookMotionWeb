<template>
  <Modal
    v-model="dialog"
    ok-text="登録"
    cancel-text="キャンセル"
    title="詳細設定"
    @on-ok="ok"
    @on-cancel="cancel"
  >
    <span>読書開始日</span><Divider type="vertical" />
    <DatePicker
      v-model="formValidate.readingStartDate"
      type="date"
      placeholder="読書開始日"
      style="width: 200px"
    />
    <Icon type="ios-information-circle-outline" />
    <br />
    <span>読書終了予定日</span><Divider type="vertical" />
    <DatePicker
      v-model="formValidate.readingEndDate"
      type="date"
      placeholder="読書終了予定日"
      style="width: 200px"
    />
    <Icon type="ios-information-circle-outline" />
    <Divider />
    <span>しおり</span><Divider type="vertical" />
    <InputNumber
      v-model="formValidate.currentPageCount"
      :max="10000"
      :min="0"
    />
    <Icon type="ios-information-circle-outline" />
    <br />
    <template v-if="!totalPageCount">
      <span>総ページ数</span><Divider type="vertical" />
      <InputNumber v-model="manuTotalPageCount" :max="10000" :min="0" />
      <Icon type="ios-information-circle-outline" />
    </template>
  </Modal>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class BookModal extends Vue {
  @Prop({ default: '' })
  okEmitName!: string

  @Prop({ default: '' })
  cancelEmitName!: string

  @Prop({ default: false })
  dialog!: boolean

  @Prop({ default: {} })
  item!: any

  @Prop({ default: 0 })
  totalPageCount!: number

  manuTotalPageCount: number = 0

  formValidate: any = {
    readingStartDate: '',
    readingEndDate: '',
    currentPageCount: 0,
    item: []
  }

  ok() {
    if (this.item) {
      this.formValidate.item = this.item
    }
    if (this.totalPageCount) {
      this.item.totalPageCount = this.totalPageCount
    } else {
      this.item.totalPageCount = this.manuTotalPageCount
    }
    console.log(this.formValidate)
    this.$emit('update:dialog', false)
    this.$emit(this.okEmitName, this.formValidate)
  }
  cancel() {
    this.$emit('update:dialog', false)
  }
}
</script>
