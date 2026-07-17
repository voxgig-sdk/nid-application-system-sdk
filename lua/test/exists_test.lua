-- NidApplicationSystem SDK exists test

local sdk = require("nid-application-system_sdk")

describe("NidApplicationSystemSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
