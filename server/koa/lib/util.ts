import * as crypto from 'crypto'

const secret: string = crypto.createHash('sha256').digest('base64')

export function encrypt(password: string): string {
    return crypto.scryptSync(password, 'salt', 64).toString('base64')
}

export function getSecret(): string {
    return secret
}
