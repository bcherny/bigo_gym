import * as Benchmark from 'benchmark'
import seq from 'promise-seq'
import {linear} from 'tregress'

const CONFIDENCE = .95

function fit(ns) {
  // TODO: try n2, log(n), nlog(n), 2n also
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

function big_o(fn, generate_input) {

  // TODO: ramp up counts and bail if it takes too long
  // 10, 50, 100, 500, 1000,
  // let counts = [10, 50, 100, 500, 1000, 5000, 10000, 20000]
  let counts = [1000, 1100, 1200, 1300, 1400, 1500]
  // 10000, 50000, 100000

  const times = {}

  return seq(counts.map(count => () =>
    new Promise((resolve, reject) => {
      const bench = new Benchmark(function () {
        return fn(generate_input(count))
      }, {
          onAbort: reject,
          onComplete: _ => {
            times[count].end = new Date().getTime()
            const elapsed = times[count].end - times[count].start
            console.log(` Done (${Math.round(elapsed/1000, 2)}s)\n`)

            // if this run took >10s, stop here
            // if (times[count].end - times[count].start > 10000) {
            //   console.log('Run took > 10s - aborting ramp up.')
            //   const i = counts.indexOf(count)
            //   counts.splice(i + 1) // TODO: use recursion instead to simplify this
            // }

            resolve([count, _.target.stats.mean])
          },
          onCycle: () => process.stdout.write(`.`),
          onError: reject,
          onStart: () => {
            times[count] = {
              start: new Date().getTime(),
              end: null
            }
            process.stdout.write(`Running for input size ${count} `)
          }
      })
      bench.run({async: true})
    })
  )).catch(err => {
    console.error(err)
  })
}