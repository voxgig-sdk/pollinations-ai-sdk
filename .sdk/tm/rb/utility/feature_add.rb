# PollinationsAi SDK utility: feature_add
module PollinationsAiUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
