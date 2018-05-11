// pages/forms/forms.js
var model = require('../../model/model.js')
const app = getApp()
var show = false;
var item = {};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inps:[''],
    inps_val:[],
    title:'',
    start_point:'',
    end_point:'',
    way_point:[],
    contact:'',
    tel:'',
    fax:'',
    mobile:'',
    address:'',
    status:'',
    explanation:'',
    introduction:'',
    item:{
      show:show
    },
    tempFilePaths: [],
    tempFilePathss:[],
    imgspath: [],
    markers: [],
    lat: '',
    lng: '',
    placeData: {},
    status:'' ,
    directions:'',
    content:'',
    Multi_ple:''
  },
  makertap: function (e) {
    var that = this;
    var id = e.markerId;
    that.showSearchInfo(wxMarkerData, id);
    that.changeMarkerColor(wxMarkerData, id);
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    var that = this;
    //请求数据
    model.updateAreaData(that, 0, e);
  },
  translate: function (e) {
    this.setData({
      typea: e.currentTarget.dataset.typea
    });
    model.animationEvents(this, 0, true, 400);
    // console.log('typea:'+e.currentTarget.dataset.typea);
  },

  //隐藏picker-view
  hiddenFloatView: function (e) {
    model.animationEvents(this, 200, false, 400);
  },
  bindChange: function (e) {
    model.updateAreaData(this, 1, e);
    var that=this;
    item = this.data.item;
  

    var typea = that.data.typea;
    console.log(typea);
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
  companynamebindchange:function(e){
        this.setData({
         title:e.detail.value
    })
  },
  originCitybindchange:function(e){
        this.setData({
          start_point:e.detail.value
      })
  },
  namebindchange:function(e){
    this.setData({
      contact:e.detail.value
    })
  },
  seatNumber:function(e){
    this.setData({
      tel:e.detail.value
    })
  },
  addressbindchange:function(e){
    this.setData({
      address:e.detail.value
    })
  },
  directionschange:function(e){
      this.setData({
        direction:e.detail.value
      })
  },
  introductionchange:function(e){
      this.setData({
        content:e.detail.value
      })
  },
  radioChange:function(e){
      this.setData({
        status:e.detail.value
      })
  },
  waypointbindchange:function(e){
    var that=this;
    var index=e.currentTarget.dataset.id;
    if (e.detail.value) {
      var inps = that.data.inps;
      var way_point = e.detail.value;
      var inps_val = that.data.inps_val;
      inps_val[index] = way_point
      this.setData({
        inps_val: inps_val
      })
    } 
  },

  formSubmit:function(e){

    console.log(this.data.province);
    var warn="";
    var flag=true;
    if (e.detail.value.title==""){
      warn='请输入公司名称'
    } else if (this.data.province==undefined){
      warn='请输入起始点'
    } else if (this.data.province2 == undefined){
      warn='请输入目的地'
    } else if (e.detail.value.contact==""){
      warn= '请输入联系人'
    } else if (e.detail.value.mobile == "" || !(/^[1][3,4,5,7,8][0-9]{9}$/.test(e.detail.value.mobile))){
      warn= '请正确输入手机号'
    } else if (e.detail.value.address==""){
     warn="请输入地址"
    } else if(this.data.tempFilePaths==''){
      warn='请添加幻灯片图片'
    }else if(this.data.tempFilePathss==''){
      warn ='请添加Logo图标'
    }else {
      flag=false;
    }
    if (flag == true) {
      wx.showModal({
        title: '提示',
        content: warn
      })
      return false
    } 
    var that = this;
    var uniacid = app.siteInfo.uniacid
    var openid = wx.getStorageSync('openid')
  
    var title = e.detail.value.title;
    var start_point1 = this.data.province;
    var start_point2= this.data.city;
    var start_point=this.data.county;
    // var start_point = county
    var end_point1 = this.data.province2;
    var end_point2 = this.data.city2;
    var end_point = this.data.county2;

    var contact = e.detail.value.contact;
    var tel = e.detail.value.seatNumber;
    var fax=e.detail.value.fax;
    var mobile=e.detail.value.mobile;
    var address=e.detail.value.address;

    var inps = that.data.inps;
    var way_point = e.detail.value;
    var inps_val = that.data.inps_val;
    // var inps=[];
    // var way_point = e.detail.value.way_point;
    // this.data.inps.push(way_point)
    // var inps = this.data.inps

    //  way_point = e.detail.value.way_point.push
    // console.log(way_point)
    var directions = e.detail.value.directions;
    var content=e.detail.value.content;
    var status=e.detail.value.isor
    
  
    // console.log(status);
    var data = {
      m: 'mayi_logistics',
      uniacid: uniacid,
      imgs: that.data.imgspath,
        openid: openid,
        title:title,
        start_point1: start_point1,
        start_point2: start_point2,
        start_point: start_point,
        end_point1: end_point1,
        end_point2: end_point2,
        end_point: end_point,
        contact: contact,
        tel:tel,
        fax:fax,
        mobile:mobile,
        address:address,
        way_point: inps_val,
        directions: directions,
        content: content,
        status:status   
    };
    var siteinfo = app.siteInfo;
    var url = siteinfo.siteroot + '?i=' + siteinfo.uniacid + '&t=0&v=' + siteinfo.version + '&' +'from=wxapp&c=entry&a=wxapp&do=uploadimg&m='+siteinfo.name;
    var lang = that.data.inps_val.length;
    console.log('123' + lang);
    that.setData({
        lang:lang
    })
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
  chooseicon:function(){
    var that= this;
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        if (that.data.tempFilePathss.length>=1){
          return;
        }else{
          that.setData({
            tempFilePathss: that.data.tempFilePathss.concat(res.tempFilePaths)
          })
        }     
      }
    })
  },

  //多张图片上传
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
            url: 'entry/wxapp/post_logistics',
            data: data.data,
            method: 'POST',
            cachetime: 0,
            success: function (res) {
              console.log(res)
              if(res.data.status=='1'){
                wx.navigateTo({
                  url: '../release/release'
                })
              }else{
                wx.showToast({
                  title: res.data.message,
                  icon: 'error',
                  duration: 2000
                })
              }
              that.setData({
                imgspath: []
              })
              if (res.data.status>0) {
                setTimeout(function () {
                  wx.redirectTo({
                    url: '../center/center'
                  });
                }, 2000)
              }
              var Multi_ple = this.data.Multi_ple;
              if (Multi_ple == 1) {
                  return false;
                }
                that.setData({
                  Multi_ple: '1'
                })
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
  },

  addinps: function () {
    var inps = this.data.inps;
    var inps_val = this.data.inps_val;
    var newData = '';
    inps.push(newData);//实质是添加lists数组内容，使for循环多一次  
    inps_val.push(newData);
    this.setData({
      inps: inps,
      inps_val: inps_val
    })
  }, 

  delinps: function () {
    var inps = this.data.inps;
    var inps_val = this.data.inps_val;
    if(inps.length>1){
      inps.pop(); 
      inps_val.pop(); 
    }
    
     //实质是删除lists数组内容，使for循环少一次  
    this.setData({
      inps: inps,
      inps_val: inps_val
    })
  }
    
})