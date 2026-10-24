export interface Application {
}
export interface ApplicationCreateData {
    additionalInfo?: any;
    nidNumber?: any;
    policeReportNumber?: any;
    reason?: any;
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
    captcha: string;
    expiresIn?: number;
    password: string;
    success?: boolean;
    token?: string;
    user?: Record<string, any>;
    username: string;
}
export interface LoginCreateData {
    captcha: string;
    password: string;
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
    nidNumber?: string;
}
