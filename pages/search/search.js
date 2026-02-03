const { request } = require("../../utils/request");

// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search: ''
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      search: this.search.bind(this)  //绑定 this 指向
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

  },
  // 输入过程不断调用此函数得到新的搜索结果，参数是输入框的值value，返回Promise实例
  search(value) {
    return Promise.all([
      request({ url: `/goods` }),
      request({ url: `/categories` })
    ]).then(res => {
      console.log(res[0], res[1]);
      // 商品名称 + type 1 进详情页，最终映射对象必须是 {text: xx, type: yy}
      var goodsTitles = res[0].filter(item => item.title.includes(value)).map(item => {
        return { ...item, text: item.title, type: 1 }
      })
      // 分类名称 + type 2 进搜索列表，最终映射对象必须是 {text: xx, type: yy}
      var categoriesTitles = res[1].filter(item => item.title.includes(value)).map(item => {
        return { ...item, text: item.title, type: 2 }
      })
      return [...goodsTitles, ...categoriesTitles]
    })
  },
  // 在选择搜索结果的时候触发事件
  handleSearchResult(e) {
    console.log(e.detail); // {index: x, item: {...}}
    var { type, id, title } = e.detail.item
    if (type === 1) {
      console.log("详情页面");
      wx.navigateTo({
        url: `/pages/detail/detail?id=${id}&title=${title}`
      })
    } else {
      console.log("搜索列表");
      wx.navigateTo({
        url: `/pages/searchlist/searchlist?id=${id}&title=${title}`
      })
    }
  }
})