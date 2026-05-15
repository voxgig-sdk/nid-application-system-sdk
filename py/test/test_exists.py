# ProjectName SDK exists test

import pytest
from nidapplicationsystem_sdk import NidApplicationSystemSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = NidApplicationSystemSDK.test(None, None)
        assert testsdk is not None
