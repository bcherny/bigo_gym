import * as Benchmark from 'benchmark'
import seq from 'promise-seq'
import {range} from 'lodash'
import {linear} from 'tregress'
import {AlgoFn} from '../enums/ALGOS'
import {InputGeneratorFn} from '../enums/INPUT_GENERATORS'

const CONFIDENCE = .95

interface Fit {
  r2: number | void
  type: 'LINEAR' | 'UNDEFINED'
}

// TODO: try n2, log(n), nlog(n), 2n also
function fit(ns: [number, number][]): Fit {
  const {r2} = linear(...ns)
  if (r2 > CONFIDENCE) {
    return {
      r2,
      type: 'LINEAR'
    }
  } else {
    return {
      r2,
      type: 'UNDEFINED'
    }
  }
}

function computeInitialCount(fn: AlgoFn, generate_input: InputGeneratorFn): number {

  let count = 10
  let t = 0

  console.info(`Ramping up count, starting at ${count}...`)

  while ((t = time(() => fn(generate_input(count)))) < 1000) {
    count *= 10
    console.info(`Ramping up count to ${count}...`)
  }

  return count

}

function getCounts(fn: AlgoFn, generate_input: InputGeneratorFn): number[] {
  const start = computeInitialCount(fn, generate_input)
  return range(start, start*1.1, start*0.1)
}

// time a function's execution time (in ms)
function time(fn: Function): number {
  const a = new Date().getTime()
  fn()
  return new Date().getTime() - a
}

export function bigO(fn: AlgoFn, generate_input: InputGeneratorFn): Promise<[number, number][]> {

  const counts = getCounts(fn, generate_input)
  const times = {}

  return seq(counts.map(count => () =>
    new Promise((resolve, reject) => {
      const bench = new Benchmark(
        () => fn(generate_input(count)),
        {
          onAbort: reject,
          onComplete: (_: Benchmark.Event) => {
            times[count].end = new Date().getTime()
            const elapsed = times[count].end - times[count].start
            console.info(` Done (${Math.round(elapsed/1000)}s)\n`)

            // if this run took >10s, stop here
            // if (times[count].end - times[count].start > 10000) {
            //   console.log('Run took > 10s - aborting ramp up.')
            //   const i = counts.indexOf(count)
            //   counts.splice(i + 1) // TODO: use recursion instead to simplify this
            // }

            // TODO: contribute better typings
            resolve([count, (_.target as Benchmark).stats.mean])
          },
          // onCycle: () => process.stdout.write(`.`),
          onError: reject,
          onStart: () => {
            times[count] = {
              start: new Date().getTime(),
              end: null
            }
            console.info(`Running for input size ${count}`)
          }
        }
      )
      bench.run({async: true})
    })
  )).catch(err => {
    console.error(err)
  })
}