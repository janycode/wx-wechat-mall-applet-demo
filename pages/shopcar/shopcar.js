const { default: checkAuth } = require("../../utils/authTool");
const { request, BASE_URL } = require("../../utils/request");

// pages/shopcar/shopcar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    BASE_URL: '',
    slideButtons: [{
      type: 'warn',
      text: '删除',
    }],
    cartlist: [],
    isAllChecked: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取小程序全局实例，将全局基地址赋值到页面data
    this.setData({
      BASE_URL: getApp().globalData.BASE_URL
    });
    let { nickName } = wx.getStorageSync('token')
    let tel = wx.getStorageSync('tel')
    console.log(nickName, tel);
    request({ url: `/carts?_embed=good&username=${nickName}&tel=${tel}` }).then(res => {
      console.log("cartlist=", res);
      this.setData({
        cartlist: res
      })
    }).catch(err => {
      console.error(err);
    })
    // 检查是否全选，并设置全选 checked
    this.setData({
      isAllChecked: this.data.cartlist.every(item => item.checked === true)
    })
  },

  // 左滑删除按钮点击事件回调（必须添加，否则点击无反应）
  slideButtonDeleteTap(evt) {
    console.log('左滑删除触发', evt);
    // 此处编写删除购物车商品的逻辑（示例：提示+模拟删除）
    wx.showModal({
      title: '提示',
      content: '确定删除该商品吗？',
      success: (res) => {
        if (res.confirm) {
          // 调用接口删除购物车数据 + 更新页面列表
          let id = evt.currentTarget.dataset.item.id
          request({ url: `/carts/${id}`, method: "delete" }).then(res => {
            console.log(res);
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 1500
            });
          })
          this.setData({
            cartlist: this.data.cartlist.filter(item => item.id !== id)
          })
        }
      }
    });
  },

  handleCheckedTap(evt) {
    let item = evt.currentTarget.dataset.item
    console.log(item);
    item.checked = !item.checked
    this.handleUpdate(item)
    // 检查是否全选，并设置全选 checked
    this.setData({
      isAllChecked: this.data.cartlist.every(item => item.checked === true)
    })
  },

  handleUpdate(item) {
    this.setData({
      cartlist: this.data.cartlist.map(data => {
        if (data.id === item.id) {
          return item
        }
        return data
      })
    })
    request({
      url: `/carts/${item.id}`,
      method: "put",
      data: {
        username: item.username,
        tel: item.tel,
        goodId: item.goodId,
        number: item.number,
        checked: item.checked
      }
    })
  },

  handleMinusTap(evt) {
    let item = evt.currentTarget.dataset.item
    console.log(item);
    item.number--
    this.handleUpdate(item)
  },

  handleAddTap(evt) {
    let item = evt.currentTarget.dataset.item
    console.log(item);
    item.number++
    this.handleUpdate(item)
  },
  // 全选与否逻辑处理
  handleAllChecked(evt) {
    console.log(evt.detail.value);
    if (evt.detail.value.length === 0) {
      //未全选
      this.setData({
        cartlist: this.data.cartlist.map(item => ({
          ...item,
          checked: false
        }))
      })
      //请求接口批量修改为 false
    } else {
      //全选
      this.setData({
        cartlist: this.data.cartlist.map(item => ({
          ...item,
          checked: true
        }))
      })
      //请求接口批量修改为 true
    }
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
      console.log("进入购物车");
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