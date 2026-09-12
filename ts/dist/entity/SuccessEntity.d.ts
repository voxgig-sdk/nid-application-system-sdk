import { NidApplicationSystemEntityBase } from '../NidApplicationSystemEntityBase';
import type { NidApplicationSystemSDK } from '../NidApplicationSystemSDK';
import type { Control } from '../types';
import type { Success, SuccessCreateData } from '../NidApplicationSystemTypes';
declare class SuccessEntity extends NidApplicationSystemEntityBase<Success> {
    constructor(client: NidApplicationSystemSDK, entopts: any);
    make(this: SuccessEntity): SuccessEntity;
    create(this: any, reqdata?: SuccessCreateData, ctrl?: Control): Promise<SuccessEntity>;
}
export { SuccessEntity };
