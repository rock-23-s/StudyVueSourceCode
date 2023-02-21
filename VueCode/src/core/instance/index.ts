import { warn } from '../util/index'
import type { GlobalAPI } from 'types/global-api'


function Vue (options) {
  if(__DEV__ && options) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}





export default Vue as unknown as GlobalAPI

