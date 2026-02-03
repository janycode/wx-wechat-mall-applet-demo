const { request } = require("../../utils/request");

// pages/searchlist/searchlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    BASE_URL: '',
    goodlist: [],
    priceOrder: true,
    commentOrder: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取小程序全局实例，将全局基地址赋值到页面data
    this.setData({
      BASE_URL: getApp().globalData.BASE_URL
    });
    console.log(options); //接收参数
    wx.setNavigationBarTitle({
      title: options.title
    })
    this.getList(options.id)
  },
  //请求分类和商品列表
  getList(id) {
    request({
      url: `/categories?id=${id}&_embed=goods`
    }).then(res => {
      console.log(res[0]); //在第一个元素里面
      this.setData({
        goodlist: res[0].goods
      })
    }).catch(err => {
      console.error(err);
    })
  },
  // 跳转详情页
  handleGoToDetail(evt) {
    var { id, title } = evt.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}&title=${title}`
    })
  },
  // 价格排序
  handlePriceOrder() {
    console.log(this.data.priceOrder);
    this.setData({
      priceOrder: !this.data.priceOrder,
      goodlist: this.data.priceOrder
        ? this.data.goodlist.sort((x, y) => y.price - x.price)
        : this.data.goodlist.sort((x, y) => x.price - y.price)
    })
  },
  // 评价排序
  handleCommentOrder() {
    console.log(this.data.commentOrder);
    this.setData({
      commentOrder: !this.data.commentOrder,
      goodlist: this.data.commentOrder
        ? this.data.goodlist.sort((x, y) => parseInt(y.goodcomment) - parseInt(x.goodcomment))
        : this.data.goodlist.sort((x, y) => parseInt(x.goodcomment) - parseInt(y.goodcomment))
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