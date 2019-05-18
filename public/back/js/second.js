$(function() {
  var currentPage = 1;
  var pageSize = 5;
  // 进入页面发送ajax请求获取数据渲染页面
  render();
  function render() {
    $.ajax({
      url: "/category/querySecondCategoryPaging",
      type: "get",
      dataType: "json",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function( info ) {
        console.log( info );
        var htmlStr = template('tpl', info);
        $('tbody').html( htmlStr );
        $('#pagintor').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          totalPages: Math.ceil( info.total / info.size ),
          currentPage: currentPage,
          onPageClicked: function(a, b, c, page) {
            currentPage = page;
            render();
          }
        })
      }
    })
  }

  // 点击添加分类按钮显示模态框
  $('.btn-addCate').on('click', function() {
    $('.add-modal').modal('show');
    // 点击分类按钮时发送ajax请求渲染下拉列表
    $.ajax({
      url: "/category/queryTopCategoryPaging",
      dataType: "json",
      type: "get",
      data: {
        page: 1,
        pageSize: 100
      },
      success: function( info ) {
        console.log( info );
        var htmlStr = template('dropTpl', info);
        $('.dropdown-menu').html( htmlStr );
      }
    })
  })


  // 给下拉菜单添加点击事件
  $('.dropdown').on('click', '.dropdown-menu li', function() {
    $('#chose').text($(this).text());

    $('[name=categoryId]').val($(this).data('id'));

    //手动改变验证状态
    $("#form").data("bootstrapValidator").updateStatus('categoryId', 'VALID');
  })

  // 发送ajax请求转存图片返回图片地址
  $('#fileupload').fileupload({
    dataType: "json",
    done: function( e, data ) {
      console.log( data );
      $('.imgBox').attr("src", data.result.picAddr);
      $('[name=brandLogo]').val( data.result.picAddr );
      $("#form").data("bootstrapValidator").updateStatus('brandLogo', 'VALID');
    }
  })
  
  // 添加表单验证
  $('#form').bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [],
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传图片"
          }
        }
      }
    }
  })


  $("#form").on('success.form.bv', function (e) {
    // 组织表单默认提交事件
    e.preventDefault();

    //使用ajax提交逻辑
    $.ajax({
      url: "/category/addSecondCategory",
      dataType: "json",
      data: $("form").serialize(),
      type: "post",
      success: function( info ) {
        console.log( info );
        $(".add-modal").modal('hide');
        currentPage = 1;
        render();
        $('#form').data('bootstrapValidator').resetForm(true);
        $('#chose').text('请选择一级分类');
        $('.imgBox').attr("src", "./images/none.png");
      }
    })
  });
})