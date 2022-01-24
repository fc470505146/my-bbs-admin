import request from '@/utils/request'
import FormData from 'form-data'
export function login(data) {
  return request({
    url: '/users/login',
    method: 'post',
    data
  })
}

export function addUser(data) {
  return request({
    url: '/users/register',
    method: 'post',
    data
  })
}
export function getInfo(token) {
  return request({
    url: '/users/getInfo',
    method: 'get'
  })
}

export function getList(data) {
  return request({
    url: '/users/findPage',
    method: 'post',
    data
  })
}

export function getListByUsername(data) {
  return request({
    url: '/users/find',
    method: 'post',
    data
  })
}

export function deleteUserById(data) {
  return request({
    url: '/users/delete',
    method: 'post',
    data
  })
}

export function updateUserById(data) {
  return request({
    url: '/users/updateUser',
    method: 'put',
    data
  })
}
export function uploadExcel(data) {
  const form = new FormData()
  form.append('file', data)
  return request({
    url: '/users/addUserList',
    method: 'post',
    data: form,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
export function uploadAvatarAPI(data) {
  const form = new FormData()
  form.append('file', data)
  return request({
    url: '/users/upload',
    method: 'patch',
    data: form,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
export function getAvatarAPI(data) {
  return request({
    url: '/users/getAvatar',
    method: 'post',
    data
  })
}
export function updateUserInfoAPI(data) {
  return request({
    url: '/users/update/userInfo',
    method: 'post',
    data
  })
}
export function changePasswordAvatarAPI(data) {
  return request({
    url: '/users/',
    method: 'patch',
    data
  })
}
