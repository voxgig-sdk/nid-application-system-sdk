import { ApplicationEntity } from './entity/ApplicationEntity';
import { ApplicationStatusEntity } from './entity/ApplicationStatusEntity';
import { LoginEntity } from './entity/LoginEntity';
import { NidManagementEntity } from './entity/NidManagementEntity';
import { RegistrationEntity } from './entity/RegistrationEntity';
import { SuccessEntity } from './entity/SuccessEntity';
export type * from './NidApplicationSystemTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { NidApplicationSystemEntityBase } from './NidApplicationSystemEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class NidApplicationSystemSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Application(entopts?: Record<string, any>): ApplicationEntity;
    ApplicationStatus(entopts?: Record<string, any>): ApplicationStatusEntity;
    Login(entopts?: Record<string, any>): LoginEntity;
    NidManagement(entopts?: Record<string, any>): NidManagementEntity;
    Registration(entopts?: Record<string, any>): RegistrationEntity;
    Success(entopts?: Record<string, any>): SuccessEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): NidApplicationSystemSDK;
    tester(testopts?: any, sdkopts?: any): NidApplicationSystemSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof NidApplicationSystemSDK;
export { stdutil, config, BaseFeature, NidApplicationSystemEntityBase, NidApplicationSystemSDK, SDK, };
