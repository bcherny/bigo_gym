import * as React from 'react'
// import Chart from 'chart.js'

interface Props {
  data: [number, number, number][]
}
interface State {
  canvas: HTMLDivElement
  chart: any
}

export default class Graph extends React.Component<Props, State> {

  state: State = {
    canvas: null,
    chart: null
  }

  componentDidUpdate(props: Props, state: State) {

    console.log('data', this.props.data)

    if (!this.props.data.length) {
      return
    }

    const {canvas} = this.state

    MG.data_graphic({
      area: false,
      data: this.props.data.map(([x, y, e]) => ({ x, y, l: y - e, u: y + e })),
      width: canvas.offsetWidth,
      height: canvas.offsetHeight,
      target: canvas,
      x_accessor: 'x',
      y_accessor: 'y',
      show_confidence_band: ['l', 'u'],
      x_label: 'Count',
      x_rug: true,
      y_label: 'Time',
      y_rug: true
    })

  }

  render() {
    return <div className="Chart" ref={canvas => {
      if (this.state.canvas) return
      this.setState(Object.assign(this.state, { canvas }))
    } }>
      {this.props.data.length
        ? ''
        : <span className="Computing">Computing...</span>}
    </div>
  }

}