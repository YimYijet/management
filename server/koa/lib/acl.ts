import * as Acl from 'acl';

type aclInstance = any;

export default class AclInstance {
    static aclInstance: aclInstance;
    static getAcl(): aclInstance {
        return this.aclInstance;
    }
    static setAcl(db: any): void {
        this.aclInstance = new Acl(new Acl.mongodbBackend(db, 'acl_'));
    }
}