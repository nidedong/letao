$(function() {
  // 将通过地址栏传送的参数解析出来
  function getKey( val ) {
    var search = location.search;
    search = search.slice( 1 );
    search = decodeURI( search );
    var arr = search.split("&");
    var obj = {};
    arr.forEach(function( v, i ) {
      var key = v.split("=")[0];
      var value = v.split("=")[1];
      obj[ key ] = value;
    })
    return obj[ val ];
  }

  // 将搜索内容初始化到搜索框中
  $(".search_input").val( getKey("key") );


  // 一进入页面调用一次render()渲染页面
  render();


  // 进入页面根据搜索框内的内容发送ajax请求渲染页面
  function render() {
    var params = {};
    params.page = 1;
    params.pageSize = 100;
    params.proName = $(".search_input").val();
    if( $(".lt_sort a").hasClass("current") ) {
      var value = $(".lt_sort a.current").data("sort");
      var order = $(".lt_sort a.current i").hasClass("fa-angle-down") ? "2" : "1";
      console.log( order );
      params[value] = order;
      console.log( params );
    }

    $.ajax({
      url: "/product/queryProduct",
      data: params,
      dataType: "json",
      type: "get",
      success: function( info ) {
        console.log( info );
        var htmlStr = template("productTpl", info);
        $(".lt_product").html( htmlStr );
      }
    })
  }

  // 给搜索按钮添加点击事件，点击时根据框内内容发送ajax请求渲染页面
  $(".search_btn").on("click", function() {
    $(".lt_sort a").removeClass("current");
    $(".lt_sort i[class*=fa-angle-up]").removeClass("fa-angle-up").addClass("fa-angle-down");
    var key = $(".search_input").val();
    if( key === "" ) {
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
    render();
  })

  // 排序功能
  // 给排序标签添加点击事件
  $(".lt_sort a[data-sort]").on("click", function() {
    if( $(this).hasClass("current") ) {
      $(this).children("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
    }
    else {
      $(this).addClass("current").siblings().removeClass("current");
      $(".lt_sort i[class*=fa-angle-up]").removeClass("fa-angle-up").addClass("fa-angle-down");
    }
    render();
  })
})