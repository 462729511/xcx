 // we7_wxappdemo/pages/index/index.js
import http from '../../util/request.js';
var model = require('../../model/model.js')
const app = getApp()
var show = false;
var item = {};
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    add: '../resource/images/address.png',
    banner:[],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    tel: "",
    item: {
      show: show
    },
    county:'初始地',
    county2:'目的地',
    msgList:[
      {url: "../resource/images/laba.png"},
   
     ]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
  
    var that=this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        app.util.request({
          url: 'entry/wxapp/logistics',
          method: 'POST',
          data: {
            lat: latitude,
            lng: longitude
          },
          success: function (res) {
            console.log(res)
            that.setData({
              list: res.data.data
            })
          }
        })
      }
    })
    var uniacid = app.siteInfo.uniacid
    app.util.request({
        url:"entry/wxapp/banner",
        data: {
          m: 'mayi_logistics',
          uniacid: uniacid
        },
        method: 'post',
        success: function (res) {
          console.log(res.data)
          if(!res.data.errno){
            that.setData({
              banner: res.data.data.list
            })
          }
        }
    });

    app.util.request({
      url:"entry/wxapp/bulletin",
      success:function(res){      
        that.setData({  
          msgList:res.data.data.list
        })
      }
    })

    app.util.request({
      url:"entry/wxapp/index",
      success:function(res){
        var title = res.data.data.uniname
        wx.setNavigationBarTitle({
          title: title
        })
      }
    })
  },

  onReady: function (e) {
    var that = this;
    //请求数据
    model.updateAreaData(that, 0, e);
  },

  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  calling: function (event) {
    // console.log(event);
    var tel = event.currentTarget.dataset.tel
    wx.makePhoneCall({
      phoneNumber: tel,
      success: function () {
        // console.log("拨打电话成功！")
      },
      fail: function () {
        // console.log("拨打电话失败！")
      }
    })
  },

  login: function () {
    wx.navigateTo({
      url: '../city/city'
    })
  },  

  gomap: function () {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      }
    })
  },

  detail: function (event) {
    var that = this;
    // console.log(event);
    wx.navigateTo({
      url: '../details/details?id=' + event.currentTarget.dataset.id+'&fromPage=index'+'&title='+event.currentTarget.dataset.title+'&address='+event.currentTarget.dataset.add,
    })
  },

  search: function () {
    var that=this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        var start_point=that.data.county
        var end_point=that.data.county2
        app.util.request({
          url: 'entry/wxapp/logistics',
          method: 'POST',
          data: {
            lat: latitude,
            lng: longitude,
            start_point:  start_point,
            end_point: end_point
          },
          success: function (res) {
            console.log(res)
            that.setData({
              list: res.data.data
            })    
          }
        })
      }
    })
  },

  city: function () {
    wx.navigateTo({
      url: '../city/city',
    })
  },
  makertap: function (e) {
    var that = this;
    var id = e.markerId;
    that.showSearchInfo(wxMarkerData, id);
    that.changeMarkerColor(wxMarkerData, id);
  }, 
  translate: function (e) {
    this.setData({
      typea: e.currentTarget.dataset.typea
    });
    model.animationEvents(this, 0, true, 400);
    // console.log('typea:'+e.currentTarget.dataset.typea);
  },
  hiddenFloatView: function (e) {
    model.animationEvents(this, 200, false, 400);
  },
  bindChange: function (e) {
    model.updateAreaData(this, 1, e);
    var that = this;
    item = this.data.item;
    // this.setData({
    //   province: item.provinces[item.value[0]].name,
    //   city: item.citys[item.value[1]].name,
    //   county: item.countys[item.value[2]].name
    // });

    var typea = that.data.typea;
    // console.log(typea);
    if (typea == 1) {
      that.setData({
        province: item.provinces[item.value[0]].name,
        city: item.citys[item.value[1]].name,
        county: item.countys[item.value[2]].name
      })

    } else if (typea == 2) {
      that.setData({
        province2: item.provinces[item.value[0]].name,
        city2: item.citys[item.value[1]].name,
        county2: item.countys[item.value[2]].name
      })
    }
  },
  an_detail:function(event){
    wx.navigateTo({
      url: '../announcement/announcement?id=' + event.currentTarget.dataset.id,
    })
    console.log(event.currentTarget.dataset.id)
  }
})
