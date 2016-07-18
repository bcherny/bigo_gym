import {chunk, flatten} from 'lodash'
import * as React from 'react'
import {render} from 'react-dom'
import seq from 'promise-seq'
import Graph from './Graph'
import {Algo, AlgoFn} from '../enums/ALGOS'
import INPUT_GENERATORS, {InputGeneratorFn} from '../enums/INPUT_GENERATORS'
import {bigO, getCounts} from '../services/bench'

interface Props {
  algo: Algo
}
interface State {
  data: [number, number, number][]
}

const hardwareConcurrency: number = (navigator as any).hardwareConcurrency

// TODO: run more as slots become available
function pool<A>(
  as: (() => Promise<A>)[],
  size = hardwareConcurrency || 8
): Promise<A[]> {
  return seq(chunk(as, size).map(_ => () => seq(_))).then(flatten)
}

export default class Workbench extends React.Component<Props, State> {

  state = {
    data: []
  }

  componentDidMount() {
    this.benchmark(this.props.algo.fn, INPUT_GENERATORS[0].fn)
  }
  benchmark(fn: AlgoFn, generate_input: InputGeneratorFn) {
    pool(getCounts(fn, generate_input).map((count, n) => () =>
      bigO(fn, generate_input, count).then(res => {
        const {data} = this.state
        data[n] = res
        this.setState({data})
      })
    ))
  }
  render() {
    return <div className="Workbench">
      <Graph data={this.state.data} />
    </div>
  }
}