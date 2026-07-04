<?php
declare(strict_types=1);

// Typed models for the NidApplicationSystem SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Application entity data model. */
class Application
{
    public ?string $additional_info = null;
    public string $nid_number;
    public ?string $police_report_number = null;
    public string $reason;
}

/** Match filter for Application#create (any subset of Application fields). */
class ApplicationCreateData
{
    public ?string $additional_info = null;
    public ?string $nid_number = null;
    public ?string $police_report_number = null;
    public ?string $reason = null;
}

/** ApplicationStatus entity data model. */
class ApplicationStatus
{
    public ?string $application_id = null;
    public ?string $application_type = null;
    public ?string $last_updated = null;
    public ?string $nid_number = null;
    public ?string $remark = null;
    public ?string $status = null;
    public ?string $submission_date = null;
}

/** Request payload for ApplicationStatus#load. */
class ApplicationStatusLoadMatch
{
    public string $id;
}

/** Login entity data model. */
class Login
{
    public string $captcha;
    public ?int $expires_in = null;
    public string $password;
    public ?bool $success = null;
    public ?string $token = null;
    public ?array $user = null;
    public string $username;
}

/** Match filter for Login#create (any subset of Login fields). */
class LoginCreateData
{
    public ?string $captcha = null;
    public ?int $expires_in = null;
    public ?string $password = null;
    public ?bool $success = null;
    public ?string $token = null;
    public ?array $user = null;
    public ?string $username = null;
}

/** NidManagement entity data model. */
class NidManagement
{
}

/** Match filter for NidManagement#load (any subset of NidManagement fields). */
class NidManagementLoadMatch
{
}

/** Registration entity data model. */
class Registration
{
    public string $confirm_password;
    public ?string $date_of_birth = null;
    public string $email;
    public string $nid_number;
    public string $password;
    public ?string $phone = null;
}

/** Match filter for Registration#create (any subset of Registration fields). */
class RegistrationCreateData
{
    public ?string $confirm_password = null;
    public ?string $date_of_birth = null;
    public ?string $email = null;
    public ?string $nid_number = null;
    public ?string $password = null;
    public ?string $phone = null;
}

/** Success entity data model. */
class Success
{
    public string $code;
    public string $email;
    public ?bool $is_oversea = null;
    public ?string $message = null;
    public ?string $nid_number = null;
    public ?bool $success = null;
}

/** Match filter for Success#create (any subset of Success fields). */
class SuccessCreateData
{
    public ?string $code = null;
    public ?string $email = null;
    public ?bool $is_oversea = null;
    public ?string $message = null;
    public ?string $nid_number = null;
    public ?bool $success = null;
}

