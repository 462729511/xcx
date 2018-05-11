// mayi_logistics/pages/complaint/complaint.js
import http from '../../util/request.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths:[],
    imgspath:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  onShareAppMessage: function () {
  
  },
  formSubmit: function (e) {
    var that=this;
    var description = e.detail.value.textarea
    var warn = ""
    var flag = true;
    if (description==''){
      warn="请输入您的建议再提交"
    }else{
      flag=false
    }
    if (flag == true) {
      wx.showModal({
        title: '提示',
        content: warn
      })
      return false
    }
    var data = {
      description: description,
      image: that.data.imgspath,
    }
    var siteinfo = app.siteInfo;
    var url = siteinfo.siteroot + '?i=' + siteinfo.uniacid + '&t=0&v=' + siteinfo.version + '&' + 'from=wxapp&c=entry&a=wxapp&do=uploadimg&m=' + siteinfo.name;

    that.uploadimg({
      url: url,//这里是你图片上传的接口
      path: that.data.tempFilePaths.concat(that.data.tempFilePathss),//这里是选取的图片的地址数组
      data: data
    });
  },
  chooseimage: function () {
    var _this = this;
    wx.chooseImage({
      count: 9, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        _this.setData({
          tempFilePaths: _this.data.tempFilePaths.concat(res.tempFilePaths)
        })
      }
    })
  },
  uploadimg: function (data) {
    var that = this,
      i = data.i ? data.i : 0,//当前上传的哪张图片
      success = data.success ? data.success : 0,//上传成功的个数
      fail = data.fail ? data.fail : 0;//上传失败的个数
    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      name: 'file',//这里根据自己的实际情况改
      formData: { 'imgtype': data.path[i], 'oncode': data.path[i] },
      success: (resp) => {
        success++;//图片上传成功，图片上传成功的变量+1
        var path = JSON.parse(resp.data);
        var imgspath = that.data.imgspath;
        imgspath.push(path)
        that.setData({
          imgspath: imgspath
        })
        //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
      },
      fail: (res) => {
        fail++;//图片上传失败，图片上传失败的变量+1
        console.log('fail:' + i + "fail:" + fail);
      },
      complete: () => {
        i++;//这个图片执行完上传后，开始上传下一张
        if (i == data.path.length) {   //当图片传完时，停止调用          
          console.log('执行完毕');
          console.log('成功：' + success + " 失败：" + fail);
          data.data['image'] = that.data.imgspath;
          app.util.request({
            url: 'entry/wxapp/feedback',
            data: data.data,
            method: 'POST',
            cachetime: 0,
            success: function (res) {
              var status = res.data.status
              wx.showToast({
                title: res.data.message,
                icon: 'success',
                duration: 2000,
                success:function(res){
                  if (status == '1') {
                    wx.switchTab({
                      url: '../index/index'
                    })
                  }
                }
              })
             
              that.setData({
                imgspath: []
              })
              // var Multi_ple = this.data.Multi_ple;
              // if (Multi_ple == 1) {
              //   return false;
              // }
              // that.setData({
              //   Multi_ple: '1'
              // })
            }
          });
        } else {//若图片还没有传完，则继续调用函数
          console.log(i);
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }
      }
    });
  },
  removeimgs: function () {
    var tempFilePaths = this.data.tempFilePaths;
    tempFilePaths.pop();
    this.setData({
      tempFilePaths: tempFilePaths
    })
  }
 
})