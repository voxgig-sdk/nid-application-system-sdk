-- Typed models for the NidApplicationSystem SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Application
---@field additional_info? string
---@field nid_number string
---@field police_report_number? string
---@field reason string

---@class ApplicationCreateData

---@class ApplicationStatus
---@field application_id? string
---@field application_type? string
---@field last_updated? string
---@field nid_number? string
---@field remark? string
---@field status? string
---@field submission_date? string

---@class ApplicationStatusLoadMatch
---@field id string

---@class Login
---@field captcha string
---@field expires_in? number
---@field password string
---@field success? boolean
---@field token? string
---@field user? table
---@field username string

---@class LoginCreateData

---@class NidManagement

---@class NidManagementLoadMatch

---@class Registration
---@field confirm_password string
---@field date_of_birth? string
---@field email string
---@field nid_number string
---@field password string
---@field phone? string

---@class RegistrationCreateData

---@class Success
---@field code string
---@field email string
---@field is_oversea? boolean
---@field message? string
---@field nid_number? string
---@field success? boolean

---@class SuccessCreateData

local M = {}

return M
