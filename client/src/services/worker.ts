export function create(fn: Function) {
  const blob = new Blob([fn.toString()], { type: 'text/javascript' })
  return new Worker(window.URL.createObjectURL(blob))
  // worker.onmessage = (event) => { }
  // worker.onerror = (error) => { }
  // worker.postMessage('')
}