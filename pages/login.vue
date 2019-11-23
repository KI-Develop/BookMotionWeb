<template>
  <div>
    <Alert show-icon type="warning" style="width:350px; margin:0 auto">
      ご登録の前に
      <a href="https://ki-develop.github.io/BookMotion_LP/terms.html">
        利用規約
      </a>
      をお読みください
    </Alert>
    <br />
    <Alert show-icon closable style="width:350px; margin:0 auto">
      テスト版ではgoogleログインとメールでのログインのみ可能です。
    </Alert>
    <br />
    <Card style="width:350px; margin: 0 auto">
      <p slot="title">
        ログイン
      </p>
      <div id="firebaseui-auth-container" />
    </Card>
  </div>
</template>

<script>
import { auth, authProviders } from '~/plugins/firebase'

export default {
  layout: 'login',
  mounted() {
    const firebaseui = require('firebaseui-ja')

    auth.onAuthStateChanged(user => {
      if (!user) {
        const ui =
          firebaseui.auth.AuthUI.getInstance() ||
          new firebaseui.auth.AuthUI(auth)

        const config = {
          signInOptions: [
            authProviders.Google,
            authProviders.Facebook,
            authProviders.Twitter,
            authProviders.Email
          ],
          signInSuccessUrl: '/list/tsundoku'
        }

        ui.start('#firebaseui-auth-container', config)
      } else {
        this.$router.push('/list/tsundoku')
      }
    })
  }
}
</script>
