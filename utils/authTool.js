function checkAuth(callback) {
  if (wx.getStorageSync('tel')) {
    callback() //回调函数处理业务
  } else {
    if (wx.getStorageSync('token')) {
      wx.navigateTo({ url: '/pages/telform/telform' })  //手机绑定页
    } else {
      wx.navigateTo({ url: '/pages/auth/auth' }) //微信授权页
    }
  }
}

export default checkAuth