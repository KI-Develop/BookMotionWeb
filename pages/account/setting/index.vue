<template>
  <div>
    <Alert show-icon closable style="width:350px; margin:0 auto">
      テスト版ではユーザー情報の確認のみ可能です。
    </Alert>
    <br />
    <Card style="width:350px; margin:0 auto">
      <List item-layout="vertical">
        <ListItem>
          <ListItemMeta
            :avatar="this.$store.state.auth.photoURL"
            :title="this.$store.state.auth.username"
            :description="this.$store.state.auth.email"
          />
        </ListItem>
      </List>
    </Card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Index extends Vue {
  mounted() {
    this.$nuxt.$emit('updatePageName', [
      { name: 'アカウント', path: '', openName: '3' },
      { name: '基本設定', path: '/account/setting', activeName: '3-1' }
    ])
  }
}
</script>
