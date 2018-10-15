export interface ICurUser {
    token: string
    userId: string
    role: object
    resources: object
    login?: (values) => void
}
