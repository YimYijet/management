import * as crypto from 'crypto'

const secret: string = crypto.createHash('sha256').digest('base64')

export function encrypt(password: String): string {
    return crypto.scryptSync(<string>password, 'salt', 64).toString('base64')
}

export function getSecret(): string {
    return secret
}