$(function() {
  function render() {
    setTimeout(function() {
      $.ajax({
        url: "/cart/queryCart",
        dataType: "json",
        type: "get",
        success: function( info ) {
          console.log( info );
          // 登陆拦截
          if( info.error === 400 ) {
            location.href = "./login.html?retUrl=cart.html";
            return;
          }
          var htmlStr = template("tpl", { arr: info });
          $(".lt_main .mui-table-view").html( htmlStr );
          // 请求结束后手动关闭刷新效果
          mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
        }
      })
    }, 500)
  }

  mui.init({
    pullRefresh : {
      container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down : {
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        callback : function() {
          // 进去页面查询购物车数据渲染页面
          render();

        }//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      }
    }
  });

  // 删除功能
  $(".mui-table-view").on("tap", ".btn_del", function() {

    var id = $(this).parent().data("id");
    $.ajax({
      url: "/cart/deleteCart",
      data: {
        id: [id]
      },
      type: "get",
      dataType: "json",
      success: function( info ) {
        console.log( info );
        mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
      }
    })
  })

  // 编辑功能
  $("body").on("tap", ".btn_edit", function() {
    var obj = this.dataset;
    console.log( obj );
    var htmlStr = template("editTpl", obj);

    htmlStr = htmlStr.replace(/\n/g, "");

    mui.confirm(htmlStr, "编辑商品", ["确认", "取消"], function( e ) {
      var id = $(".lt_size").data("id");
      var num = $(".mui-numbox-input").val();
      var size = $(".lt_size span.current").text();
      console.log( num + "---" + size)
      if( e.index === 0 ) {
        $.ajax({
          url: "/cart/updateCart",
          dataType: "json",
          type: "post",
          data: {
            id: id,
            num: num,
            size: size
          },
          success: function( info ) {
            console.log( info ) ;
            if( info.success ) {
              mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
            }
          }

        })
      }
    })
    mui(".mui-numbox").numbox();

    
  })
  $("body").on("tap", ".lt_size span", function() {
    $(this).addClass("current").siblings().removeClass("current");
  })

})