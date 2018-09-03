import * as Acl from 'acl'

type aclInstance = any

export default class AclInstance {
    public static aclInstance: aclInstance
    public static getAcl(): aclInstance {
        return this.aclInstance
    }
    public static setAcl(db: any): void {
        this.aclInstance = new Acl(new Acl.mongodbBackend(db, 'acl_'))
    }
}
