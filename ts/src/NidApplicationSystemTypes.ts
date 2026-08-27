// Typed models for the NidApplicationSystem SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Application {
  additionalInfo?: string
  nidNumber: string
  policeReportNumber?: string
  reason: string
}

export interface ApplicationCreateData {
  additionalInfo?: string
  nidNumber: string
  policeReportNumber?: string
  reason: string

  // Selects a custom action instead of the plain create:
  //   'correction' | 'duplicate' | 'new_registration'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ApplicationStatus {
  applicationId?: string
  applicationType?: string
  id?: string
  lastUpdated?: string
  nidNumber?: string
  remarks?: string
  status?: string
  submissionDate?: string
}

export interface ApplicationStatusLoadMatch {
  id: string
}

export interface Login {
  accountStatus?: string
  captcha: string
  email?: string
  fullName?: string
  nidNumber?: string
  password: string
  phone?: string
  userId?: string
  username: string
}

export interface LoginCreateData {
  accountStatus?: string
  captcha: string
  email?: string
  fullName?: string
  nidNumber?: string
  password: string
  phone?: string
  userId?: string
  username: string
}

export interface NidManagement {
}

export interface NidManagementLoadMatch {
}

export interface Registration {
  confirmPassword: string
  dateOfBirth?: string
  email: string
  nidNumber: string
  password: string
  phone?: string
}

export interface RegistrationCreateData {
  confirmPassword: string
  dateOfBirth?: string
  email: string
  nidNumber: string
  password: string
  phone?: string
}

export interface Success {
  code: string
  email: string
  isOverseas?: boolean
  message?: string
  nidNumber?: string
  success?: boolean
}

export interface SuccessCreateData {
  code: string
  email: string
  isOverseas?: boolean
  message?: string
  nidNumber?: string
  success?: boolean
}

