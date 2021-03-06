export const state = () => ({
  counter: 0
})

export const mutations = {
  increment (state) {
    state.counter++
  }
}

export const actions = {
  async nuxtServerInit ({ dispatch }) {
    await dispatch('menus/GET_MENUS')
  }
}
