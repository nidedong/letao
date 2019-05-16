$(function() {
  // Nprogress插件实现进度条功能
  $(document).ajaxStart(function() {
    NProgress.start();
  })

  $(document).ajaxStop(function() {
      NProgress.done();
  })

  //登陆拦截功能
  if( location.href.indexOf('login.html') === -1 ) {
    $.ajax({
      url: '/employee/checkRootLogin',
      type: 'get',
      dataType: 'json',
      success: function( info ) {
        if( info.error === 400 ) {
          location.href = './login.html';
        }
      }
    })
  }

  //二级菜单栏下滑功能
  $('.category').on('click', function() {
    $('.second').stop().slideToggle();
  })

  // 显示侧边栏
  $('.btn-cate').on('click', function() {
    $('.lt-aside').toggleClass('hidemenu');
    $('.lt-topbar').toggleClass('hidemenu');
    $('.main').toggleClass('hidemenu');
  })

  //显示模态框
  $('.btn-logout').on('click', function() {
    $('.logout-modal').modal('show');
  })

  // 退出登录
  $('.btn-ok').on('click', function() {
    $.ajax({
      url: '/employee/employeeLogout',
      type: 'get',
      dataType: 'json',
      success: function( info ) {
        if( info.success ) {
          location.href = './login.html';
        }
      }
    })
  })
})