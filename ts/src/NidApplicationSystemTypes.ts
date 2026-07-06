// Typed models for the NidApplicationSystem SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Application {
  additional_info?: string
  nid_number: string
  police_report_number?: string
  reason: string
}

export interface ApplicationCreateData {
  additional_info?: string
  nid_number: string
  police_report_number?: string
  reason: string
}

export interface ApplicationStatus {
  application_id?: string
  application_type?: string
  last_updated?: string
  nid_number?: string
  remark?: string
  status?: string
  submission_date?: string
}

export interface ApplicationStatusLoadMatch {
  id: string
}

export interface Login {
  captcha: string
  expires_in?: number
  password: string
  success?: boolean
  token?: string
  user?: Record<string, any>
  username: string
}

export interface LoginCreateData {
  captcha: string
  expires_in?: number
  password: string
  success?: boolean
  token?: string
  user?: Record<string, any>
  username: string
}

export interface NidManagement {
}

export interface NidManagementLoadMatch {
}

export interface Registration {
  confirm_password: string
  date_of_birth?: string
  email: string
  nid_number: string
  password: string
  phone?: string
}

export interface RegistrationCreateData {
  confirm_password: string
  date_of_birth?: string
  email: string
  nid_number: string
  password: string
  phone?: string
}

export interface Success {
  code: string
  email: string
  is_oversea?: boolean
  message?: string
  nid_number?: string
  success?: boolean
}

export interface SuccessCreateData {
  code: string
  email: string
  is_oversea?: boolean
  message?: string
  nid_number?: string
  success?: boolean
}

