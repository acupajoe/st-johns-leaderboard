class Timer {
  constructor() {
    this.invocations = 0
    this.listeners = []
    this.refreshListeners = []
    this.ref = setInterval(() => {
      for (var listener of this.listeners) {
        listener.call()
      }
      this.invocations++
    }, 1000)
  }

  addListener(func, context) {
    this.listeners.push(func.bind(context))
  }

  removeListener(func) {
    const index = this.listeners.indexOf(func)
    this.listeners.splice(index, 1)
  }

  addRefreshListener(func, context) {
    this.refreshListeners.push(func.bind(context))
  }

  removeRefreshListener(func) {
    const index = this.refreshListeners.indexOf(func)
    this.listeners.splice(index, 1)
  }

  triggerRefresh() {
    for (var listener of this.refreshListeners) {
      listener.call()
    }
  }
}

export default new Timer()
