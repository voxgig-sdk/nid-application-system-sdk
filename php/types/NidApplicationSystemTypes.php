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
    public ?string $additionalInfo = null;
    public string $nidNumber;
    public ?string $policeReportNumber = null;
    public string $reason;
}

/** Request payload for Application#create. */
class ApplicationCreateData
{
    public ?string $additionalInfo = null;
    public string $nidNumber;
    public ?string $policeReportNumber = null;
    public string $reason;
}

/** ApplicationStatus entity data model. */
class ApplicationStatus
{
    public ?string $applicationId = null;
    public ?string $applicationType = null;
    public ?string $id = null;
    public ?string $lastUpdated = null;
    public ?string $nidNumber = null;
    public ?string $remarks = null;
    public ?string $status = null;
    public ?string $submissionDate = null;
}

/** Request payload for ApplicationStatus#load. */
class ApplicationStatusLoadMatch
{
    public string $id;
}

/** Login entity data model. */
class Login
{
    public ?string $accountStatus = null;
    public string $captcha;
    public ?string $email = null;
    public ?string $fullName = null;
    public ?string $nidNumber = null;
    public string $password;
    public ?string $phone = null;
    public ?string $userId = null;
    public string $username;
}

/** Request payload for Login#create. */
class LoginCreateData
{
    public ?string $accountStatus = null;
    public string $captcha;
    public ?string $email = null;
    public ?string $fullName = null;
    public ?string $nidNumber = null;
    public string $password;
    public ?string $phone = null;
    public ?string $userId = null;
    public string $username;
}

/** NidManagement entity data model. */
class NidManagement
{
}

/** Request payload for NidManagement#load. */
class NidManagementLoadMatch
{
    public ?string $format = null;
    public string $nid_number;
}

/** Registration entity data model. */
class Registration
{
    public string $confirmPassword;
    public ?string $dateOfBirth = null;
    public string $email;
    public string $nidNumber;
    public string $password;
    public ?string $phone = null;
}

/** Request payload for Registration#create. */
class RegistrationCreateData
{
    public string $confirmPassword;
    public ?string $dateOfBirth = null;
    public string $email;
    public string $nidNumber;
    public string $password;
    public ?string $phone = null;
}

/** Success entity data model. */
class Success
{
    public string $code;
    public string $email;
    public ?bool $isOverseas = null;
    public ?string $message = null;
    public ?string $nidNumber = null;
    public ?bool $success = null;
}

/** Request payload for Success#create. */
class SuccessCreateData
{
    public string $code;
    public string $email;
    public ?bool $isOverseas = null;
    public ?string $message = null;
    public ?string $nidNumber = null;
    public ?bool $success = null;
}

