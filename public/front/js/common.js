
  // 初始化scroll控件
  mui('.mui-scroll-wrapper').scroll({
    scrollY: true, //是否竖向滚动
    scrollX: false, //是否横向滚动
    startX: 0, //初始化时滚动至x
    startY: 0, //初始化时滚动至y
    indicators: false, //是否显示滚动条
    deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
    bounce: true //是否启用回弹
  });

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
