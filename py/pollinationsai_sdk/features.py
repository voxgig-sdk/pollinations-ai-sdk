# PollinationsAi SDK feature factory

from pollinationsai_sdk.feature.base_feature import PollinationsAiBaseFeature
from pollinationsai_sdk.feature.test_feature import PollinationsAiTestFeature


def _make_feature(name):
    features = {
        "base": lambda: PollinationsAiBaseFeature(),
        "test": lambda: PollinationsAiTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
