-- Typed models for the NidApplicationSystem SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Application
---@field additionalInfo? string
---@field nidNumber string
---@field policeReportNumber? string
---@field reason string

---@class ApplicationCreateData
---@field additionalInfo? string
---@field nidNumber string
---@field policeReportNumber? string
---@field reason string

---@class ApplicationStatus
---@field applicationId? string
---@field applicationType? string
---@field id? string
---@field lastUpdated? string
---@field nidNumber? string
---@field remarks? string
---@field status? string
---@field submissionDate? string

---@class ApplicationStatusLoadMatch
---@field id string

---@class Login
---@field accountStatus? string
---@field captcha string
---@field email? string
---@field fullName? string
---@field nidNumber? string
---@field password string
---@field phone? string
---@field userId? string
---@field username string

---@class LoginCreateData
---@field accountStatus? string
---@field captcha string
---@field email? string
---@field fullName? string
---@field nidNumber? string
---@field password string
---@field phone? string
---@field userId? string
---@field username string

---@class NidManagement

---@class NidManagementLoadMatch
---@field format? string
---@field nid_number string

---@class Registration
---@field confirmPassword string
---@field dateOfBirth? string
---@field email string
---@field nidNumber string
---@field password string
---@field phone? string

---@class RegistrationCreateData
---@field confirmPassword string
---@field dateOfBirth? string
---@field email string
---@field nidNumber string
---@field password string
---@field phone? string

---@class Success
---@field code string
---@field email string
---@field isOverseas? boolean
---@field message? string
---@field nidNumber? string
---@field success? boolean

---@class SuccessCreateData
---@field code string
---@field email string
---@field isOverseas? boolean
---@field message? string
---@field nidNumber? string
---@field success? boolean

local M = {}

return M
