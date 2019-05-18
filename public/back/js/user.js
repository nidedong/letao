$(function() {
  // 进入页面发送ajax请求渲染表格数据
  var currentPage = 1;
  var pageSize = 5;
  var id = 0;
  var isDelete;
  function render() {
  $.ajax({
    url: "/user/queryUser",
    dataType: "json",
    data: {
      page: currentPage,
      pageSize: pageSize
    },
    type: "get",
    success: function( info ) {
      console.log( info );
      var htmlStr = template("tpl", info);
      $("tbody").html( htmlStr );
      //分页初始化
      $('#pagintor').bootstrapPaginator({
        bootstrapMajorVersion: 3,
        currentPage: currentPage,
        totalPages: Math.ceil(info.total / info.size),
        onPageClicked: function(a, b, c, page) {
          // console.log( page );
          currentPage = page;
          render();
        }
      })
    }
  })
  }
  render();

  // 给表格中按钮添加点击事件
  $('tbody').on('click', '.btn', function() {
    $('#myModal').modal('show');
    id = $(this).parent().data('id');
    isDelete = $(this).hasClass('btn-danger') ? '0' : '1';
  })

  // 点击确认按钮时发送ajax请求改变isDelete
  $('.btn-change').on('click', function() {
    $('#myModal').modal('hide');
    $.ajax({
      url: "/user/updateUser",
      dataType: "json",
      type: "post",
      data: {
        id: id,
        isDelete: isDelete
      },
      success: function( info ) {
        render();
      }
    })
  })


})