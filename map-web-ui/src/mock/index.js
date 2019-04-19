import Mock from 'mockjs'

export default {
  mockData () {
    Mock.mock('/api/user/login', {
      'success': true,
      'result': {
        'id': '100001',
        'name': '应用门户',
        'roles': ['admin']
      }
    })
  }
}
