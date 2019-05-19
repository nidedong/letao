$(function() {
  var currentPage = 1;
  var pageSize = 3;
  var imgArr = [];

  // 进入页面发送ajax请求渲染页面
  function render() {
    $.ajax({
      url: "/product/queryProductDetailList",
      type: "get",
      dataType: "json",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function( info ) {
        console.log( info );
        var htmlStr = template("tableTpl", info);
        $('tbody').html( htmlStr );
        $('#pagintor').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
          totalPages: Math.ceil( info.total / info.size ),
          onPageClicked: function(a, b, c, page) {
            currentPage = page;
            render();
          }
        })
      }
    })
  }
  render();
  
  
  // 点击添加按钮，模态框出现
  $('.btn-product').on('click', function() {
    $('.product-modal').modal('show');
    //点击按钮时发送ajax请求渲染下拉菜单
    $.ajax({
      url: "/category/querySecondCategoryPaging",
      dataType: "json",
      data: {
        pageSize: 100,
        page: 1
      },
      type: "get",
      success: function( info ) {
        console.log( info );
        var htmlStr = template("dropTpl", info);
        $(".dropdown-menu").html( htmlStr );
      }
    })
  })

  //下拉菜单通过事件委托添加点击事件
  $(".dropdown").on("click", ".dropdown-menu li", function() {
    var id = $(this).data('id');
    var text = $(this).children().text();
    $('#chose').text( text );
    $('[name=brandId]').val( id );
    //手动改变验证状态
    $('form').data('bootstrapValidator').updateStatus('brandId', 'VALID');
  })

  //添加表单验证
  $('#form').bootstrapValidator({
    excluded: [],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      // 二级分类
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      // 商品名称
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      // 原价
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入原价"
          }
        }
      },
      // 价格
      price: {
        validators: {
          notEmpty: {
            message: "请输入现价"
          }
        }
      },
      // 商品描述
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      // 商品尺寸
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺寸"
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '尺码格式, 必须是 32-40'
          }
        }
      },
      // 商品库存
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存格式, 必须是非零开头的数字'
          }
        }
      },
      // 验证图片数量
      imgNum: {
        validators: {
          notEmpty: {
            message: "请选择三张图片"
          }
        }
      }
    }
  })

  //点击文件按钮发送请求返回图片地址
  $('#fileupload').fileupload({
    dataType: "json",
    done: function( a, data ) {
      imgArr.unshift( data.result );
      console.log( imgArr );
      $('.imgBox').prepend('<img src=' + data.result.picAddr + ' height="100">');
      if( imgArr.length > 3 ) {//使上传的图片数量限制在三张
        $('.imgBox img:last-of-type').remove();
        imgArr.pop();
        $('#form').data('bootstrapValidator').updateStatus('imgNum', 'VALID');
      }
    }
  })


  // 表单验证成功发送ajax请求添加数据
  $('#form').on('success.form.bv', function() {
    // 将图片地址名字拼接到序列化后的数据中
    var data = $('#form').serialize();
    data += "&picAddr1=" + imgArr[0].picAddr + "&picName1=" + imgArr[0].picName;
    data += "&picAddr2=" + imgArr[1].picAddr + "&picName2=" + imgArr[1].picName;
    data += "&picAddr3=" + imgArr[2].picAddr + "&picName3=" + imgArr[2].picName;
    console.log( data );
    $.ajax({
      url: "/product/addProduct",
      dataType: "json",
      type: "post",
      data: data,
      success: function( info ) {
        console.log( info );
        currentPage = 1;
        render();
        $('product-modal').modal('hide');
        $('#form').data('bootstrapValidator').resetForm(true);
        $('#chose').text("请选择二级分类");
        $('.imgBox img').remove();
      }
    })
  })
})