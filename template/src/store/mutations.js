import {
  set
} from 'vue'

export default {
  SET_SOMETHING(state, payload) {
    state.something = payload;
  }
}
