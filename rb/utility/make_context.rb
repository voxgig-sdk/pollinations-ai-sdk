# PollinationsAi SDK utility: make_context
require_relative '../core/context'
module PollinationsAiUtilities
  MakeContext = ->(ctxmap, basectx) {
    PollinationsAiContext.new(ctxmap, basectx)
  }
end
