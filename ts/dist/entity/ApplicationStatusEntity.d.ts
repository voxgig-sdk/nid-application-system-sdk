import { NidApplicationSystemEntityBase } from '../NidApplicationSystemEntityBase';
import type { NidApplicationSystemSDK } from '../NidApplicationSystemSDK';
import type { Control } from '../types';
import type { ApplicationStatus, ApplicationStatusLoadMatch } from '../NidApplicationSystemTypes';
declare class ApplicationStatusEntity extends NidApplicationSystemEntityBase<ApplicationStatus> {
    constructor(client: NidApplicationSystemSDK, entopts: any);
    make(this: ApplicationStatusEntity): ApplicationStatusEntity;
    load(this: any, reqmatch?: ApplicationStatusLoadMatch, ctrl?: Control): Promise<ApplicationStatusEntity>;
}
export { ApplicationStatusEntity };
