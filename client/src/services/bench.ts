import * as Benchmark from 'benchmark'
import seq from 'promise-seq'
import {range} from 'lodash'
import {linear} from 'tregress'
import {AlgoFn} from '../enums/ALGOS'
import {InputGeneratorFn} from '../enums/INPUT_GENERATORS'
import {create as createWorker} from './worker'

const CONCURRENCY: number = (navigator as any).hardwareConcurrency || 4
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

  const MIN_EXECUTION_TIME = 100

  let count = 10
  let t = 0

  console.info(`Ramping up count, starting at ${count}...`)

  while ((t = time(() => fn(generate_input(count)))) < MIN_EXECUTION_TIME) {
    count *= 10
    console.info(`Ramping up count to ${count}...`)
  }

  return count

}

export function getCounts(fn: AlgoFn, generate_input: InputGeneratorFn): number[] {
  const start = computeInitialCount(fn, generate_input)
  return range(start*0.1, start*2.1, start*0.05)
}

// time a function's execution time (in ms)
function time(fn: Function): number {
  const a = new Date().getTime()
  fn()
  return new Date().getTime() - a
}

export function bigO(
  fn: AlgoFn,
  generate_input: InputGeneratorFn,
  count: number
): Promise<[number, number, number]> {
  return new Promise((resolve, reject) => {
    const worker = new Worker('../src/workers/bench.js')
    worker.onerror = err => {
      reject(err)
      worker.terminate()
    }
    worker.onmessage = ({data}: { data: [number, number, number] }) => {
      console.log(`${data[0]}... Done.`)
      resolve(data)
      worker.terminate()
    }
    worker.postMessage([
      stringifyFnBody(fn),
      stringifyFnBody(generate_input),
      count
    ])
  })
}

function stringifyFnBody(fn: Function): string {
  return fn.toString().match(/function[^{]+\{([\s\S]*)\}$/)[1]
}