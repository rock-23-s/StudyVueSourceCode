import type { Component } from "types/component"

export interface Config {
  // user
  silent: boolean
  warnHandler?: (msg: string, vm: Component | null, trace: string) => void
}

export default {

  /**
   * 警告处理程序为观察者警告
   */
  warnHandler: null,
  
  /**
   * 是否抑制警告。
   */
  silent: false,
} as unknown as Config
