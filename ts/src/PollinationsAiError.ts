
import { Context } from './Context'


class PollinationsAiError extends Error {

  isPollinationsAiError = true

  sdk = 'PollinationsAi'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  PollinationsAiError
}

