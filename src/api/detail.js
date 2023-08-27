import request from '@/utils/request'

export function addRecommendAPI(data) {
  return request({
    url: '/bbs/recommend/addRecommend',
    method: 'post',
    data
  })
}

export function delRecommendAPI(data) {
  return request({
    url: '/bbs/recommend/delRecommend',
    method: 'post',
    data
  })
}

export function getRecommendAPI() {
  return request({
    url: '/bbs/recommend/getRecommend',
    method: 'get'
  })
}

// 亮了
export function addLikeAPI(data) {
  return request({
    url: '/bbs/like/addLike',
    method: 'post',
    data
  })
}
export function delLikeAPI(data) {
  return request({
    url: '/bbs/like/delLike',
    method: 'post',
    data
  })
}

export function getLikeAPI(data) {
  return request({
    url: '/bbs/like/getLike',
    method: 'post',
    data
  })
}
// 用户界面

export function getPostByUserIdAPI(data) {
  return request({
    url: '/bbs/user/getPostByUserId',
    method: 'post',
    data
  })
}

export function getRecommendByUserIdAPI(data) {
  return request({
    url: '/bbs/user/getRecommendByUserId',
    method: 'post',
    data
  })
}
export function getCollectionByUserIdAPI(data) {
  return request({
    url: '/bbs/user/getCollectionByUserId',
    method: 'post',
    data
  })
}

export function getUserInfoByUserIdAPI(data) {
  return request({
    url: '/users/getAvatar',
    method: 'post',
    data
  })
}

export function getIndexAPI(data) {
  return request({
    url: '/bbs/index',
    method: 'get'
  })
}

export function getAllNoticeAPI(data) {
  return request({
    url: '/bbs/notice',
    method: 'get'
  })
}

export function getNoticeNumAPI(data) {
  return request({
    url: '/bbs/noticeNum',
    method: 'get'
  })
}

export function noticeFindOutAPI(data) {
  return request({
    url: '/bbs/noticeFindOut',
    method: 'get'
  })
}
