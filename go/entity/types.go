// Typed models for the NidApplicationSystem SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/nid-application-system-sdk/go/core"
)

// Application is the typed data model for the application entity.
type Application struct {
	AdditionalInfo *string `json:"additionalInfo,omitempty"`
	NidNumber string `json:"nidNumber"`
	PoliceReportNumber *string `json:"policeReportNumber,omitempty"`
	Reason string `json:"reason"`
}

// ApplicationCreateData is the typed request payload for Application.CreateTyped.
type ApplicationCreateData struct {
	AdditionalInfo *string `json:"additionalInfo,omitempty"`
	NidNumber string `json:"nidNumber"`
	PoliceReportNumber *string `json:"policeReportNumber,omitempty"`
	Reason string `json:"reason"`
}

// ApplicationStatus is the typed data model for the application_status entity.
type ApplicationStatus struct {
	ApplicationId *string `json:"applicationId,omitempty"`
	ApplicationType *string `json:"applicationType,omitempty"`
	Id *string `json:"id,omitempty"`
	LastUpdated *string `json:"lastUpdated,omitempty"`
	NidNumber *string `json:"nidNumber,omitempty"`
	Remarks *string `json:"remarks,omitempty"`
	Status *string `json:"status,omitempty"`
	SubmissionDate *string `json:"submissionDate,omitempty"`
}

// ApplicationStatusLoadMatch is the typed request payload for ApplicationStatus.LoadTyped.
type ApplicationStatusLoadMatch struct {
	Id string `json:"id"`
}

// Login is the typed data model for the login entity.
type Login struct {
	AccountStatus *string `json:"accountStatus,omitempty"`
	Captcha string `json:"captcha"`
	Email *string `json:"email,omitempty"`
	FullName *string `json:"fullName,omitempty"`
	NidNumber *string `json:"nidNumber,omitempty"`
	Password string `json:"password"`
	Phone *string `json:"phone,omitempty"`
	UserId *string `json:"userId,omitempty"`
	Username string `json:"username"`
}

// LoginCreateData is the typed request payload for Login.CreateTyped.
type LoginCreateData struct {
	AccountStatus *string `json:"accountStatus,omitempty"`
	Captcha string `json:"captcha"`
	Email *string `json:"email,omitempty"`
	FullName *string `json:"fullName,omitempty"`
	NidNumber *string `json:"nidNumber,omitempty"`
	Password string `json:"password"`
	Phone *string `json:"phone,omitempty"`
	UserId *string `json:"userId,omitempty"`
	Username string `json:"username"`
}

// NidManagement is the typed data model for the nid_management entity.
type NidManagement struct {
}

// NidManagementLoadMatch is the typed request payload for NidManagement.LoadTyped.
type NidManagementLoadMatch struct {
	Format *string `json:"format,omitempty"`
	NidNumber string `json:"nid_number"`
}

// Registration is the typed data model for the registration entity.
type Registration struct {
	ConfirmPassword string `json:"confirmPassword"`
	DateOfBirth *string `json:"dateOfBirth,omitempty"`
	Email string `json:"email"`
	NidNumber string `json:"nidNumber"`
	Password string `json:"password"`
	Phone *string `json:"phone,omitempty"`
}

// RegistrationCreateData is the typed request payload for Registration.CreateTyped.
type RegistrationCreateData struct {
	ConfirmPassword string `json:"confirmPassword"`
	DateOfBirth *string `json:"dateOfBirth,omitempty"`
	Email string `json:"email"`
	NidNumber string `json:"nidNumber"`
	Password string `json:"password"`
	Phone *string `json:"phone,omitempty"`
}

// Success is the typed data model for the success entity.
type Success struct {
	Code string `json:"code"`
	Email string `json:"email"`
	IsOverseas *bool `json:"isOverseas,omitempty"`
	Message *string `json:"message,omitempty"`
	NidNumber *string `json:"nidNumber,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// SuccessCreateData is the typed request payload for Success.CreateTyped.
type SuccessCreateData struct {
	Code string `json:"code"`
	Email string `json:"email"`
	IsOverseas *bool `json:"isOverseas,omitempty"`
	Message *string `json:"message,omitempty"`
	NidNumber *string `json:"nidNumber,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
