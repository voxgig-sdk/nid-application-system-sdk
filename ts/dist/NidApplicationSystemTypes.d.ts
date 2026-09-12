export interface Application {
    additionalInfo?: string;
    nidNumber: string;
    policeReportNumber?: string;
    reason: string;
}
export interface ApplicationCreateData {
    additionalInfo?: string;
    nidNumber: string;
    policeReportNumber?: string;
    reason: string;
    $action?: string;
    [action: string]: any;
}
export interface ApplicationStatus {
    applicationId?: string;
    applicationType?: string;
    id?: string;
    lastUpdated?: string;
    nidNumber?: string;
    remarks?: string;
    status?: string;
    submissionDate?: string;
}
export interface ApplicationStatusLoadMatch {
    id: string;
}
export interface Login {
    accountStatus?: string;
    captcha: string;
    email?: string;
    fullName?: string;
    nidNumber?: string;
    password: string;
    phone?: string;
    userId?: string;
    username: string;
}
export interface LoginCreateData {
    accountStatus?: string;
    captcha: string;
    email?: string;
    fullName?: string;
    nidNumber?: string;
    password: string;
    phone?: string;
    userId?: string;
    username: string;
}
export interface NidManagement {
}
export interface NidManagementLoadMatch {
    format?: string;
    nid_number: string;
}
export interface Registration {
    confirmPassword: string;
    dateOfBirth?: string;
    email: string;
    nidNumber: string;
    password: string;
    phone?: string;
}
export interface RegistrationCreateData {
    confirmPassword: string;
    dateOfBirth?: string;
    email: string;
    nidNumber: string;
    password: string;
    phone?: string;
}
export interface Success {
    code: string;
    email: string;
    isOverseas?: boolean;
    message?: string;
    nidNumber?: string;
    success?: boolean;
}
export interface SuccessCreateData {
    code: string;
    email: string;
    isOverseas?: boolean;
    message?: string;
    nidNumber?: string;
    success?: boolean;
}
