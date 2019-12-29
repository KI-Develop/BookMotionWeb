<template>
  <div>
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
    <br />
    <Card style="width:350px; margin:0 auto">
      <p slot="title">
        アカウントを削除
      </p>
      <p>
        アカウント削除と同時にすべての登録している書籍データが削除され復元はできません。
      </p>
      <br />
      <Button type="error" @click="removeDialog = true">
        アカウント削除
      </Button>
    </Card>
    <RemoveModal
      :dialog.sync="removeDialog"
      :item="{}"
      remove-name="アカウント"
      remove-emit-name="accountRemove"
      @accountRemove="remove"
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import RemoveModal from '~/components/molecules/RemoveModal.vue'
import { auth } from '~/plugins/firebase'

@Component({
  components: {
    RemoveModal
  }
})
export default class Index extends Vue {
  removeDialog: boolean = false

  mounted() {
    this.$nuxt.$emit('updatePageName', [
      { name: 'アカウント', path: '', openName: '3' },
      { name: '基本設定', path: '/account/setting', activeName: '3-1' }
    ])
  }

  async remove() {
    const user = auth.currentUser
    if (user) {
      await user
        .delete()
        .then(async () => {})
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
