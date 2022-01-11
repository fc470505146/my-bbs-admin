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

