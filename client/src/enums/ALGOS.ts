export type AlgoFn = (as: number[]) => number[]

export interface Algo {
  name: string
  fn: AlgoFn
}

const ALGOS: Algo[] = [
  {
    name: 'Dummy n',
    fn: function dummy_n(items: number[]): number[] {
      let acc = []
      for (let a = 0; a < items.length; a++) {
        acc.push(items[a])
      }
      return acc
    }
  },
  {
    name: 'Dummy n²',
    fn: function dummy_n2(items: number[]): number[] {
      let acc = []
      for (let a = 0; a < items.length; a++) {
        for (let b = 0; b < items.length; b++) {
          acc.push(items[a])
          acc.push(items[b])
        }
      }
      return acc
    }
  },
  {
    name: 'Dummy n³',
    fn: function dummy_n3(items: number[]): number[] {
      let acc = []
      for (let a = 0; a < items.length; a++) {
        for (let b = 0; b < items.length; b++) {
          for (let c = 0; c < items.length; c++) {
            acc.push(items[a])
            acc.push(items[b])
            acc.push(items[c])
          }
        }
      }
      return acc
    }
  },
  {
    name: 'Quick Sort',
    fn: function quick_sort([a, ...as]: number[]): number[] {
      switch (a) {
        case undefined: return []
        default: return quick_sort(as.filter(_ => _ <= a))
          .concat(a)
          .concat(quick_sort(as.filter(_ => _ > a)))
      }
    }
  }
]

export default ALGOS