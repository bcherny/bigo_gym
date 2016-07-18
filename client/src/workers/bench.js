importScripts('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.13.1/lodash.js')
importScripts('https://cdnjs.cloudflare.com/ajax/libs/benchmark/2.1.0/benchmark.js')

function run(fn, generate_input, count) {
  return new Promise((resolve, reject) => {
    const bench = new Benchmark(
      () => fn(generate_input(count)),
      {
        onAbort: reject,
        onComplete: _ => {
          // TODO: contribute better typings
          resolve([count, _.target.stats.mean, _.target.stats.deviation])
        },
        onError: reject
      }
    )
    bench.run({ async: false })
  })
}

onmessage = ({data}) => {
  const fn = hydrateFn(data[0])
  const generate_input = hydrateGenerator(data[1])
  const count = data[2]
  console.log(`Running for ${count}...`)
  run(fn, generate_input, count).then(
    res => postMessage(res),
    err => { throw err }
  )
}

function hydrateFn(fnString) {
  return new Function('items', fnString)
}

function hydrateGenerator(fnString) {
  return new Function('count', fnString)
}