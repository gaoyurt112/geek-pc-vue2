import { defineStore } from 'pinia'
//引入http组件
import { http } from '../utils/http'
//引入token设置
import { getToken, setToken, clearToken } from '@/utils/token'

export default defineStore('loginStore', {
  state: () => ({
    token: getToken() || ''
  }),
  getters: {

  },
  actions: {
    //定义用户登录的actions
    async login ({ mobile, code, isChecked }) {
      const res = await http.post('/authorizations', {
        mobile,
        code,
        isChecked
      })
      this.token = res.data.token
      setToken(res.data.token)
    },

    //定义用户退出的模块
    loginOut () {
      this.token = ''
      clearToken()
    }
  }
})