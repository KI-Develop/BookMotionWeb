<template>
  <i-input v-model="keyword" :placeholder="select">
    <span slot="prepend">{{ option }}</span>
    <Button slot="append" :icon="buttonIcon" @click="onKeywordChanged" />
  </i-input>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Search extends Vue {
  @Prop({ default: '' })
  option!: string

  @Prop({ default: '' })
  select!: string

  @Prop({ default: '' })
  buttonIcon!: string

  @Prop({ default: '' })
  emitName!: string

  keyword: string = ''

  onKeywordChanged() {
    this.$emit(this.emitName, this.keyword)
  }
}
</script>
