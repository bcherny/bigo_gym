import * as React from 'react'
import {render} from 'react-dom'
import Chart from './Chart'
import ListView, {Item} from './ListView'

interface Props { }
interface State {
  algos: Item[]
}

export default class App extends React.Component<Props, State> {

  state = {
    algos: [
      { id: 0, name: 'QuickSort' }
    ]
  }

  private onClick(id: number) {

  }

  render() {
    return <div className="App">
      <ListView
        activeId={0}
        items={this.state.algos}
        onClick={this.onClick.bind(this) }
      />
      <Chart />
    </div>
  }
}