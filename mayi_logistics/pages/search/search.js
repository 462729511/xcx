// mayi_logistics/pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    origin: '温州',
    aim: '广州',
    list: [
      {
        thumb: '../resource/images/chengshi.png',
        add: '../resource/images/address.png',
        zd: '广州',
        zz: '韶关深圳珠海',
        address: '温州市鹿城区官岭西路鹿城物',
        company: '温州庆丰货运',
        distance: "123"
      },
      {
        thumb: '../resource/images/chengshi.png',
        add: '../resource/images/address.png',
        zd: '深圳',
        zz: '韶关深圳珠海',
        address: '深圳',
        company: '深圳货运',
        distance: "123"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})