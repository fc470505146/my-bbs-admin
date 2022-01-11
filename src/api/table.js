import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/users/findPage',
    method: 'post',
    data
  })
}
