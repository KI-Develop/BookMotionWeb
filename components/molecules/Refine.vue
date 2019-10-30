<template>
  <Select
    v-model="defaultCriteriaData"
    style="width:260px"
    placeholder="絞り込み"
  >
    <Option v-for="item in displayCriteria" :key="item.id" :value="item">
      {{ item }}
    </Option>
  </Select>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Refine extends Vue {
  @Prop({ default: {} })
  displayCriteria!: Array<string>
  @Prop({ default: '' })
  defaultCriteria!: string

  defaultCriteriaData: string = this.defaultCriteria
}
</script>
