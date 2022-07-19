import { defineStore } from 'pinia'
//引入http组件
import { http } from '../utils/http'

export default defineStore('channelStore', {
  state: () => ({
    channels: []
  }),
  getters: {

  },
  actions: {
    async getchannels () {
      const res = await http.get('/channels')
      this.channels = res.data.channels
    }
  }
})