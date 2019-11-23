import { auth } from '~/plugins/firebase'

export const state = () => ({
  status: '',
  username: '',
  email: '',
  photoURL: '',
  uid: ''
})

export const getters = {
  isLoggedIn: state => state.status === 'loggedIn'
}

export const mutations = {
  setUser(state, user) {
    state.status = 'loggedIn'
    state.username = user.displayName
    state.email = user.email
    state.photoURL = user.photoURL
    state.uid = user.uid
  },
  logout(state) {
    state.status = 'loggedOut'
    state.username = ''
  }
}

export const actions = {
  gotUser({ commit }, user) {
    commit('setUser', user)
  },
  logout({ commit }) {
    auth.signOut().then(() => {
      commit('logout')
    })
  }
}
