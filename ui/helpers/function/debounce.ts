type CallBack<T> = (...args: T[]) => void

export const debounce = <T>(fn: CallBack<T>, delay?: number): CallBack<T> => {
  let timeout = -1

  return (...args) => {
    if (timeout !== -1) {
      clearTimeout(timeout)
    }

    timeout = window.setTimeout(fn, delay, ...args)
  }
}
