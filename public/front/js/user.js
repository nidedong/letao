$(function() {

  // 进入退出页面时发送ajax请求渲染用户信息
  $.ajax({
    url: "/user/queryUserMessage",
    dataType: "json",
    type: "get",
    success: function( info ) {
      if( info.error === 400 ) {
        location.href = "./login.html";
      }else {
        console.log( info );
        var htmlStr = template("userTpl", info );
        $(".userInfo").html( htmlStr );
      }

    }
  })

  // 点击退出按钮是发送ajax请求退出登录
  $(".btn-logout").on("click", function() {
    $.ajax({
      url: "/user/logout",
      dataType: "json",
      type: "get",
      success: function( info ) {
        console.log( info );
        if( info.success ) {
          location.href = "./login.html";
        }
      }
    })
  })
})