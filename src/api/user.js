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
  console.log(request)
  const form = new FormData()
  form.append('file', data)
  console.log(form.get('file'))
  return request({
    url: '/users/addUserList',
    method: 'post',
    data: form,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
