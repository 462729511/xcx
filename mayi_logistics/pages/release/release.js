// pages/release/release.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var openid = wx.getStorageSync('openid')
    app.util.request({
      url: 'entry/wxapp/my_logistics',
      method: 'POST',
      data:{
        openid:openid
      },     
      success: function (res) {
        console.log(res)
       
          that.setData({
            list: res.data.data
          })

      }
    });
  },
  callback:function(){
    wx.switchTab({
      url: '/mayi_logistics/pages/index/index'
    })
  },
  detail:function(event){
    var that=this;
    console.log(event);
    wx.navigateTo({
      url: '../details/details?id=' + event.currentTarget.dataset.id + '&fromPage=user' + '&title=' + event.currentTarget.dataset.title,
    })
  },
  calling: function (event) {
    var tel = event.currentTarget.dataset.tel
    wx.makePhoneCall({
      phoneNumber: tel,
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  center:function(){
    wx.switchTab({
      url: '/mayi_logistics/pages/center/center'
    })
  }
})