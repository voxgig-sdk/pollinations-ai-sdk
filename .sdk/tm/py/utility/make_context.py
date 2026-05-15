# PollinationsAi SDK utility: make_context

from core.context import PollinationsAiContext


def make_context_util(ctxmap, basectx):
    return PollinationsAiContext(ctxmap, basectx)
