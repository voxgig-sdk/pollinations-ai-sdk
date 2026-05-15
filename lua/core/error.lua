-- PollinationsAi SDK error

local PollinationsAiError = {}
PollinationsAiError.__index = PollinationsAiError


function PollinationsAiError.new(code, msg, ctx)
  local self = setmetatable({}, PollinationsAiError)
  self.is_sdk_error = true
  self.sdk = "PollinationsAi"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function PollinationsAiError:error()
  return self.msg
end


function PollinationsAiError:__tostring()
  return self.msg
end


return PollinationsAiError
