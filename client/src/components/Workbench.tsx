import * as React from 'react'
import {render} from 'react-dom'
import Chart from './Chart'
import {Algo} from '../enums/ALGOS'

interface Props {
  algo: Algo
}
interface State { }

export default class Workbench extends React.Component<Props, State> {
  render() {
    return <div className="Workbench">
      <Chart />
    </div>
  }
}