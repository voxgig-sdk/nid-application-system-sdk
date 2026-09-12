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
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
        "fields": [
          {
            "name": "additionalInfo",
            "short": "Additional information",
            "type": "`$STRING`",
          },
          {
            "name": "nidNumber",
            "req": True,
            "short": "National Identity Card number",
            "type": "`$STRING`",
          },
          {
            "name": "policeReportNumber",
            "short": "Police report number (if lost or stolen)",
            "type": "`$STRING`",
          },
          {
            "name": "reason",
            "req": True,
            "short": "Reason for requesting duplicate",
            "type": "`$STRING`",
          },
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
                    "lit": "application",
                  },
                  {
                    "lit": "correction",
                  },
                ],
                "select": {
                  "$action": "correction",
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "application",
                  "correction",
                ],
              },
              {
                "args": {},
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
                "select": {
                  "$action": "duplicate",
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "application",
                  "duplicate",
                ],
              },
              {
                "args": {},
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
                "select": {
                  "$action": "new_registration",
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "application",
                  "new-registration",
                ],
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
            "type": "`$STRING`",
          },
          {
            "name": "applicationType",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "format": "date-time",
            "name": "lastUpdated",
            "type": "`$STRING`",
          },
          {
            "name": "nidNumber",
            "short": "NID number (if approved)",
            "type": "`$STRING`",
          },
          {
            "name": "remarks",
            "short": "Additional remarks or notes",
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "type": "`$STRING`",
          },
          {
            "format": "date-time",
            "name": "submissionDate",
            "type": "`$STRING`",
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
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "application_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/application/status/{applicationId}",
                "rename": {
                  "param": {
                    "applicationId": "id",
                  },
                },
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
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "application",
                  "status",
                  "{id}",
                ],
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
            "type": "`$STRING`",
          },
          {
            "name": "captcha",
            "req": True,
            "short": "Captcha code displayed in the image",
            "type": "`$STRING`",
          },
          {
            "format": "email",
            "name": "email",
            "type": "`$STRING`",
          },
          {
            "name": "fullName",
            "type": "`$STRING`",
          },
          {
            "name": "nidNumber",
            "type": "`$STRING`",
          },
          {
            "format": "password",
            "name": "password",
            "req": True,
            "short": "User's password",
            "type": "`$STRING`",
          },
          {
            "name": "phone",
            "type": "`$STRING`",
          },
          {
            "name": "userId",
            "type": "`$STRING`",
          },
          {
            "name": "username",
            "req": True,
            "short": "User's username or NID number",
            "type": "`$STRING`",
          },
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
                    "lit": "auth",
                  },
                  {
                    "lit": "login",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.user`",
                },
                "parts": [
                  "auth",
                  "login",
                ],
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
                "args": {
                  "query": [
                    {
                      "example": "pdf",
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "nid_number",
                      "orig": "nid_number",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "format",
                    "nid_number",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "nid",
                  "download",
                ],
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
            "format": "password",
            "name": "confirmPassword",
            "req": True,
            "short": "Password confirmation",
            "type": "`$STRING`",
          },
          {
            "format": "date",
            "name": "dateOfBirth",
            "short": "Date of birth",
            "type": "`$STRING`",
          },
          {
            "format": "email",
            "name": "email",
            "req": True,
            "short": "User's email address",
            "type": "`$STRING`",
          },
          {
            "name": "nidNumber",
            "req": True,
            "short": "National Identity Card number",
            "type": "`$STRING`",
          },
          {
            "format": "password",
            "name": "password",
            "req": True,
            "short": "Account password",
            "type": "`$STRING`",
          },
          {
            "name": "phone",
            "short": "User's phone number",
            "type": "`$STRING`",
          },
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
                    "lit": "auth",
                  },
                  {
                    "lit": "register",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "auth",
                  "register",
                ],
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
            "req": True,
            "short": "Verification code received",
            "type": "`$STRING`",
          },
          {
            "format": "email",
            "name": "email",
            "req": True,
            "short": "Registered email address",
            "type": "`$STRING`",
          },
          {
            "name": "isOverseas",
            "short": "Indicates if user is an overseas Bangladeshi",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "message",
            "type": "`$STRING`",
          },
          {
            "name": "nidNumber",
            "short": "National Identity Card number for verification",
            "type": "`$STRING`",
          },
          {
            "name": "success",
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
                "args": {},
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
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "auth",
                  "password-reset",
                ],
              },
              {
                "args": {},
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
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "verification",
                  "send-code",
                ],
              },
              {
                "args": {},
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
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "verification",
                  "verify-code",
                ],
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
