import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import config from '~/firebase.config'

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export const authProviders = {
  Google: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  Facebook: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  Twitter: firebase.auth.TwitterAuthProvider.PROVIDER_ID
}

export const auth = firebase.auth()

export const db = firebase.firestore()
