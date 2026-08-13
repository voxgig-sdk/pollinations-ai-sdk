# PollinationsAi SDK utility: make_context

from pollinationsai_sdk.core.context import PollinationsAiContext


def make_context_util(ctxmap, basectx):
    return PollinationsAiContext(ctxmap, basectx)
