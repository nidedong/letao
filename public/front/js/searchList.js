$(function() {
  var currentPage = 1;
  var pageSize = 2;

  // 将搜索内容初始化到搜索框中
  $(".search_input").val( getKey("key") );

  // 上拉刷新下拉加载功能
  mui.init({
    pullRefresh : {
      container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可
      down : {
        auto: true,
        callback : function() {
          currentPage = 1;
          render(function(  info ) {
            var htmlStr = template("productTpl", info);
            $(".lt_product").html( htmlStr );
            // 渲染完成后手动改变刷新状态
            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
            mui('.mui-scroll-wrapper').pullRefresh().enablePullupToRefresh();
          });
        }//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      },
      up : {
        callback : function() {
          currentPage ++;
          render(function(  info ) {
            var htmlStr = template("productTpl", info);
            $(".lt_product").append( htmlStr );
            // 渲染完成后手动改变刷新状态
            if( info.data.length === 0 ) {
              mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh( true );
            }else {
              mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
            }

          });
        }//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      }
    }
  });
  // 一进入页面调用一次render()渲染页面
  render();


  // 进入页面根据搜索框内的内容发送ajax请求渲染页面
  function render( callback ) {
    // $(".lt_product").html("<div class='loading'></div>");
    var params = {};
    params.page = currentPage;
    params.pageSize = pageSize;
    params.proName = $(".search_input").val();
    if( $(".lt_sort a").hasClass("current") ) {
      var value = $(".lt_sort a.current").data("sort");
      var order = $(".lt_sort a.current i").hasClass("fa-angle-down") ? "2" : "1";
      params[value] = order;
      console.log( params );
    }

    setTimeout(function() {
      $.ajax({
        url: "/product/queryProduct",
        data: params,
        dataType: "json",
        type: "get",
        success: function( info ) {
          console.log( info );
          callback && callback( info );
        }
      })
    }, 500);
  }

  // 给搜索按钮添加点击事件，点击时根据框内内容发送ajax请求渲染页面
  $(".search_btn").on("click", function() {
    $(".lt_sort a").removeClass("current");
    $(".lt_sort i[class*=fa-angle-up]").removeClass("fa-angle-up").addClass("fa-angle-down");
    var key = $(".search_input").val();
    if( key.trim() === "" ) {
      mui.toast("请输入搜索内容");
      return;
    }
    // 将搜索栏里的数据添加到历史记录中
    var jsonStr = localStorage.getItem("search_list") || "[]";
    var arr = JSON.parse( jsonStr );
    // 去掉重复的搜索记录
    var index = arr.indexOf( key );
    if( index != -1 ) {
      arr.splice( index, 1 );
    }
    // 将搜索历史限制在十个
    if( arr.length >= 10 ) {
      arr.pop();
    }
    arr.unshift( key );
    localStorage.setItem("search_list", JSON.stringify( arr ));
    mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
  })

  // 排序功能
  // 给排序标签添加点击事件
  $(".lt_sort a[data-sort]").on("tap", function() {
    if( $(this).hasClass("current") ) {
      $(this).children("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
    }
    else {
      $(this).addClass("current").siblings().removeClass("current");
      $(".lt_sort i[class*=fa-angle-up]").removeClass("fa-angle-up").addClass("fa-angle-down");
    }
    mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
  })
  
})