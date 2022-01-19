import { getPostByIdAPI } from '@/api/bbs'

function getDefaultState() {
  return localStorage.bbsState
    ? JSON.parse(localStorage.bbsState)
    : { currentPost: {}}
}

const state = getDefaultState()

const mutations = {
  UPDATE_CURRENT_POST: (state, paylod) => {
    state.currentPost = paylod
  }
}

const actions = {
  async getCurrentPost({ commit }, paylod) {
    const res = await getPostByIdAPI({ _id: paylod })
    commit('UPDATE_CURRENT_POST', res.result.data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
export function setStateToLocal() {
  localStorage.bbsState = JSON.stringify(state)
}
