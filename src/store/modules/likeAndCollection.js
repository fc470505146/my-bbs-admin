import { getCollectionAPI } from '@/api/bbs'
import { getLikeAPI, getRecommendAPI } from '@/api/detail'

function getDefaultState() {
  return localStorage.likeAndCollection
    ? JSON.parse(localStorage.likeAndCollection)
    : { collection: [], currentPostlike: [], recommend: [] }
}

const state = getDefaultState()

const mutations = {
  SET_COLLECTION: (state, paylod) => {
    state.collection = paylod
  },
  SET_RECOMMEND: (state, paylod) => {
    state.recommend = paylod
  },
  SET_CURRENTPOSTLIKE: (state, paylod) => {
    state.currentPostLike = paylod ?? []
  }
}

const actions = {
  async getCollection({ commit }) {
    const res = await getCollectionAPI()
    if (res.code === 0) {
      commit('SET_COLLECTION', res.result.data?.collection)
    }
  },
  async getRecommend({ commit }) {
    const res = await getRecommendAPI()
    if (res.code === 0) {
      commit('SET_RECOMMEND', res.result.data?.recommend)
    }
  },
  async getLike({ commit }, paylod) {
    const postId = paylod
    const res = await getLikeAPI({ postId })
    if (res.code === 0) {
      commit('SET_CURRENTPOSTLIKE', res.result.data?.like?.[postId])
    }
  }
}
export function setLikeAndCollectionStateToLocal() {
  localStorage.likeAndCollection = JSON.stringify(state)
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
