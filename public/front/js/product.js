$(function() {
  // 获取地址栏数据
  var id = getKey("productId");
  console.log( id );
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


  $(".lt_main").on("click", ".lt_size span", function() {
    $(this).addClass("current").siblings().removeClass("current");
  })

  // 点击加入购物车按钮发送ajax请求传入产品id尺码跟数量
  $("#addCart").on("tap", function() {
    var size = $(".lt_size span.current").text();
    var num = $(".mui-numbox-input").val();
    if( size === null ) {
      mui.toast("请选择尺码");
      return;
    }
    $.ajax({
      url: "/cart/addCart",
      type: "post",
      dataType: "json",
      data: {
        productId: id,
        size: size,
        num: num
      },
      success: function( info ) {
        console.log( info );
        if( info.error === 400 ) {
          location.href = "./login.html?retUrl=" + location.href;
        }
        mui.confirm("添加成功", "温馨提示", ["前往购物车", "继续浏览"], function( e ) {
          if( e.index === 0 ) {
            location.href = "./cart.html";
          }
        });
      }
    })
  })
})