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
