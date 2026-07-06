// Typed models for the NidApplicationSystem SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Application is the typed data model for the application entity.
type Application struct {
	AdditionalInfo *string `json:"additional_info,omitempty"`
	NidNumber string `json:"nid_number"`
	PoliceReportNumber *string `json:"police_report_number,omitempty"`
	Reason string `json:"reason"`
}

// ApplicationCreateData is the typed request payload for Application.CreateTyped.
type ApplicationCreateData struct {
	AdditionalInfo *string `json:"additional_info,omitempty"`
	NidNumber string `json:"nid_number"`
	PoliceReportNumber *string `json:"police_report_number,omitempty"`
	Reason string `json:"reason"`
}

// ApplicationStatus is the typed data model for the application_status entity.
type ApplicationStatus struct {
	ApplicationId *string `json:"application_id,omitempty"`
	ApplicationType *string `json:"application_type,omitempty"`
	LastUpdated *string `json:"last_updated,omitempty"`
	NidNumber *string `json:"nid_number,omitempty"`
	Remark *string `json:"remark,omitempty"`
	Status *string `json:"status,omitempty"`
	SubmissionDate *string `json:"submission_date,omitempty"`
}

// ApplicationStatusLoadMatch is the typed request payload for ApplicationStatus.LoadTyped.
type ApplicationStatusLoadMatch struct {
	Id string `json:"id"`
}

// Login is the typed data model for the login entity.
type Login struct {
	Captcha string `json:"captcha"`
	ExpiresIn *int `json:"expires_in,omitempty"`
	Password string `json:"password"`
	Success *bool `json:"success,omitempty"`
	Token *string `json:"token,omitempty"`
	User *map[string]any `json:"user,omitempty"`
	Username string `json:"username"`
}

// LoginCreateData is the typed request payload for Login.CreateTyped.
type LoginCreateData struct {
	Captcha string `json:"captcha"`
	ExpiresIn *int `json:"expires_in,omitempty"`
	Password string `json:"password"`
	Success *bool `json:"success,omitempty"`
	Token *string `json:"token,omitempty"`
	User *map[string]any `json:"user,omitempty"`
	Username string `json:"username"`
}

// NidManagement is the typed data model for the nid_management entity.
type NidManagement struct {
}

// NidManagementLoadMatch is the typed request payload for NidManagement.LoadTyped.
type NidManagementLoadMatch struct {
}

// Registration is the typed data model for the registration entity.
type Registration struct {
	ConfirmPassword string `json:"confirm_password"`
	DateOfBirth *string `json:"date_of_birth,omitempty"`
	Email string `json:"email"`
	NidNumber string `json:"nid_number"`
	Password string `json:"password"`
	Phone *string `json:"phone,omitempty"`
}

// RegistrationCreateData is the typed request payload for Registration.CreateTyped.
type RegistrationCreateData struct {
	ConfirmPassword string `json:"confirm_password"`
	DateOfBirth *string `json:"date_of_birth,omitempty"`
	Email string `json:"email"`
	NidNumber string `json:"nid_number"`
	Password string `json:"password"`
	Phone *string `json:"phone,omitempty"`
}

// Success is the typed data model for the success entity.
type Success struct {
	Code string `json:"code"`
	Email string `json:"email"`
	IsOversea *bool `json:"is_oversea,omitempty"`
	Message *string `json:"message,omitempty"`
	NidNumber *string `json:"nid_number,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// SuccessCreateData is the typed request payload for Success.CreateTyped.
type SuccessCreateData struct {
	Code string `json:"code"`
	Email string `json:"email"`
	IsOversea *bool `json:"is_oversea,omitempty"`
	Message *string `json:"message,omitempty"`
	NidNumber *string `json:"nid_number,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
