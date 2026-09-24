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
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
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
				"fields": []any{},
				"name": "application",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/application/correction",
								"segments": []any{
									map[string]any{
										"lit": "application",
									},
									map[string]any{
										"lit": "correction",
									},
								},
								"parts": []any{
									"application",
									"correction",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "correction",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/application/duplicate",
								"segments": []any{
									map[string]any{
										"lit": "application",
									},
									map[string]any{
										"lit": "duplicate",
									},
								},
								"parts": []any{
									"application",
									"duplicate",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "duplicate",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/application/new-registration",
								"segments": []any{
									map[string]any{
										"lit": "application",
									},
									map[string]any{
										"lit": "new-registration",
									},
								},
								"parts": []any{
									"application",
									"new-registration",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "new_registration",
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
						"title": "Application Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "applicationType",
						"title": "Application Type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lastUpdated",
						"title": "Last Updated",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "nidNumber",
						"title": "Nid Number",
						"type": "`$STRING`",
						"short": "NID number (if approved)",
					},
					map[string]any{
						"name": "remarks",
						"title": "Remarks",
						"type": "`$STRING`",
						"short": "Additional remarks or notes",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "submissionDate",
						"title": "Submission Date",
						"type": "`$STRING`",
						"format": "date-time",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "application_status",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/application/status/{applicationId}",
								"segments": []any{
									map[string]any{
										"lit": "application",
									},
									map[string]any{
										"lit": "status",
									},
									map[string]any{
										"var": "id",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "application_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Account Status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "captcha",
						"title": "Captcha",
						"type": "`$STRING`",
						"req": true,
						"short": "Captcha code displayed in the image",
					},
					map[string]any{
						"name": "email",
						"title": "Email",
						"type": "`$STRING`",
						"format": "email",
					},
					map[string]any{
						"name": "fullName",
						"title": "Full Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nidNumber",
						"title": "Nid Number",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "password",
						"title": "Password",
						"type": "`$STRING`",
						"req": true,
						"short": "User's password",
						"format": "password",
					},
					map[string]any{
						"name": "phone",
						"title": "Phone",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "userId",
						"title": "User Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "username",
						"title": "Username",
						"type": "`$STRING`",
						"req": true,
						"short": "User's username or NID number",
					},
				},
				"name": "login",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/auth/login",
								"segments": []any{
									map[string]any{
										"lit": "auth",
									},
									map[string]any{
										"lit": "login",
									},
								},
								"parts": []any{
									"auth",
									"login",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.user`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
								"kind": "http",
								"method": "GET",
								"orig": "/nid/download",
								"segments": []any{
									map[string]any{
										"lit": "nid",
									},
									map[string]any{
										"lit": "download",
									},
								},
								"parts": []any{
									"nid",
									"download",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
											"example": "pdf",
										},
										map[string]any{
											"name": "nid_number",
											"orig": "nid_number",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"format",
										"nid_number",
									},
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
						"title": "Confirm Password",
						"type": "`$STRING`",
						"req": true,
						"short": "Password confirmation",
						"format": "password",
					},
					map[string]any{
						"name": "dateOfBirth",
						"title": "Date Of Birth",
						"type": "`$STRING`",
						"short": "Date of birth",
						"format": "date",
					},
					map[string]any{
						"name": "email",
						"title": "Email",
						"type": "`$STRING`",
						"req": true,
						"short": "User's email address",
						"format": "email",
					},
					map[string]any{
						"name": "nidNumber",
						"title": "Nid Number",
						"type": "`$STRING`",
						"req": true,
						"short": "National Identity Card number",
					},
					map[string]any{
						"name": "password",
						"title": "Password",
						"type": "`$STRING`",
						"req": true,
						"short": "Account password",
						"format": "password",
					},
					map[string]any{
						"name": "phone",
						"title": "Phone",
						"type": "`$STRING`",
						"short": "User's phone number",
					},
				},
				"name": "registration",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/auth/register",
								"segments": []any{
									map[string]any{
										"lit": "auth",
									},
									map[string]any{
										"lit": "register",
									},
								},
								"parts": []any{
									"auth",
									"register",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Code",
						"type": "`$STRING`",
						"req": true,
						"short": "Verification code received",
					},
					map[string]any{
						"name": "email",
						"title": "Email",
						"type": "`$STRING`",
						"req": true,
						"short": "Registered email address",
						"format": "email",
					},
					map[string]any{
						"name": "isOverseas",
						"title": "Is Overseas",
						"type": "`$BOOLEAN`",
						"short": "Indicates if user is an overseas Bangladeshi",
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nidNumber",
						"title": "Nid Number",
						"type": "`$STRING`",
						"short": "National Identity Card number for verification",
					},
					map[string]any{
						"name": "success",
						"title": "Success",
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
								"kind": "http",
								"method": "POST",
								"orig": "/auth/password-reset",
								"segments": []any{
									map[string]any{
										"lit": "auth",
									},
									map[string]any{
										"lit": "password-reset",
									},
								},
								"parts": []any{
									"auth",
									"password-reset",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/verification/send-code",
								"segments": []any{
									map[string]any{
										"lit": "verification",
									},
									map[string]any{
										"lit": "send-code",
									},
								},
								"parts": []any{
									"verification",
									"send-code",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/verification/verify-code",
								"segments": []any{
									map[string]any{
										"lit": "verification",
									},
									map[string]any{
										"lit": "verify-code",
									},
								},
								"parts": []any{
									"verification",
									"verify-code",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
