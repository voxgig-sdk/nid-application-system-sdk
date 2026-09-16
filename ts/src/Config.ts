
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'NidApplicationSystem',
        slug: "nid-application-system",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://services.nidw.gov.bd/nid-pub",

    auth: {
      prefix: 'Bearer',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      application: {
      },

      application_status: {
      },

      login: {
      },

      nid_management: {
      },

      registration: {
      },

      success: {
      },

    }
  }


  entity = {
    "application": {
      "fields": [
        {
          "name": "additionalInfo",
          "short": "Additional information",
          "type": "`$STRING`"
        },
        {
          "name": "nidNumber",
          "req": true,
          "short": "National Identity Card number",
          "type": "`$STRING`"
        },
        {
          "name": "policeReportNumber",
          "short": "Police report number (if lost or stolen)",
          "type": "`$STRING`"
        },
        {
          "name": "reason",
          "req": true,
          "short": "Reason for requesting duplicate",
          "type": "`$STRING`"
        }
      ],
      "name": "application",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/application/correction",
              "segments": [
                {
                  "lit": "application"
                },
                {
                  "lit": "correction"
                }
              ],
              "select": {
                "$action": "correction"
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "application",
                "correction"
              ]
            },
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/application/duplicate",
              "segments": [
                {
                  "lit": "application"
                },
                {
                  "lit": "duplicate"
                }
              ],
              "select": {
                "$action": "duplicate"
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "application",
                "duplicate"
              ]
            },
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/application/new-registration",
              "segments": [
                {
                  "lit": "application"
                },
                {
                  "lit": "new-registration"
                }
              ],
              "select": {
                "$action": "new_registration"
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "application",
                "new-registration"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "application_status": {
      "fields": [
        {
          "name": "applicationId",
          "type": "`$STRING`"
        },
        {
          "name": "applicationType",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "lastUpdated",
          "type": "`$STRING`"
        },
        {
          "name": "nidNumber",
          "short": "NID number (if approved)",
          "type": "`$STRING`"
        },
        {
          "name": "remarks",
          "short": "Additional remarks or notes",
          "type": "`$STRING`"
        },
        {
          "name": "status",
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "submissionDate",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "application_status",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "application_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/application/status/{applicationId}",
              "rename": {
                "param": {
                  "applicationId": "id"
                }
              },
              "segments": [
                {
                  "lit": "application"
                },
                {
                  "lit": "status"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "application",
                "status",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "login": {
      "fields": [
        {
          "name": "accountStatus",
          "type": "`$STRING`"
        },
        {
          "name": "captcha",
          "req": true,
          "short": "Captcha code displayed in the image",
          "type": "`$STRING`"
        },
        {
          "format": "email",
          "name": "email",
          "type": "`$STRING`"
        },
        {
          "name": "fullName",
          "type": "`$STRING`"
        },
        {
          "name": "nidNumber",
          "type": "`$STRING`"
        },
        {
          "format": "password",
          "name": "password",
          "req": true,
          "short": "User's password",
          "type": "`$STRING`"
        },
        {
          "name": "phone",
          "type": "`$STRING`"
        },
        {
          "name": "userId",
          "type": "`$STRING`"
        },
        {
          "name": "username",
          "req": true,
          "short": "User's username or NID number",
          "type": "`$STRING`"
        }
      ],
      "name": "login",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/auth/login",
              "segments": [
                {
                  "lit": "auth"
                },
                {
                  "lit": "login"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.user`"
              },
              "parts": [
                "auth",
                "login"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "nid_management": {
      "fields": [],
      "name": "nid_management",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "pdf",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "nid_number",
                    "orig": "nid_number",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/nid/download",
              "segments": [
                {
                  "lit": "nid"
                },
                {
                  "lit": "download"
                }
              ],
              "select": {
                "exist": [
                  "format",
                  "nid_number"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "nid",
                "download"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "registration": {
      "fields": [
        {
          "format": "password",
          "name": "confirmPassword",
          "req": true,
          "short": "Password confirmation",
          "type": "`$STRING`"
        },
        {
          "format": "date",
          "name": "dateOfBirth",
          "short": "Date of birth",
          "type": "`$STRING`"
        },
        {
          "format": "email",
          "name": "email",
          "req": true,
          "short": "User's email address",
          "type": "`$STRING`"
        },
        {
          "name": "nidNumber",
          "req": true,
          "short": "National Identity Card number",
          "type": "`$STRING`"
        },
        {
          "format": "password",
          "name": "password",
          "req": true,
          "short": "Account password",
          "type": "`$STRING`"
        },
        {
          "name": "phone",
          "short": "User's phone number",
          "type": "`$STRING`"
        }
      ],
      "name": "registration",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/auth/register",
              "segments": [
                {
                  "lit": "auth"
                },
                {
                  "lit": "register"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "auth",
                "register"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "success": {
      "fields": [
        {
          "name": "code",
          "req": true,
          "short": "Verification code received",
          "type": "`$STRING`"
        },
        {
          "format": "email",
          "name": "email",
          "req": true,
          "short": "Registered email address",
          "type": "`$STRING`"
        },
        {
          "name": "isOverseas",
          "short": "Indicates if user is an overseas Bangladeshi",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "message",
          "type": "`$STRING`"
        },
        {
          "name": "nidNumber",
          "short": "National Identity Card number for verification",
          "type": "`$STRING`"
        },
        {
          "name": "success",
          "type": "`$BOOLEAN`"
        }
      ],
      "name": "success",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/auth/password-reset",
              "segments": [
                {
                  "lit": "auth"
                },
                {
                  "lit": "password-reset"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "auth",
                "password-reset"
              ]
            },
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/verification/send-code",
              "segments": [
                {
                  "lit": "verification"
                },
                {
                  "lit": "send-code"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "verification",
                "send-code"
              ]
            },
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/verification/verify-code",
              "segments": [
                {
                  "lit": "verification"
                },
                {
                  "lit": "verify-code"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "verification",
                "verify-code"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

