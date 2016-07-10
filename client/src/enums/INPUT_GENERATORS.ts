import {random, range} from 'lodash'

interface InputGenerator {
  name: string
  fn(count: number): number[]
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