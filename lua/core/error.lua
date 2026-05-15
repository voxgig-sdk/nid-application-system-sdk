-- NidApplicationSystem SDK error

local NidApplicationSystemError = {}
NidApplicationSystemError.__index = NidApplicationSystemError


function NidApplicationSystemError.new(code, msg, ctx)
  local self = setmetatable({}, NidApplicationSystemError)
  self.is_sdk_error = true
  self.sdk = "NidApplicationSystem"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function NidApplicationSystemError:error()
  return self.msg
end


function NidApplicationSystemError:__tostring()
  return self.msg
end


return NidApplicationSystemError
