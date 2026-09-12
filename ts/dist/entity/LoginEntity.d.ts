import { NidApplicationSystemEntityBase } from '../NidApplicationSystemEntityBase';
import type { NidApplicationSystemSDK } from '../NidApplicationSystemSDK';
import type { Control } from '../types';
import type { Login, LoginCreateData } from '../NidApplicationSystemTypes';
declare class LoginEntity extends NidApplicationSystemEntityBase<Login> {
    constructor(client: NidApplicationSystemSDK, entopts: any);
    make(this: LoginEntity): LoginEntity;
    create(this: any, reqdata?: LoginCreateData, ctrl?: Control): Promise<LoginEntity>;
}
export { LoginEntity };
