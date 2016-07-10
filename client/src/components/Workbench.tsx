import * as React from 'react'
import {render} from 'react-dom'
import Chart from './Chart'
import {Algo} from '../enums/ALGOS'
import INPUT_GENERATORS from '../enums/INPUT_GENERATORS'
import {bigO} from '../services/bench'

interface Props {
  algo: Algo
}
interface State { }

export default class Workbench extends React.Component<Props, State> {
  componentDidMount() {
    bigO(this.props.algo.fn, INPUT_GENERATORS[0].fn).then((res => console.log('bench done!', res))
  }
  render() {
    return <div className="Workbench">
      <Chart />
    </div>
  }
}