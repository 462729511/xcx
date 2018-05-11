// pages/details/details.js
import http from '../../util/request.js';

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: [
      '../resource/images/cp2.jpg',
      '../resource/images/cp3.jpg',
      '../resource/images/cp5.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    mobile: "",
    address:'',
    lng:'',
    lat:'',
    list:[
      {
        // zd:"广州",
        // zz:"韶关 深圳 珠海 北京 广东 上海 南京 杭州 重庆 香港 澳门 广西 山东 河北",
        // contacts:"刘某",
        // phone:"1231231",
        // homephone:"432423",
        // fax:"123123",
        // address:"温州市鹿城区官岭西路鹿城物流园A座",
        // instructions:"没说什么好说的",
        // company:"某某公司"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var title=options.title;
    var address=options.address
    var that=this;
    app.util.request({
      url: 'entry/wxapp/logistics_detail',
      method: 'POST',
      data: {
        'id':options.id
      },
      success: function (res) {
        console.log(res)
        that.setData({
          address: res.data.data.address,
          end_point:res.data.data.end_point,
          content:res.data.data.content,
          directions: res.data.data.directions,
          fax: res.data.data.directions,
          tel:res.data.data.tel,
          mobile:res.data.data.mobile,
          contact:res.data.data.contact,
          way_point: res.data.data.way_point,
          thumb:res.data.data.thumb,
           lat:res.data.data.lat,
          lng:res.data.data.lng,
          title:title,
          lang:res.data.data.way_point.length
        })
      } 
    });
    console.log(this.data.lng)
    if(options.fromPage=='index'){
        wx.getStorage({
          key: options.id,
          success: function (res) {
            console.log(res.data)
            // if (res.data == options.id){
            //   return
            // }
            return false;
          },
          fail:function(){
            app.util.request({
              url: 'entry/wxapp/page_views',
              method: 'POST',
              data: {
                'id': options.id
              },
              success: function (res) { 
                console.log(res); 
                wx.setStorage({   
                  key: options.id,  
                  data: options.id,
                  success: function (res) { 
                  }
                })
              }
            })
          }
        })
    }
    wx.setNavigationBarTitle({
      title: title
    })
  },
  calling: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.mobile,
      success: function () {
        console.log("拨打电o话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  navi:function(){
    var lng=Number(this.data.lng);
    var lat=Number(this.data.lat)

    // console.log(lng)
    // console.log(lat);
    wx.openLocation({
      latitude: lat,
      longitude: lng,
      scale: 28
    })
  },
  onShareAppMessage: function (res) {
    var title=this.data.title
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: title,
      path: '/page/user?id=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})