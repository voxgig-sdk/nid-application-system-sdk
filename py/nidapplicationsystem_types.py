# Typed models for the NidApplicationSystem SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class ApplicationRequired(TypedDict):
    nid_number: str
    reason: str


class Application(ApplicationRequired, total=False):
    additional_info: str
    police_report_number: str


class ApplicationCreateDataRequired(TypedDict):
    nid_number: str
    reason: str


class ApplicationCreateData(ApplicationCreateDataRequired, total=False):
    additional_info: str
    police_report_number: str


class ApplicationStatus(TypedDict, total=False):
    application_id: str
    application_type: str
    last_updated: str
    nid_number: str
    remark: str
    status: str
    submission_date: str


class ApplicationStatusLoadMatch(TypedDict):
    id: str


class LoginRequired(TypedDict):
    captcha: str
    password: str
    username: str


class Login(LoginRequired, total=False):
    expires_in: int
    success: bool
    token: str
    user: dict


class LoginCreateDataRequired(TypedDict):
    captcha: str
    password: str
    username: str


class LoginCreateData(LoginCreateDataRequired, total=False):
    expires_in: int
    success: bool
    token: str
    user: dict


class NidManagement(TypedDict):
    pass


class NidManagementLoadMatch(TypedDict):
    pass


class RegistrationRequired(TypedDict):
    confirm_password: str
    email: str
    nid_number: str
    password: str


class Registration(RegistrationRequired, total=False):
    date_of_birth: str
    phone: str


class RegistrationCreateDataRequired(TypedDict):
    confirm_password: str
    email: str
    nid_number: str
    password: str


class RegistrationCreateData(RegistrationCreateDataRequired, total=False):
    date_of_birth: str
    phone: str


class SuccessRequired(TypedDict):
    code: str
    email: str


class Success(SuccessRequired, total=False):
    is_oversea: bool
    message: str
    nid_number: str
    success: bool


class SuccessCreateDataRequired(TypedDict):
    code: str
    email: str


class SuccessCreateData(SuccessCreateDataRequired, total=False):
    is_oversea: bool
    message: str
    nid_number: str
    success: bool
