# NidApplicationSystem SDK feature factory

from feature.base_feature import NidApplicationSystemBaseFeature
from feature.test_feature import NidApplicationSystemTestFeature


def _make_feature(name):
    features = {
        "base": lambda: NidApplicationSystemBaseFeature(),
        "test": lambda: NidApplicationSystemTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
