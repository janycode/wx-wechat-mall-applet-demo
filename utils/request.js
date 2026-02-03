// /utils/request.js
const BASE_URL = "http://localhost:5000";
function request(params) {
  // wx.showLoading: https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showLoading.html
  // 显示 loading
  wx.showLoading({ title: '正在加载中' })
  return new Promise((resolve, reject) => {
    wx.request({
      ...params, //url, method, header, body...
      url: BASE_URL + params.url,  //url 参数同名覆盖
      success: (res) => {
        resolve(res.data)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {
        // 隐藏 loading（complete 不论成功与失败）
        wx.hideLoading({ success: (res) => { } })
      }
    })
  })
}

module.exports = {
  request, // 请求封装
  BASE_URL // 暴露基地址
};