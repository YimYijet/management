import * as crypto from 'crypto';

export default class Util {
    static encrypt(password: String): string {
        return crypto.scryptSync(<string>password, 'salt', 64).toString('base64');
    }
}