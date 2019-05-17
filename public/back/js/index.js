$(function() {
  // 柱状图初始化
  var myChart1 = echarts.init(document.querySelector('.echart-1'));
  // 指定图表的配置项和数据
  var option = {
    title: {
      text: '2018年注册人数'
    },
    tooltip: {},
    legend: {
      data:['销量']
    },
    xAxis: {
      data: ["一月","二月","三月","四月","五月","六月"]
    },
    yAxis: {},
    series: [{
      name: '销量',
      type: 'bar',
      data: [200, 100, 500, 640, 320, 590]
    }]
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart1.setOption(option);


  //饼状图
  var myChart2 = echarts.init(document.querySelector('.echart-2'));
  //指定图表的配置项和数据
  var option = {
    title : {
      text: '热门品牌销售',
      subtext: '2017年6月',
      x:'center'
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['耐克','阿迪达斯','新百伦','李宁','匡威']
    },
    series : [
      {
        name: '品牌',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        data:[
          {value:335, name:'耐克'},
          {value:310, name:'阿迪达斯'},
          {value:234, name:'新百伦'},
          {value:135, name:'李宁'},
          {value:1548, name:'匡威'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  myChart2.setOption(option);

})