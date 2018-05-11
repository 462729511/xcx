

// 简单封装 跳转 方法
function index() {
  console.log('to index');
  wx.switchTab({
    url: '/mayi_logistics/pages/index/index',
  });
}


export default {index}

