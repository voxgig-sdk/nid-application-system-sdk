
import { Context } from './Context'


class NidApplicationSystemError extends Error {

  isNidApplicationSystemError = true

  sdk = 'NidApplicationSystem'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  NidApplicationSystemError
}

