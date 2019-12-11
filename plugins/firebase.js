import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/analytics'
import config from '~/firebase.config'

if (!firebase.apps.length) {
  firebase.initializeApp(config)
  firebase.analytics()
}

export const authProviders = {
  Google: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  Twitter: firebase.auth.TwitterAuthProvider.PROVIDER_ID,
  Email: firebase.auth.EmailAuthProvider.PROVIDER_ID
}

export const auth = firebase.auth()

export const db = firebase.firestore()
