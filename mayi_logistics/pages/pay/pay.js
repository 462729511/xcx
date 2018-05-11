// we7_wxappdemo/pages/pay/pay.js
import http from '../../util/request.js';
import alert from '../../util/alert.js';
import pay from '../../util/pay.js';
let app = getApp();


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

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  pay : function() {
    // 获取用户信息先 $_SESSION['openid'] 丢失的问题
     app.util.getUserInfo(()=>{
       let orderid = Math.random();
        pay(orderid).then(res=>{
          console.log(res);
           alert('支付成功'); 
        }, err=>{
           console.log(err); 
           alert(err);//支付错误信息
        })
     });
    
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