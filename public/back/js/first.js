$(function() {
  var currentPage = 1;
  var pageSize = 5;
  // 进入页面发送ajax请求渲染页面
  function render() {
    $.ajax({
      url: "/category/queryTopCategoryPaging",
      type: "get",
      dataType: "json",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function( info ) {
        console.log( info );
        var htmlStr = template('cateTpl', info);
        $('tbody').html( htmlStr );
        
        // 分页
        $('#pagintor').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function(a, b, c, page) {
            currentPage = page
            render();
          }
        })
      }
    })
  }
  render();
  
  // 点击添加分类按钮显示模态框
  $('.btn-addCate').on('click', function() {
    $('.add-modal').modal('show');
  })

  // // 表单校验
  $('#form').bootstrapValidator({
  
    //指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 指定校验字段
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: '请输入一级分类名称'
          }
        }
      }
  
    }
  });

  // 检验成功
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      url: "/category/addTopCategory",
      dataType: "json",
      data: $('#form').serialize(),
      type: "post",
      success: function( info ) {
        currentPage = 1;
        render();
        $('.add-modal').modal('hide');
        $('#form').data('bootstrapValidator').resetForm(true);
      }
    })
  });
})