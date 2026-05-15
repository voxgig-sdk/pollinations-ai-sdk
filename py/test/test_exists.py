# ProjectName SDK exists test

import pytest
from pollinationsai_sdk import PollinationsAiSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = PollinationsAiSDK.test(None, None)
        assert testsdk is not None
