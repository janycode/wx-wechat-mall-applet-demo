import {request} from '../../utils/request'

// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    BASE_URL: '',
    looplist: [],
    goodlist: [],
    currentPage: 1,
    goodTotal: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取小程序全局实例，将全局基地址赋值到页面data
    this.setData({
      BASE_URL: getApp().globalData.BASE_URL
    });
    this.renderSwiper() //轮播
    this.renderGoods() //商品
  },

  renderSwiper() {
    request({ url: '/recommends' }).then(res => {
      console.log(res);
      this.setData({
        looplist: res
      })
    }).catch(err => {
      console.error(err);
    })
  },

  renderGoods() {
    //默认分页10条，否则翻页不生效 json-server 1.0.0-beta.3
    request({ url: `/goods?_page=${this.data.currentPage}` }).then(res => {
      console.log(res.data); // _page 默认10条，数据在 data 中
      this.setData({
        goodlist: [...this.data.goodlist, ...res.data],
        goodTotal: res.items
      })
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
    setTimeout(() => {
      //更新数据
      console.log("下拉更新数据了");
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1000) //eg: 1s时间
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // 懒加载效果，滚动到底部按分页加载
    console.log(this.data.goodlist.length, this.data.goodTotal);
    if (this.data.goodlist?.length === this.data.goodTotal) {
      console.log("滚动到底了...");
      return
    }
    this.setData({
      currentPage: this.data.currentPage + 1
    })
    this.renderGoods() // current 增加追加渲染列表数据
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})