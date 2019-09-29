import React from 'react'
import ReactEcharts from 'echarts-for-react'

class HeightEchart extends React.Component {
  render() {
    const { evaluation } = this.props.data
    const option = {
      title: {
        // text: '身高生长发育监测图（X:月 Y:cm）'
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          const arr = params.map(e => e.value ? `${e.seriesName}: ${e.value}cm` : '')
          return `${params[0].name}个月<br /> ${arr.join('<br />')}`
        },
      },
      legend: {
        top: 'bottom',
        data: [
          { name: '身高上限', icon: 'rect' },
          { name: '身高下限', icon: 'rect' },
          { name: '实测身高' },
        ],
      },
      // toolbox: {
      //   feature: {
      //     saveAsImage: {}
      //   }
      // },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: '#333',
          },
        },
        axisTick: {
          // show: false, // 隐藏刻度
        },

        axisLabel: {
          // formatter: '{value}个月',
          color: '#333', // 刻度标签文字的颜色，默认取 axisLine.lineStyle.color
        },
        data: evaluation.age_months,
      },
      // yAxis: {
      //   type: 'value',
      //   // scale : true,
      //   min: Math.min(evaluation.height.lower_limit[0], evaluation.height.lower_limit[0]),
      //   // max : 120,
      //   // splitNumber : 5,
      // },
      yAxis: {
        type: 'value',
        // scale : true,
        min: Math.min(evaluation.height.lower_limit[0], evaluation.height.lower_limit[0]),
        // max : 120,
        // splitNumber : 5,
        axisLine: {
          show: false, // 隐藏坐标轴线
        },
        axisTick: {
          show: false, // 隐藏刻度
        },
        splitLine: { // 坐标轴在 grid 区域中的分隔线
          lineStyle: {
            type: 'dotted', // 
          },
        },
      },
      series: [
        {
          name: '身高上限',
          type: 'line',
          symbol: 'none',
          // symbolSize: 10,
          lineStyle: {
            color: '#f00'
          },
          data: evaluation.height.limit,
        },
        {
          name: '身高下限',
          type: 'line',
          symbol: 'none',
          // symbolSize: 10,
          lineStyle: {
            color: '#0f0'
          },
          data: evaluation.height.lower_limit,
        },
        {
          name: '实测身高',
          type: 'line',
          symbol: 'circle',
          symbolSize: 10,
          lineStyle: {
            color: '#00f'
          },
          data: evaluation.height.actual
        },
      ],
    };
    return (
      <div>
        <ReactEcharts option={option} />
      </div>
    )
  }
}
export default HeightEchart
