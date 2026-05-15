package = "voxgig-sdk-nid-application-system"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/nid-application-system-sdk.git"
}
description = {
  summary = "NidApplicationSystem SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["nid-application-system_sdk"] = "nid-application-system_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
