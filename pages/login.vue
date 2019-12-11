<template>
  <div>
    <Alert show-icon type="warning" style="width:350px; margin:0 auto">
      ご利用に際しては、
      <a href="https://ki-develop.github.io/BookMotion_LP/terms.html">
        利用規約
      </a>
      及び
      <a href="https://ki-develop.github.io/BookMotion_LP/privacy.html">
        プライバシーポリシー
      </a>
      に同意したことになります。
    </Alert>
    <br />
    <Alert show-icon style="width:350px; margin:0 auto">
      現在β版での公開の為、動作が不安定になる可能性があります
    </Alert>
    <br />
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
            authProviders.Twitter,
            authProviders.Email
          ],
          signInSuccessUrl: '/home/tsundoku'
        }

        ui.start('#firebaseui-auth-container', config)
      } else {
        this.$router.push('/home/tsundoku')
      }
    })
  }
}
</script>
