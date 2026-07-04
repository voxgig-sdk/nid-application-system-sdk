# Typed models for the NidApplicationSystem SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Application:
    nid_number: str
    reason: str
    additional_info: Optional[str] = None
    police_report_number: Optional[str] = None


@dataclass
class ApplicationCreateData:
    additional_info: Optional[str] = None
    nid_number: Optional[str] = None
    police_report_number: Optional[str] = None
    reason: Optional[str] = None


@dataclass
class ApplicationStatus:
    application_id: Optional[str] = None
    application_type: Optional[str] = None
    last_updated: Optional[str] = None
    nid_number: Optional[str] = None
    remark: Optional[str] = None
    status: Optional[str] = None
    submission_date: Optional[str] = None


@dataclass
class ApplicationStatusLoadMatch:
    id: str


@dataclass
class Login:
    captcha: str
    password: str
    username: str
    expires_in: Optional[int] = None
    success: Optional[bool] = None
    token: Optional[str] = None
    user: Optional[dict] = None


@dataclass
class LoginCreateData:
    captcha: Optional[str] = None
    expires_in: Optional[int] = None
    password: Optional[str] = None
    success: Optional[bool] = None
    token: Optional[str] = None
    user: Optional[dict] = None
    username: Optional[str] = None


@dataclass
class NidManagement:
    pass


@dataclass
class NidManagementLoadMatch:
    pass


@dataclass
class Registration:
    confirm_password: str
    email: str
    nid_number: str
    password: str
    date_of_birth: Optional[str] = None
    phone: Optional[str] = None


@dataclass
class RegistrationCreateData:
    confirm_password: Optional[str] = None
    date_of_birth: Optional[str] = None
    email: Optional[str] = None
    nid_number: Optional[str] = None
    password: Optional[str] = None
    phone: Optional[str] = None


@dataclass
class Success:
    code: str
    email: str
    is_oversea: Optional[bool] = None
    message: Optional[str] = None
    nid_number: Optional[str] = None
    success: Optional[bool] = None


@dataclass
class SuccessCreateData:
    code: Optional[str] = None
    email: Optional[str] = None
    is_oversea: Optional[bool] = None
    message: Optional[str] = None
    nid_number: Optional[str] = None
    success: Optional[bool] = None

