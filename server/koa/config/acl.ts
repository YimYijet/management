import * as Acl from 'acl';
import * as crypto from 'crypto';

export default class AclInstance {
    static aclInstance: any;
    static getAcl() {
        return this.aclInstance;
    }
    static setAcl(db: any) {
        this.aclInstance = new Acl(new Acl.mongodbBackend(db, 'acl_'));
    }
    static encrypt(password: String) {
        return crypto.scryptSync(<string>password, 'salt', 16).toString('hex');
    }
}