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
    nidNumber: str
    reason: str


class Application(ApplicationRequired, total=False):
    additionalInfo: str
    policeReportNumber: str


class ApplicationCreateDataRequired(TypedDict):
    nidNumber: str
    reason: str


class ApplicationCreateData(ApplicationCreateDataRequired, total=False):
    additionalInfo: str
    policeReportNumber: str


class ApplicationStatus(TypedDict, total=False):
    applicationId: str
    applicationType: str
    id: str
    lastUpdated: str
    nidNumber: str
    remarks: str
    status: str
    submissionDate: str


class ApplicationStatusLoadMatch(TypedDict):
    id: str


class LoginRequired(TypedDict):
    captcha: str
    password: str
    username: str


class Login(LoginRequired, total=False):
    accountStatus: str
    email: str
    fullName: str
    nidNumber: str
    phone: str
    userId: str


class LoginCreateDataRequired(TypedDict):
    captcha: str
    password: str
    username: str


class LoginCreateData(LoginCreateDataRequired, total=False):
    accountStatus: str
    email: str
    fullName: str
    nidNumber: str
    phone: str
    userId: str


class NidManagement(TypedDict):
    pass


class NidManagementLoadMatch(TypedDict):
    pass


class RegistrationRequired(TypedDict):
    confirmPassword: str
    email: str
    nidNumber: str
    password: str


class Registration(RegistrationRequired, total=False):
    dateOfBirth: str
    phone: str


class RegistrationCreateDataRequired(TypedDict):
    confirmPassword: str
    email: str
    nidNumber: str
    password: str


class RegistrationCreateData(RegistrationCreateDataRequired, total=False):
    dateOfBirth: str
    phone: str


class SuccessRequired(TypedDict):
    code: str
    email: str


class Success(SuccessRequired, total=False):
    isOverseas: bool
    message: str
    nidNumber: str
    success: bool


class SuccessCreateDataRequired(TypedDict):
    code: str
    email: str


class SuccessCreateData(SuccessCreateDataRequired, total=False):
    isOverseas: bool
    message: str
    nidNumber: str
    success: bool
