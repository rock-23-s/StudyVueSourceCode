import config from '../config'
import type { Component } from 'types/component'
import { noop } from 'shared/util'
import { currentInstance } from 'v3/currentInstance'


export let warn: (msg: string, vm?: Component | null) => void = noop
export let generateComponentTrace: (vm: Component) => string // 处理流程检查

if (__DEV__) {
  warn = (msg, vm = currentInstance) => {
    let hasConsole = typeof console !== undefined;
    const trace = vm ? generateComponentTrace(vm) : ''

    if(config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace)
    } else if(hasConsole && !config.silent) {
      console.error(`[Vue warn]: ${msg}${trace}`)
    }
  }
}

