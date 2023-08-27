import { getPostByIdAPI } from '@/api/bbs'
import { getAvatarAPI } from '@/api/user'
import moment from 'moment'
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
    if (res.code === 0) {
      const data = res.result.data
      const temp = await getAvatarAPI({
        _id: data.User._id
      })
      data.User.avatar = temp.result.data.avatar
      data.lastModified = moment(data.lastModified).format(
        'MM-DD HH:mm'
      )
    }
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
