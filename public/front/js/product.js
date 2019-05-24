$(function() {
  // 获取地址栏数据
  var id = getKey("productId");
  // 进入页面发送ajax请求渲染页面
  $.ajax({
    url: "/product/queryProductDetail",
    type: "get",
    dataType: "json",
    data: {
      id: id
    },
    success: function( info ) {
      console.log( info );
      var htmlStr = template("productTpl", info);
      $(".mui-scroll").html( htmlStr );

      // 由于轮播图是动态渲染的，需要手动初始化轮播图
      //获得slider插件对象
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
      });

      // 数字输入框初始化
      mui('.mui-numbox').numbox()

    }
  })

})