<template>
  <Modal v-model="dialog" :closable="false" :mask-closable="false" width="360">
    <p slot="header" style="color:#f60;text-align:center">
      <Icon type="ios-information-circle" />
      <span>気になる本を削除</span>
    </p>
    <div style="text-align:center">
      <p>
        本当にこの『気になる本』を削除してもよろしいですか？
      </p>
    </div>
    <div slot="footer">
      <Button size="large" @click="cancel">
        キャンセル
      </Button>
      <Button type="error" size="large" ghost @click="remove">
        削除
      </Button>
    </div>
  </Modal>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class RemoveModal extends Vue {
  @Prop({ default: '' })
  removeEmitName!: string

  @Prop({ default: {} })
  item!: any

  @Prop({ default: false })
  dialog!: boolean

  remove(): void {
    this.$emit('update:dialog', false)
    this.$emit(this.removeEmitName, this.item)
  }

  cancel(): void {
    this.$emit('update:dialog', false)
  }
}
</script>
