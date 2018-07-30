import * as Acl from 'acl';

export default class AclInstance {
    static aclInstance: any;
    static getAcl() {
        return this.aclInstance;
    }
    static setAcl(db: any) {
        this.aclInstance = new Acl(new Acl.mongodbBackend(db, 'acl_'));
    }
}