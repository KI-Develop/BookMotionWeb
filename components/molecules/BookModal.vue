<template>
  <Modal v-model="dialog" :closable="false">
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
          v-model="formValidate.readingStartDate"
          type="date"
          placeholder="読書開始日"
          style="width: 200px"
        />
      </FormItem>
      <FormItem label="読書終了予定日" prop="readingEndDate">
        <DatePicker
          v-model="formValidate.readingEndDate"
          type="date"
          placeholder="読書開始日"
          style="width: 200px"
        />
        <Icon type="ios-information-circle-outline" />
      </FormItem>
      <FormItem label="しおり" prop="title">
        <InputNumber
          v-model="formValidate.currentPageCount"
          :max="10000"
          :min="0"
        />
        <Icon type="ios-information-circle-outline" />
      </FormItem>
      <FormItem v-if="!totalPageCount" label="総ページ数" prop="title">
        <InputNumber v-model="manuTotalPageCount" :max="10000" :min="0" />
        <Icon type="ios-information-circle-outline" />
      </FormItem>
    </Form>
    <!-- <span>読書開始日</span><Divider type="vertical" />
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
    </template> -->
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

  @Prop({ default: '' })
  cancelEmitName!: string

  @Prop({ default: false })
  dialog!: boolean

  @Prop({ default: {} })
  item!: any

  @Prop({ default: '' })
  title!: string

  @Prop({ default: 0 })
  totalPageCount!: number

  manuTotalPageCount: number = 0

  formValidate: any = {
    readingStartDate: '',
    readingEndDate: '',
    currentPageCount: 0,
    item: []
  }
  ruleValidate: any = {
    readingStartDate: [
      {
        required: true,
        type: 'date',
        message: '読書開始日を選択してください。',
        trigger: 'change'
      }
    ],
    readingEndDate: [
      {
        required: true,
        type: 'date',
        message: '読書終了予定日を選択してください。',
        trigger: 'change'
      }
    ]
  }

  handleSubmit(name: string): void {
    this.$refs[name].validate(valid => {
      if (valid) {
        if (this.item) {
          this.formValidate.item = this.item
        }
        if (this.totalPageCount) {
          this.item.totalPageCount = this.totalPageCount
        } else {
          this.item.totalPageCount = this.manuTotalPageCount
        }
        this.$emit('update:dialog', false)
        this.$emit(this.okEmitName, this.formValidate)
      }
    })
  }
  cancel(): void {
    this.$emit('update:dialog', false)
  }
}
</script>
