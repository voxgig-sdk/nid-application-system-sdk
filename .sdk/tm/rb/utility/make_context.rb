# NidApplicationSystem SDK utility: make_context
require_relative '../core/context'
module NidApplicationSystemUtilities
  MakeContext = ->(ctxmap, basectx) {
    NidApplicationSystemContext.new(ctxmap, basectx)
  }
end
