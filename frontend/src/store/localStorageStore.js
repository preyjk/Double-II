export default {
  namespaced: true,
  state: {
    token: '',
    refreshToken: '',
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setRefreshToken(state, refreshToken) {
      state.refreshToken = refreshToken;
    },
  }
}
