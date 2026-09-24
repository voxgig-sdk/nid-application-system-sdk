# NidApplicationSystem SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "NidApplicationSystem",
            "slug": "nid-application-system",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://services.nidw.gov.bd/nid-pub",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "application": {},
                "application_status": {},
                "login": {},
                "nid_management": {},
                "registration": {},
                "success": {},
            },
        },
        "entity": {
      "application": {
        "fields": [],
        "name": "application",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/application/correction",
                "segments": [
                  {
                    "lit": "application",
                  },
                  {
                    "lit": "correction",
                  },
                ],
                "parts": [
                  "application",
                  "correction",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {
                  "$action": "correction",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/application/duplicate",
                "segments": [
                  {
                    "lit": "application",
                  },
                  {
                    "lit": "duplicate",
                  },
                ],
                "parts": [
                  "application",
                  "duplicate",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {
                  "$action": "duplicate",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/application/new-registration",
                "segments": [
                  {
                    "lit": "application",
                  },
                  {
                    "lit": "new-registration",
                  },
                ],
                "parts": [
                  "application",
                  "new-registration",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {
                  "$action": "new_registration",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "application_status": {
        "fields": [
          {
            "name": "applicationId",
            "title": "Application Id",
            "type": "`$STRING`",
          },
          {
            "name": "applicationType",
            "title": "Application Type",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "lastUpdated",
            "title": "Last Updated",
            "type": "`$STRING`",
            "format": "date-time",
          },
          {
            "name": "nidNumber",
            "title": "Nid Number",
            "type": "`$STRING`",
            "short": "NID number (if approved)",
          },
          {
            "name": "remarks",
            "title": "Remarks",
            "type": "`$STRING`",
            "short": "Additional remarks or notes",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
          },
          {
            "name": "submissionDate",
            "title": "Submission Date",
            "type": "`$STRING`",
            "format": "date-time",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "application_status",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/application/status/{applicationId}",
                "segments": [
                  {
                    "lit": "application",
                  },
                  {
                    "lit": "status",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "application",
                  "status",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "applicationId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "application_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "login": {
        "fields": [
          {
            "name": "accountStatus",
            "title": "Account Status",
            "type": "`$STRING`",
          },
          {
            "name": "captcha",
            "title": "Captcha",
            "type": "`$STRING`",
            "req": True,
            "short": "Captcha code displayed in the image",
          },
          {
            "name": "email",
            "title": "Email",
            "type": "`$STRING`",
            "format": "email",
          },
          {
            "name": "fullName",
            "title": "Full Name",
            "type": "`$STRING`",
          },
          {
            "name": "nidNumber",
            "title": "Nid Number",
            "type": "`$STRING`",
          },
          {
            "name": "password",
            "title": "Password",
            "type": "`$STRING`",
            "req": True,
            "short": "User's password",
            "format": "password",
          },
          {
            "name": "phone",
            "title": "Phone",
            "type": "`$STRING`",
          },
          {
            "name": "userId",
            "title": "User Id",
            "type": "`$STRING`",
          },
          {
            "name": "username",
            "title": "Username",
            "type": "`$STRING`",
            "req": True,
            "short": "User's username or NID number",
          },
        ],
        "name": "login",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/auth/login",
                "segments": [
                  {
                    "lit": "auth",
                  },
                  {
                    "lit": "login",
                  },
                ],
                "parts": [
                  "auth",
                  "login",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.user`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
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
                "kind": "http",
                "method": "GET",
                "orig": "/nid/download",
                "segments": [
                  {
                    "lit": "nid",
                  },
                  {
                    "lit": "download",
                  },
                ],
                "parts": [
                  "nid",
                  "download",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "pdf",
                    },
                    {
                      "name": "nid_number",
                      "orig": "nid_number",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "format",
                    "nid_number",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "registration": {
        "fields": [
          {
            "name": "confirmPassword",
            "title": "Confirm Password",
            "type": "`$STRING`",
            "req": True,
            "short": "Password confirmation",
            "format": "password",
          },
          {
            "name": "dateOfBirth",
            "title": "Date Of Birth",
            "type": "`$STRING`",
            "short": "Date of birth",
            "format": "date",
          },
          {
            "name": "email",
            "title": "Email",
            "type": "`$STRING`",
            "req": True,
            "short": "User's email address",
            "format": "email",
          },
          {
            "name": "nidNumber",
            "title": "Nid Number",
            "type": "`$STRING`",
            "req": True,
            "short": "National Identity Card number",
          },
          {
            "name": "password",
            "title": "Password",
            "type": "`$STRING`",
            "req": True,
            "short": "Account password",
            "format": "password",
          },
          {
            "name": "phone",
            "title": "Phone",
            "type": "`$STRING`",
            "short": "User's phone number",
          },
        ],
        "name": "registration",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/auth/register",
                "segments": [
                  {
                    "lit": "auth",
                  },
                  {
                    "lit": "register",
                  },
                ],
                "parts": [
                  "auth",
                  "register",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "success": {
        "fields": [
          {
            "name": "code",
            "title": "Code",
            "type": "`$STRING`",
            "req": True,
            "short": "Verification code received",
          },
          {
            "name": "email",
            "title": "Email",
            "type": "`$STRING`",
            "req": True,
            "short": "Registered email address",
            "format": "email",
          },
          {
            "name": "isOverseas",
            "title": "Is Overseas",
            "type": "`$BOOLEAN`",
            "short": "Indicates if user is an overseas Bangladeshi",
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
          },
          {
            "name": "nidNumber",
            "title": "Nid Number",
            "type": "`$STRING`",
            "short": "National Identity Card number for verification",
          },
          {
            "name": "success",
            "title": "Success",
            "type": "`$BOOLEAN`",
          },
        ],
        "name": "success",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/auth/password-reset",
                "segments": [
                  {
                    "lit": "auth",
                  },
                  {
                    "lit": "password-reset",
                  },
                ],
                "parts": [
                  "auth",
                  "password-reset",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/verification/send-code",
                "segments": [
                  {
                    "lit": "verification",
                  },
                  {
                    "lit": "send-code",
                  },
                ],
                "parts": [
                  "verification",
                  "send-code",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/verification/verify-code",
                "segments": [
                  {
                    "lit": "verification",
                  },
                  {
                    "lit": "verify-code",
                  },
                ],
                "parts": [
                  "verification",
                  "verify-code",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
