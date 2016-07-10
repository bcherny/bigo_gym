import * as React from 'react'
import {render} from 'react-dom'
import ListView, {Item} from './ListView'
import Workbench from './Workbench'
import ALGOS from '../enums/ALGOS'

interface Props { }
interface State {
  selectedAlgoId: number
}

export default class App extends React.Component<Props, State> {

  state = {
    selectedAlgoId: 0
  }

  private onClick(id: number) {
    this.state.selectedAlgoId = id
  }

  render() {
    return <div className="App">
      <ListView
        activeId={this.state.selectedAlgoId}
        items={ALGOS.map(({name}, id) => ({id, name}))}
        onClick={this.onClick.bind(this) }
      />
      <Workbench algo={ALGOS[this.state.selectedAlgoId]} />
    </div>
  }
}