const { default: checkAuth } = require("../../utils/authTool");
const { request, BASE_URL } = require("../../utils/request");

// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    BASE_URL: '',
    info: null,
    current: 0,
    comments: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取小程序全局实例，将全局基地址赋值到页面data
    this.setData({
      BASE_URL: getApp().globalData.BASE_URL
    });
    //列表进入详情携带的参数 id，即 url?id=1&title=小米
    console.log(options); // {id: "2", title: "小米"}  options.id  options.title
    //设置当前页面导航栏的 title 
    wx.setNavigationBarTitle({
      title: options.title,
    })
    //ajax请求详情信息
    this.getGoodDetailById(options.id)
    //ajax请求评价信息
    this.getGoodComment()
  },

  getGoodDetailById(id) {
    request({
      url: `/goods/${id}`
    }).then(res => {
      console.log(res);
      this.setData({
        info: res
      })
    }).catch(err => {
      console.error(err);
    })
  },

  handleFullScreenTap(evt) {
    //原生方法全屏预览图片
    wx.previewImage({
      current: evt.currentTarget.dataset.current, //当前显示图片的 http 链接 
      urls: this.data.info.slides.map(item => BASE_URL + `${item}`)  //需要预览的图片 http 链接列表
    })
  },

  handleActive(evt) {
    this.setData({
      current: evt.currentTarget.dataset.index
    })
  },

  getGoodComment() {
    request({
      url: "/comments"
    }).then(res => {
      console.log(res);
      this.setData({
        comments: res
      })
    }).catch(err => {
      console.log(err);
    })
  },

  // 加入购物车
  handleAddShopCar() {
    // 判断是否有手机号信息，如果有，直接加入
    // 如果没有手机号，判断是否有授权 token，如果有引导手机号绑定
    // 没有授权 token ，引导用户进入授权页面
    checkAuth(() => {
      console.log("准备加入购物车");
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