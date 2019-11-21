<template>
  <Modal v-model="dialog" :closable="false" :mask-closable="false">
    <p slot="header" style="text-align:center">
      <span>{{ title }}</span>
    </p>
    <Form
      ref="formValidate"
      :model="formValidate"
      :rules="ruleValidate"
      :label-width="110"
      label="Name"
      prop="name"
    >
      <FormItem label="読書開始日" prop="readingStartDate">
        <DatePicker
          v-model="readingStartDate"
          type="date"
          placeholder="読書開始日"
          style="width: 200px"
        />
      </FormItem>
      <FormItem label="読書終了予定日" prop="readingEndExpectedDate">
        <DatePicker
          v-model="readingEndExpectedDate"
          type="date"
          placeholder="読書開始日"
          style="width: 200px"
        />
        <Icon type="ios-information-circle-outline" />
      </FormItem>
      <FormItem label="しおり" prop="title">
        <InputNumber v-model="currentPageCount" :max="10000" :min="0" />
        <Icon type="ios-information-circle-outline" />
      </FormItem>
      <FormItem label="総ページ数" prop="title">
        <InputNumber v-model="totalPageCount" :max="10000" :min="0" />
        <Icon type="ios-information-circle-outline" />
      </FormItem>
    </Form>
    <div slot="footer">
      <Button size="large" @click="cancel">
        キャンセル
      </Button>
      <Button
        type="primary"
        size="large"
        ghost
        @click="handleSubmit('formValidate')"
      >
        登録
      </Button>
    </div>
  </Modal>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class BookModal extends Vue {
  @Prop({ default: '' })
  okEmitName!: string

  @Prop({ default: false })
  dialog!: boolean

  @Prop({ default: {} })
  item!: any

  @Prop({ default: '' })
  title!: string

  _totalPageCount: number = 0

  formValidate: any = {
    readingStartDate: '',
    readingEndExpectedDate: '',
    currentPageCount: 0,
    item: []
  }

  get readingStartDate() {
    return this.item.readingStartDate
  }
  set readingStartDate(readingStartDate: string) {
    this.formValidate.readingStartDate = readingStartDate
  }

  get readingEndExpectedDate() {
    return this.item.readingEndExpectedDate
  }
  set readingEndExpectedDate(readingEndExpectedDate: string) {
    this.formValidate.readingEndExpectedDate = readingEndExpectedDate
  }

  get currentPageCount() {
    return this.item.currentPageCount || 0
  }
  set currentPageCount(currentPageCount: number) {
    this.formValidate.currentPageCount = currentPageCount
  }

  get totalPageCount() {
    return this.item.totalPageCount
  }
  set totalPageCount(totalPageCount: number) {
    this._totalPageCount = totalPageCount
  }

  ruleValidate: any = {
    readingStartDate: [
      {
        required: true,
        type: 'date',
        message: '読書開始日を選択してください。'
      }
    ],
    readingEndExpectedDate: [
      {
        required: true,
        type: 'date',
        message: '読書終了予定日を選択してください。'
      }
    ]
  }

  handleSubmit(name: string): void {
    this.$refs[name].validate(valid => {
      if (valid) {
        if (this.item) {
          this.formValidate.item = this.item
        }
        this.item.totalPageCount =
          this._totalPageCount || this.item.totalPageCount
        this.$emit('update:dialog', false)
        this.$emit(this.okEmitName, this.formValidate)
      }
    })
    this.formValidateClear()
  }
  cancel(): void {
    this.$emit('update:dialog', false)
    this.formValidateClear()
  }

  formValidateClear() {
    this.formValidate.readingStartDate = ''
    this.formValidate.readingEndExpectedDate = ''
    this.formValidate.currentPageCount = 0
    this.formValidate.item = []
  }
}
</script>
