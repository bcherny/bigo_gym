// import _ rather than individual methods because we stringify each
// generator, then execute it in a web worker.
import * as _ from 'lodash'

export type InputGeneratorFn = (count: number) => number[]

interface InputGenerator {
  name: string
  fn: InputGeneratorFn
}

const INPUT_GENERATORS: InputGenerator[] = [
  {
    name: 'Random, uniform',
    fn: function generate_input(count: number): number[] {
      return _.range(count).map(() =>
        _.random(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
      )
    }
  }
]

export default INPUT_GENERATORS