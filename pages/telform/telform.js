import { request } from "../../utils/request";

// pages/telform/telform.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tel: '',
    code: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  formInputMobile(evt) {
    console.log("手机号=", evt.detail.value);
    this.setData({ tel: evt.detail.value })
  },
  formInputCode(evt) {
    console.log("验证码=", evt.detail.value);
    //this.setData({ code: evt.detail.value })
  },
  formRequestCode() {
    //校验手机号
    if (this.data.tel === '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'fail',
        duration: 2000
      })
      return
    } else {
      if (this.data.tel.length != 11) {
        wx.showToast({
          title: '请输入正确的手机号',
          icon: 'fail',
          duration: 2000
        })
        return
      } else {
        //正则校验手机号是否符合规则 todo
      }
    }
    wx.showToast({
      title: '测试验证码1234',
      icon: 'success',
      duration: 2000
    })
    // request({ url: '/code'}).then(res => {...})
    this.setData({ code: '1234' }) //测试验证码
  },

  submitForm() {
    //校验验证码
    if (this.data.code === '' || this.data.code.length != 4) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'fail',
        duration: 2000
      })
      return
    }
    wx.setStorageSync("tel", this.data.tel)
    var userInfo = wx.getStorageSync("token")
    request({
      url: `/users?tel=${this.data.tel}&nickName=${userInfo.nickName}`
    }).then(res => {
      console.log(res);
      if (res.length === 0) {
        // 用户不存在，新增
        request({
          url: "/users",
          method: "post",
          data: {
            ...userInfo,
            tel: this.data.tel
          }
        }).then(res => {
          console.log("1111");
          wx.navigateBack({ delta: 2 }) //返回2层页面
        })
      } else {
        // 用户存在
        console.log("2222");
        wx.navigateBack({ delta: 2 }) //返回2层页面
      }
    }).catch(err => {
      console.error(err);
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