import { NidApplicationSystemEntityBase } from '../NidApplicationSystemEntityBase';
import type { NidApplicationSystemSDK } from '../NidApplicationSystemSDK';
import type { Control } from '../types';
import type { Registration, RegistrationCreateData } from '../NidApplicationSystemTypes';
declare class RegistrationEntity extends NidApplicationSystemEntityBase<Registration> {
    constructor(client: NidApplicationSystemSDK, entopts: any);
    make(this: RegistrationEntity): RegistrationEntity;
    create(this: any, reqdata?: RegistrationCreateData, ctrl?: Control): Promise<RegistrationEntity>;
}
export { RegistrationEntity };
