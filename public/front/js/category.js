$(function() {
  // 进入分类页面发送ajax请求渲染一级分类和第一个一级分类对应的二级分类
  $.ajax({
    url: "/category/queryTopCategory",
    type: "get",
    dataType: "json",
    success: function( info ) {
      console.log( info );
      var htmlStr = template("firstTpl", info);
      $(".main_left ul").html( htmlStr );
      renderSecondById( info.rows[0].id );
    }
    
  })

  function renderSecondById( id ) {
    $.ajax({
      url: "/category/querySecondCategory",
      data: {
        id: id
      },
      dataType: "json",
      type: "get",
      success: function( info ) {
        console.log( info );
        var htmlStr = template("secondTpl", info);
        $(".main_right ul").html( htmlStr );
      }

    })
  }

  // 给一级分类标签添加事件委托
  $(".main_left").on("click", "a", function() {
    var id = $(this).data("id");
    $(this).addClass("current").parent().siblings().find('a').removeClass("current");
    renderSecondById( id );
  })
})