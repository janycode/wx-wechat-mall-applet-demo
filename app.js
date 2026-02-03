// app.js
import { BASE_URL } from './utils/request'

App({
  onLaunch() {
    // 挂载到全局对象的globalData中，获取方式: getApp().globalData.BASE_URL
    this.globalData = {
      BASE_URL: BASE_URL // 全局基地址
    }
  },
})
