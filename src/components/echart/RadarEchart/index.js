import React from 'react'
import ReactEcharts from 'echarts-for-react'

class RadarEchart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      category: {
        '1': '认知',
        '2': '语言',
        '3': '粗大动作',
        '5': '社会',
        '8': '精细动作',
      }
    }
  }
  render() {
    const { evaluation } = this.props.data

    const indicator = Object.keys(evaluation.score).map((item) => {
      return (
        {
          text: this.state.category[String(item)],
          max: 8,
        }
      )
    })
    const option = {
      tooltip: {},
      radar: {
        // shape: 'circle',
        splitArea: {
          show: false,
        },
        axisLine: {//坐标轴线相关设置
          show: true,
        },
        indicator: indicator
      },
      series: [{
        type: 'radar',
        symbol: 'circle',
        symbolSize: 10,
        tooltip: {
          trigger: 'item'
        },
        itemStyle: { normal: { areaStyle: { type: 'default' } } },
        // areaStyle: {normal: {}},
        data: [
          {
            value: Object.values(evaluation.score),
            name: '能力值',
          }
        ]
      }],
    };
    return (
      <div>
        <ReactEcharts option={option} />
      </div>
    )
  }
}
export default RadarEchart
