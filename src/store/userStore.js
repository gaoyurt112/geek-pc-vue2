import { defineStore } from 'pinia'
//引入http组件
import { http } from '../utils/http'

export default defineStore('userStore', {
  state: () => ({
    userInfo: {}
  }),
  getters: {

  },
  actions: {
    async getUserInfo () {
      const res = await http.get('/user/profile')
      this.userInfo = res.data
    }
  }
})