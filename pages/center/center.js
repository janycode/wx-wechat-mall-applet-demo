import checkAuth from "../../utils/authTool";

// pages/center/center.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    BASE_URL: '',
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取小程序全局实例，将全局基地址赋值到页面data
    this.setData({
      BASE_URL: getApp().globalData.BASE_URL
    });
  },
  //更换头像：拍摄或从手机相册中选择图片或视频
  handleAvatarChange() {
    wx.chooseMedia({
      count: 1, //选择图片数量
      mediaType: ['image','video'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      //success(res) {
      success: (res) => {  //使用箭头函数 确保 this 指向为当前页面对象
        console.log(res.tempFiles[0].tempFilePath)
        console.log(res.tempFiles[0].size)
        this.setData({
          userInfo: {
            ...this.data.userInfo,
            avatarUrl: res.tempFiles[0].tempFilePath
          }
        })
        //放在本地存储中
        wx.setStorageSync("token", {
          ...wx.getStorageSync("token"),
          avatarUrl: res.tempFiles[0].tempFilePath
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    checkAuth(() => {
      console.log("进入我的");
      this.setData({
        userInfo: wx.getStorageSync("token")
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})