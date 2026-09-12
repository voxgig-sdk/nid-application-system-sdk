import { NidApplicationSystemEntityBase } from '../NidApplicationSystemEntityBase';
import type { NidApplicationSystemSDK } from '../NidApplicationSystemSDK';
import type { Control } from '../types';
import type { Application, ApplicationCreateData } from '../NidApplicationSystemTypes';
declare class ApplicationEntity extends NidApplicationSystemEntityBase<Application> {
    constructor(client: NidApplicationSystemSDK, entopts: any);
    make(this: ApplicationEntity): ApplicationEntity;
    create(this: any, reqdata?: ApplicationCreateData, ctrl?: Control): Promise<ApplicationEntity>;
}
export { ApplicationEntity };
