# frozen_string_literal: true

# Typed models for the NidApplicationSystem SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Application entity data model.
class Application
end

# Request payload for Application#create.
#
# @!attribute [rw] additionalInfo
#   @return [Object, nil]
#
# @!attribute [rw] nidNumber
#   @return [Object, nil]
#
# @!attribute [rw] policeReportNumber
#   @return [Object, nil]
#
# @!attribute [rw] reason
#   @return [Object, nil]
ApplicationCreateData = Struct.new(
  :additionalInfo,
  :nidNumber,
  :policeReportNumber,
  :reason,
  keyword_init: true
)

# ApplicationStatus entity data model.
#
# @!attribute [rw] applicationId
#   @return [String, nil]
#
# @!attribute [rw] applicationType
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] lastUpdated
#   @return [String, nil]
#
# @!attribute [rw] nidNumber
#   @return [String, nil]
#
# @!attribute [rw] remarks
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] submissionDate
#   @return [String, nil]
ApplicationStatus = Struct.new(
  :applicationId,
  :applicationType,
  :id,
  :lastUpdated,
  :nidNumber,
  :remarks,
  :status,
  :submissionDate,
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
# @!attribute [rw] expiresIn
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
  :expiresIn,
  :password,
  :success,
  :token,
  :user,
  :username,
  keyword_init: true
)

# Request payload for Login#create.
#
# @!attribute [rw] captcha
#   @return [String]
#
# @!attribute [rw] password
#   @return [String]
#
# @!attribute [rw] username
#   @return [String]
LoginCreateData = Struct.new(
  :captcha,
  :password,
  :username,
  keyword_init: true
)

# NidManagement entity data model.
class NidManagement
end

# Request payload for NidManagement#load.
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] nid_number
#   @return [String]
NidManagementLoadMatch = Struct.new(
  :format,
  :nid_number,
  keyword_init: true
)

# Registration entity data model.
#
# @!attribute [rw] confirmPassword
#   @return [String]
#
# @!attribute [rw] dateOfBirth
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] nidNumber
#   @return [String]
#
# @!attribute [rw] password
#   @return [String]
#
# @!attribute [rw] phone
#   @return [String, nil]
Registration = Struct.new(
  :confirmPassword,
  :dateOfBirth,
  :email,
  :nidNumber,
  :password,
  :phone,
  keyword_init: true
)

# Request payload for Registration#create.
#
# @!attribute [rw] confirmPassword
#   @return [String]
#
# @!attribute [rw] dateOfBirth
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] nidNumber
#   @return [String]
#
# @!attribute [rw] password
#   @return [String]
#
# @!attribute [rw] phone
#   @return [String, nil]
RegistrationCreateData = Struct.new(
  :confirmPassword,
  :dateOfBirth,
  :email,
  :nidNumber,
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
# @!attribute [rw] isOverseas
#   @return [Boolean, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] nidNumber
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
Success = Struct.new(
  :code,
  :email,
  :isOverseas,
  :message,
  :nidNumber,
  :success,
  keyword_init: true
)

# Request payload for Success#create.
#
# @!attribute [rw] code
#   @return [String]
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] isOverseas
#   @return [Boolean, nil]
#
# @!attribute [rw] nidNumber
#   @return [String, nil]
SuccessCreateData = Struct.new(
  :code,
  :email,
  :isOverseas,
  :nidNumber,
  keyword_init: true
)

