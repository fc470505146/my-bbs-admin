import request from '@/utils/request'

export function getListByPage(data) {
  return request({
    url: '/bbs/findByPage',
    method: 'post',
    data
  })
}

export function updateBoardAPI(data) {
  return request({
    url: '/bbs/updateBoard',
    method: 'post',
    data
  })
}

export function deleteBoardAPI(data) {
  return request({
    url: '/bbs/deleteBoard',
    method: 'post',
    data
  })
}

export function addBoardAPI(data) {
  return request({
    url: '/bbs/addBoard',
    method: 'post',
    data
  })
}

export function getPostList(data) {
  return request({
    url: '/bbs/getSingleBoard',
    method: 'post',
    data
  })
}

export function getPostByIdAPI(data) {
  return request({
    url: '/bbs/getPostById',
    method: 'post',
    data
  })
}
export function getBoardInfoAPI(data) {
  return request({
    url: '/bbs/getSingleBoardInfo',
    method: 'post',
    data
  })
}
export function updatePostOneAPI(data) {
  return request({
    url: '/bbs/updatePost',
    method: 'post',
    data
  })
}

export function addPostAPI(data) {
  return request({
    url: '/bbs/addPost',
    method: 'post',
    data
  })
}
export function deletePostAPI(data) {
  return request({
    url: '/bbs/deletePost',
    method: 'post',
    data
  })
}

export function addReviewAPI(data) {
  return request({
    url: '/bbs/review/addReview',
    method: 'post',
    data
  })
}

export function getAllReviewAPI(data) {
  return request({
    url: '/bbs/review/getAllReview',
    method: 'post',
    data
  })
}

export function deleteReviewAPI(data) {
  return request({
    url: '/bbs/review/deleteReview',
    method: 'post',
    data
  })
}

export function updateReviewAPI(data) {
  return request({
    url: '/bbs/review/updateReview',
    method: 'post',
    data
  })
}

export function addCollectionAPI(data) {
  return request({
    url: '/bbs/collection/addCollection',
    method: 'post',
    data
  })
}
export function delCollectionAPI(data) {
  return request({
    url: '/bbs/collection/delCollection',
    method: 'post',
    data
  })
}
export function getCollectionAPI() {
  return request({
    url: '/bbs/collection/getCollection',
    method: 'get'
  })
}
