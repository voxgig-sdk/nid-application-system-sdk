package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "NidApplicationSystem",
			"slug": "nid-application-system",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://services.nidw.gov.bd/nid-pub",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"application": map[string]any{},
				"application_status": map[string]any{},
				"login": map[string]any{},
				"nid_management": map[string]any{},
				"registration": map[string]any{},
				"success": map[string]any{},
			},
		},
		"entity": map[string]any{
			"application": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "additionalInfo",
						"short": "Additional information",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nidNumber",
						"req": true,
						"short": "National Identity Card number",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "policeReportNumber",
						"short": "Police report number (if lost or stolen)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "reason",
						"req": true,
						"short": "Reason for requesting duplicate",
						"type": "`$STRING`",
					},
				},
				"name": "application",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/application/correction",
								"parts": []any{
									"application",
									"correction",
								},
								"select": map[string]any{
									"$action": "correction",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/application/duplicate",
								"parts": []any{
									"application",
									"duplicate",
								},
								"select": map[string]any{
									"$action": "duplicate",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/application/new-registration",
								"parts": []any{
									"application",
									"new-registration",
								},
								"select": map[string]any{
									"$action": "new_registration",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"application_status": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "applicationId",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "applicationType",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lastUpdated",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nidNumber",
						"short": "NID number (if approved)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "remarks",
						"short": "Additional remarks or notes",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "submissionDate",
						"type": "`$STRING`",
					},
				},
				"name": "application_status",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "application_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/application/status/{applicationId}",
								"parts": []any{
									"application",
									"status",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"applicationId": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"login": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "accountStatus",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "captcha",
						"req": true,
						"short": "Captcha code displayed in the image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "email",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "fullName",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nidNumber",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "password",
						"req": true,
						"short": "User's password",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "phone",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "userId",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "username",
						"req": true,
						"short": "User's username or NID number",
						"type": "`$STRING`",
					},
				},
				"name": "login",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/auth/login",
								"parts": []any{
									"auth",
									"login",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.user`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"nid_management": map[string]any{
				"fields": []any{},
				"name": "nid_management",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "pdf",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "nid_number",
											"orig": "nid_number",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/nid/download",
								"parts": []any{
									"nid",
									"download",
								},
								"select": map[string]any{
									"exist": []any{
										"format",
										"nid_number",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"registration": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "confirmPassword",
						"req": true,
						"short": "Password confirmation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "dateOfBirth",
						"short": "Date of birth",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "email",
						"req": true,
						"short": "User's email address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nidNumber",
						"req": true,
						"short": "National Identity Card number",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "password",
						"req": true,
						"short": "Account password",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "phone",
						"short": "User's phone number",
						"type": "`$STRING`",
					},
				},
				"name": "registration",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/auth/register",
								"parts": []any{
									"auth",
									"register",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"success": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "code",
						"req": true,
						"short": "Verification code received",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "email",
						"req": true,
						"short": "Registered email address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "isOverseas",
						"short": "Indicates if user is an overseas Bangladeshi",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "message",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nidNumber",
						"short": "National Identity Card number for verification",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "success",
						"type": "`$BOOLEAN`",
					},
				},
				"name": "success",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/auth/password-reset",
								"parts": []any{
									"auth",
									"password-reset",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/verification/send-code",
								"parts": []any{
									"verification",
									"send-code",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/verification/verify-code",
								"parts": []any{
									"verification",
									"verify-code",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
