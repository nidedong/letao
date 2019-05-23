$(function() {
  // 假数据
  // var arr = ['张飞覅', '李四', '王五', '二哈', '久久', '七七'];
  // var jsonStr = JSON.stringify( arr );
  // console.log( jsonStr );
  // localStorage.setItem("search_list", jsonStr);

  
  // 渲染搜索历史思路
  // 1.从本地存储获取搜索历史列表
  // 2.将获取的json字符串转换成数组
  // 3.通过模板引擎渲染搜索历史
  function getHistory() {
    var history = localStorage.getItem("search_list") || '[]';
    var arr = JSON.parse( history );
    return arr;
  }

  function render() {
    var arr = getHistory();
    var htmlStr = template("historyTpl", { arr: arr });
    $(".lt_history").html( htmlStr );
  }
  render();

  //清空功能，给i标签添加事件委托
  // 1.获取本地存储的历史列表
  // 2.将获得的json字符串转换为数组
  // 3.将数组置为空
  // 4.将数组转为json字符串,存入本地存储中
  // 5.刷新页面
  $(".lt_history").on("click", ".btn_empty", function() {
    mui.confirm("您确定要清空历史记录吗", "温馨提示", ["取消", "确认"], function( e ) {
      if( e.index === 1 ) {
        localStorage.removeItem('search_list');
        render();
      }
    })
  })

  // 删除单个功能
  // 1.给删除按钮通过事件委托添加点击事件
  // 2.点击时获取本地存储历史列表,获取按钮的下标,
  // 3.删除数组中对应下标的字符串
  // 4.将处理后的字符串转换为json字符串存储到本地存储中
  // 5.刷新页面
  $(".lt_history").on("click", ".btn_del", function() {
    var that = this;
    mui.confirm("您确定要删除该条记录吗", "温馨提示", ["取消", "确认"], function( e ) {
      if( e.index === 1 ) {
        var arr = getHistory();
        var index = $(that).data('index');
        arr.splice(index, 1);
        var jsonStr = JSON.stringify( arr );
        localStorage.setItem("search_list", jsonStr);
        render();
      }
    })
  })

  // 添加功能
  // 点击搜索按钮时获取搜索框的内容,从本地存储获取搜索历史列表,
  // 将获取的内容加到历史列表的最前面,如果有重复的,则删除重复的数据
  //最后刷新页面
  $(".search_btn").on("click", function() {
    var text = $(".search_input").val();
    if( !text ) {
      mui.toast("请输入搜索关键字");
      return;
    }
    var arr = getHistory();
    // 删除重复的数据
    if( arr.indexOf( text ) != -1 ) {
      arr.splice( arr.indexOf( text ), 1 );
    }
    // 将搜索历史长度控制在10个
    if( arr.length >= 10 ) {
      arr.pop();
    }
    arr.unshift( text );
    var jsonStr = JSON.stringify( arr );
    localStorage.setItem("search_list", jsonStr);
    render();
    $(".search_input").val("");
    location.href = "./searchList.html?key=" + text;
  })
  
})