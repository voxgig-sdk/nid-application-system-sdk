# frozen_string_literal: true

# Typed models for the NidApplicationSystem SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Application entity data model.
#
# @!attribute [rw] additional_info
#   @return [String, nil]
#
# @!attribute [rw] nid_number
#   @return [String]
#
# @!attribute [rw] police_report_number
#   @return [String, nil]
#
# @!attribute [rw] reason
#   @return [String]
Application = Struct.new(
  :additional_info,
  :nid_number,
  :police_report_number,
  :reason,
  keyword_init: true
)

# Match filter for Application#create (any subset of Application fields).
#
# @!attribute [rw] additional_info
#   @return [String, nil]
#
# @!attribute [rw] nid_number
#   @return [String, nil]
#
# @!attribute [rw] police_report_number
#   @return [String, nil]
#
# @!attribute [rw] reason
#   @return [String, nil]
ApplicationCreateData = Struct.new(
  :additional_info,
  :nid_number,
  :police_report_number,
  :reason,
  keyword_init: true
)

# ApplicationStatus entity data model.
#
# @!attribute [rw] application_id
#   @return [String, nil]
#
# @!attribute [rw] application_type
#   @return [String, nil]
#
# @!attribute [rw] last_updated
#   @return [String, nil]
#
# @!attribute [rw] nid_number
#   @return [String, nil]
#
# @!attribute [rw] remark
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] submission_date
#   @return [String, nil]
ApplicationStatus = Struct.new(
  :application_id,
  :application_type,
  :last_updated,
  :nid_number,
  :remark,
  :status,
  :submission_date,
  keyword_init: true
)

# Request payload for ApplicationStatus#load.
#
# @!attribute [rw] id
#   @return [String]
ApplicationStatusLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Login entity data model.
#
# @!attribute [rw] captcha
#   @return [String]
#
# @!attribute [rw] expires_in
#   @return [Integer, nil]
#
# @!attribute [rw] password
#   @return [String]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] token
#   @return [String, nil]
#
# @!attribute [rw] user
#   @return [Hash, nil]
#
# @!attribute [rw] username
#   @return [String]
Login = Struct.new(
  :captcha,
  :expires_in,
  :password,
  :success,
  :token,
  :user,
  :username,
  keyword_init: true
)

# Match filter for Login#create (any subset of Login fields).
#
# @!attribute [rw] captcha
#   @return [String, nil]
#
# @!attribute [rw] expires_in
#   @return [Integer, nil]
#
# @!attribute [rw] password
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] token
#   @return [String, nil]
#
# @!attribute [rw] user
#   @return [Hash, nil]
#
# @!attribute [rw] username
#   @return [String, nil]
LoginCreateData = Struct.new(
  :captcha,
  :expires_in,
  :password,
  :success,
  :token,
  :user,
  :username,
  keyword_init: true
)

# NidManagement entity data model.
class NidManagement
end

# Match filter for NidManagement#load (any subset of NidManagement fields).
class NidManagementLoadMatch
end

# Registration entity data model.
#
# @!attribute [rw] confirm_password
#   @return [String]
#
# @!attribute [rw] date_of_birth
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] nid_number
#   @return [String]
#
# @!attribute [rw] password
#   @return [String]
#
# @!attribute [rw] phone
#   @return [String, nil]
Registration = Struct.new(
  :confirm_password,
  :date_of_birth,
  :email,
  :nid_number,
  :password,
  :phone,
  keyword_init: true
)

# Match filter for Registration#create (any subset of Registration fields).
#
# @!attribute [rw] confirm_password
#   @return [String, nil]
#
# @!attribute [rw] date_of_birth
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] nid_number
#   @return [String, nil]
#
# @!attribute [rw] password
#   @return [String, nil]
#
# @!attribute [rw] phone
#   @return [String, nil]
RegistrationCreateData = Struct.new(
  :confirm_password,
  :date_of_birth,
  :email,
  :nid_number,
  :password,
  :phone,
  keyword_init: true
)

# Success entity data model.
#
# @!attribute [rw] code
#   @return [String]
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] is_oversea
#   @return [Boolean, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] nid_number
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
Success = Struct.new(
  :code,
  :email,
  :is_oversea,
  :message,
  :nid_number,
  :success,
  keyword_init: true
)

# Match filter for Success#create (any subset of Success fields).
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] is_oversea
#   @return [Boolean, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] nid_number
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
SuccessCreateData = Struct.new(
  :code,
  :email,
  :is_oversea,
  :message,
  :nid_number,
  :success,
  keyword_init: true
)

