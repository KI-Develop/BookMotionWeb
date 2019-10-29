<template>
  <div id="firebaseui-auth-container" />
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
            authProviders.Twitter
          ],
          signInSuccessUrl: '/list/tsundoku'
        }

        ui.start('#firebaseui-auth-container', config)
      } else {
        console.log('login else')
        // auth.signOut().then(() => {})
      }
    })
  }
}
</script>
