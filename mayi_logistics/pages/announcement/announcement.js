// mayi_logistics/pages/announcement/announcement.js
import http from '../../util/request.js';

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists:'',
    text: "demo"

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var id = options.id
    app.util.request({
      url: 'entry/wxapp/bulletin_detail',
      method: 'POST',
      data: {
        id: id
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          title: res.data.data.list.title,
          'description': that.escapeHtml(res.data.data.list.description),
          
        })
      }
    })
  },
  onShareAppMessage: function () {
  
  },
  escapeHtml: function (text) {
    var a = text.replace(/(\&lt;)/g, "<");
    var b = a.replace(/(\&gt;)/g, ">");
    var c = b.replace(/(\&amp;)/g, "\&");
    var d = c.replace(/(\&quot;)/g, "\"");
    return d;
  }
})