import { auth } from '~/plugins/firebase'

export default function({ route, redirect, store }) {
  // storeにユーザー情報がない時(pageリロード)にfirebase auth発火
  if (store.state.auth.status !== 'loggedIn') {
    auth.onAuthStateChanged(user => {
      if (user) {
        store.dispatch('auth/gotUser', user)
      } else {
        if (route.name !== 'login') {
          window.location.href = '/login'
        }
        return new Promise(resolve => {
          // Wait for broswer to redirect...
        })
      }
    })
  }
}
