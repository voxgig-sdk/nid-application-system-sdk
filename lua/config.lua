-- NidApplicationSystem SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "NidApplicationSystem",
      slug = "nid-application-system",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://services.nidw.gov.bd/nid-pub",
      auth = {
        prefix = "Bearer",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["application"] = {},
        ["application_status"] = {},
        ["login"] = {},
        ["nid_management"] = {},
        ["registration"] = {},
        ["success"] = {},
      },
    },
    entity = {
      ["application"] = {
        ["fields"] = {
          {
            ["name"] = "additionalInfo",
            ["short"] = "Additional information",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "nidNumber",
            ["req"] = true,
            ["short"] = "National Identity Card number",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "policeReportNumber",
            ["short"] = "Police report number (if lost or stolen)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "reason",
            ["req"] = true,
            ["short"] = "Reason for requesting duplicate",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "application",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/application/correction",
                ["parts"] = {
                  "application",
                  "correction",
                },
                ["select"] = {
                  ["$action"] = "correction",
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/application/duplicate",
                ["parts"] = {
                  "application",
                  "duplicate",
                },
                ["select"] = {
                  ["$action"] = "duplicate",
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/application/new-registration",
                ["parts"] = {
                  "application",
                  "new-registration",
                },
                ["select"] = {
                  ["$action"] = "new_registration",
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["application_status"] = {
        ["fields"] = {
          {
            ["name"] = "applicationId",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "applicationType",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "lastUpdated",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "nidNumber",
            ["short"] = "NID number (if approved)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "remarks",
            ["short"] = "Additional remarks or notes",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "status",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "submissionDate",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "application_status",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "application_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/application/status/{applicationId}",
                ["parts"] = {
                  "application",
                  "status",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["applicationId"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["login"] = {
        ["fields"] = {
          {
            ["name"] = "accountStatus",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "captcha",
            ["req"] = true,
            ["short"] = "Captcha code displayed in the image",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "email",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "fullName",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "nidNumber",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "password",
            ["req"] = true,
            ["short"] = "User's password",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "phone",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "userId",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "username",
            ["req"] = true,
            ["short"] = "User's username or NID number",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "login",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/auth/login",
                ["parts"] = {
                  "auth",
                  "login",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.user`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["nid_management"] = {
        ["fields"] = {},
        ["name"] = "nid_management",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "pdf",
                      ["kind"] = "query",
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "nid_number",
                      ["orig"] = "nid_number",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/nid/download",
                ["parts"] = {
                  "nid",
                  "download",
                },
                ["select"] = {
                  ["exist"] = {
                    "format",
                    "nid_number",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["registration"] = {
        ["fields"] = {
          {
            ["name"] = "confirmPassword",
            ["req"] = true,
            ["short"] = "Password confirmation",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "dateOfBirth",
            ["short"] = "Date of birth",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "email",
            ["req"] = true,
            ["short"] = "User's email address",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "nidNumber",
            ["req"] = true,
            ["short"] = "National Identity Card number",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "password",
            ["req"] = true,
            ["short"] = "Account password",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "phone",
            ["short"] = "User's phone number",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "registration",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/auth/register",
                ["parts"] = {
                  "auth",
                  "register",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["success"] = {
        ["fields"] = {
          {
            ["name"] = "code",
            ["req"] = true,
            ["short"] = "Verification code received",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "email",
            ["req"] = true,
            ["short"] = "Registered email address",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "isOverseas",
            ["short"] = "Indicates if user is an overseas Bangladeshi",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "message",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "nidNumber",
            ["short"] = "National Identity Card number for verification",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "success",
            ["type"] = "`$BOOLEAN`",
          },
        },
        ["name"] = "success",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/auth/password-reset",
                ["parts"] = {
                  "auth",
                  "password-reset",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/verification/send-code",
                ["parts"] = {
                  "verification",
                  "send-code",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/verification/verify-code",
                ["parts"] = {
                  "verification",
                  "verify-code",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
