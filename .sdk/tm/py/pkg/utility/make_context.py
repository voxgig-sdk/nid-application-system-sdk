# NidApplicationSystem SDK utility: make_context

from projectname_sdk.core.context import NidApplicationSystemContext


def make_context_util(ctxmap, basectx):
    return NidApplicationSystemContext(ctxmap, basectx)
