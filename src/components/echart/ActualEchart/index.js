import React from 'react'
import ReactEcharts from 'echarts-for-react'

const data = [
  { name: '认知', color: '#fa7475', sign: '1' },
  { name: '语言', color: '#64c745', sign: '2' },
  { name: '粗大动作', color: '#fa7475', sign: '3' },
  { name: '社会', color: '#67C9E8', sign: '5' },
  { name: '精细动作', color: '#fdbf30', sign: '8' },
]


class ActualEchart extends React.Component {
  render() {
    const { evaluation } = this.props.data
    const catgreys = Object.keys(evaluation.percents).map((e) => {
      return (
        data.filter((item) => String(item.sign) === String(e))[0].name
      )
    })
    const option = {
      tooltip: {
        formatter: '{b}<br />{a}: {c}%',
      },
      xAxis: {
        axisLine: {
          lineStyle: {
            color: '#333',
          },
        },
        axisTick: {
          show: false, // 隐藏刻度
        },
        axisLabel: {
          formatter: (value) => {
            if (value && value.length > 2) {
              return value.slice(0, 2) + '\n' + value.slice(2)
            }
            return value
          },
          color: '#333', // 刻度标签文字的颜色，默认取 axisLine.lineStyle.color
        },
        data: catgreys,
      },
      yAxis: {
        min: 0,
        max: 100,
        axisLine: {
          show: false, // 隐藏坐标轴线
        },
        axisLabel: {
          formatter: `{value}%`, // 刻度标签文字
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
      series: [{
        name: '能力值',
        type: 'bar',
        itemStyle: {
          normal: {
            color: (e) => {
              const index = e.dataIndex
              return data[index].color
            },
            barBorderRadius: 50,
          },
        },
        data: Object.values(evaluation.percents)
      }],
    }
    return (
      <div>
        <ReactEcharts option={option} />
      </div>
    )
  }
}
export default ActualEchart
