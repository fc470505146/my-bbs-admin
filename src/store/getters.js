const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  _id: state => state.user._id,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  isAdmin: state => state.user.roles?.includes('admin'),
  permission_routes: state => state.permission.routes,
  currentPost: state => state.bbs.currentPost,
  isInCollection: state => {
    return state.likeAndCollection.collection?.includes(
      state.bbs.currentPost._id
    )
  },
  isRecommend: state =>
    state.likeAndCollection.recommend?.includes(
      state.bbs.currentPost._id
    ),
  isLight: state => reviewId => {
    return state.likeAndCollection.currentPostLike.includes(reviewId)
  }
}
export default getters
