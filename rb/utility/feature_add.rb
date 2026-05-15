# NidApplicationSystem SDK utility: feature_add
module NidApplicationSystemUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
