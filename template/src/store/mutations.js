export default {
  SET_SOMETHING(state, payload) {
    state.something = payload
    state.history.push('something') // ?
  }
}
