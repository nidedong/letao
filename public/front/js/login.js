$(function() {
  // 给登陆按钮添加点击事件
  $(".btn_login").on("click", function() {
    // 验证表单不能为空
    if( $(".username").val().trim() === "") {
      mui.toast("用户名不能为空");
      return;
    }
    if( $(".password").val().trim() === "") {
      mui.toast("密码不能为空");
      return;
    }
    // 验证成功发送ajax请求
    $.ajax({
      url: "/user/login",
      type: "post",
      dataType: "json",
      data: $(".mui-input-group").serialize(),
      success: function( info ) {
        console.log( info );
        if( info.error === 403 ) {
          mui.toast("用户名或密码错误");
          return;
        }
        if( info.success ) {
          // 如果是从别的页面跳转过来的,跳转回去
          if( location.search.indexOf("retUrl") > -1 ) {
            var retUrl = location.search.replace("?retUrl=", "");
            location.href = retUrl;
          }else {
            // 如果是登陆页面,跳转到用户中心
            location.href = "./user.html";
          }
        }

      }
    })
  })


})