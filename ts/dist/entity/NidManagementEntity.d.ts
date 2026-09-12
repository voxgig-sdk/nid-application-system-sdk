import { NidApplicationSystemEntityBase } from '../NidApplicationSystemEntityBase';
import type { NidApplicationSystemSDK } from '../NidApplicationSystemSDK';
import type { Control } from '../types';
import type { NidManagement, NidManagementLoadMatch } from '../NidApplicationSystemTypes';
declare class NidManagementEntity extends NidApplicationSystemEntityBase<NidManagement> {
    constructor(client: NidApplicationSystemSDK, entopts: any);
    make(this: NidManagementEntity): NidManagementEntity;
    load(this: any, reqmatch?: NidManagementLoadMatch, ctrl?: Control): Promise<NidManagementEntity>;
}
export { NidManagementEntity };
