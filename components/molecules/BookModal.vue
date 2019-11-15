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
    <DatePicker type="date" placeholder="読書開始日" style="width: 200px" />
    <Icon type="ios-information-circle-outline" />
    <br />
    <span>読書終了予定日</span><Divider type="vertical" />
    <DatePicker type="date" placeholder="読書終了予定日" style="width: 200px" />
    <Icon type="ios-information-circle-outline" />
    <Divider />
    <span>しおり</span><Divider type="vertical" />
    <InputNumber v-model="value1" :max="10" :min="1" />
    <Icon type="ios-information-circle-outline" />
    <br />
    <span>総ページ数</span><Divider type="vertical" />
    <InputNumber v-model="value1" :max="10" :min="1" />
    <Icon type="ios-information-circle-outline" />
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

  value1: number = 0

  ok() {
    this.$emit('update:dialog', false)
    this.$emit(this.okEmitName)
  }
  cancel() {
    this.$emit('update:dialog', false)
  }
}
</script>
