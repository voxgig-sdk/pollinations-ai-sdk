# PollinationsAi SDK utility: prepare_body
require_relative 'media'
module PollinationsAiUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return PollinationsAiUtilities.raw_body(ctx.reqdata) if PollinationsAiUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
