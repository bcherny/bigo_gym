import * as React from 'react'
import {Dataset, Plots, Scales} from 'plottable'

interface Props { }
interface State {
  svg: HTMLDivElement
}

export default class Chart extends React.Component<Props, State> {

  state: State = {
    svg: null
  }

  componentDidUpdate() {
    let xScale = new Scales.Linear()
    let yScale = new Scales.Linear()
    let data = [{ x: 1, y: 1 }, { x: 2, y: 3 }, { x: 3, y: 2 },
      { x: 4, y: 4 }, { x: 5, y: 3 }, { x: 6, y: 5 }];

    let plot = new Plots.Scatter()
      .addDataset(new Dataset(data))
      .x(_ => _.x, xScale)
      .y(_ => _.y, yScale)
      .renderTo(this.state.svg)
  }

  render() {
    return <svg className="Chart" ref={svg => {
      if (this.state.svg) return
      this.setState(Object.assign(this.state, {svg}))
    }}></svg>
  }

}