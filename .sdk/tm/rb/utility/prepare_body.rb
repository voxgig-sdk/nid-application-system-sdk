# NidApplicationSystem SDK utility: prepare_body
require_relative 'media'
module NidApplicationSystemUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return NidApplicationSystemUtilities.raw_body(ctx.reqdata) if NidApplicationSystemUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
