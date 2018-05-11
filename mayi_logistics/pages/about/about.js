// mayi_logistics/pages/about/about.js
import http from '../../util/request.js';

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.util.request({
      url: 'entry/wxapp/index',
      method: 'POST',
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          // title: res.data.data.list.title,
          'company_profile': that.escapeHtml(res.data.data.company_profile),
          'disclaimer': that.escapeHtml(res.data.data.disclaimer),
          'contact': that.escapeHtml(res.data.data.contact),
        })
      }
    })
  },
  escapeHtml: function (text) {
    var a = text.replace(/(\&lt;)/g, "<");
    var b = a.replace(/(\&gt;)/g, ">");
    var c = b.replace(/(\&amp;)/g, "\&");
    var d = c.replace(/(\&quot;)/g, "\"");
    return d;
  },
  
  onShareAppMessage: function () {
  
  }
})