import {random, range} from 'lodash'

export type InputGeneratorFn = (count: number) => number[]

interface InputGenerator {
  name: string
  fn: InputGeneratorFn
}

const INPUT_GENERATORS: InputGenerator[] = [
  {
    name: 'Random, uniform',
    fn: function generate_input(count: number): number[] {
      return range(count).map(() =>
        random(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
      )
    }
  }
]

export default INPUT_GENERATORS