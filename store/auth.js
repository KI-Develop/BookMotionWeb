import { auth } from '~/plugins/firebase'

export const state = () => ({
  status: '',
  username: '',
  uid: ''
})

export const getters = {
  isLoggedIn: state => state.status === 'loggedIn'
}

export const mutations = {
  setUser(state, user) {
    state.status = 'loggedIn'
    state.username = user.displayName
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
