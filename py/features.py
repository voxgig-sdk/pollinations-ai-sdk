# PollinationsAi SDK feature factory

from feature.base_feature import PollinationsAiBaseFeature
from feature.test_feature import PollinationsAiTestFeature


def _make_feature(name):
    features = {
        "base": lambda: PollinationsAiBaseFeature(),
        "test": lambda: PollinationsAiTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
